// utils/sanitize.js

import DOMPurify from 'dompurify';

// ============================================================
// SANITISATION - Nettoie et sécurise les inputs
// ============================================================

/**
 * Échappe les caractères HTML dangereux
 */
const escapeHTML = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Supprime les caractères de contrôle invisibles
 */
const removeControlChars = (str: string): string => {
  if (typeof str !== 'string') return '';
  // Supprime les caractères ASCII de contrôle (sauf tab, newline)
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * Prévient les injections SQL basiques
 */
const escapeSQLChars = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/xp_/gi, '')
    .replace(/DROP\s+TABLE/gi, '')
    .replace(/DELETE\s+FROM/gi, '')
    .replace(/INSERT\s+INTO/gi, '')
    .replace(/SELECT\s+\*/gi, '');
};

/**
 * Limite la longueur d'un input
 */
const truncate = (str: string, maxLength = 255): string => {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength);
};

/**
 * Supprime les scripts et balises dangereuses avec DOMPurify
 */
const purifyHTML = (str: string): string => {
  if (typeof str !== 'string') return '';
  return DOMPurify.sanitize(str, {
    ALLOWED_TAGS: [],        // Aucune balise HTML autorisée
    ALLOWED_ATTR: [],        // Aucun attribut autorisé
  });
};

/**
 * Valide un email
 */
const isValidEmail = (email: string): boolean => {
  const regex: RegExp = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * Valide un numéro de téléphone (format international)
 */
const isValidPhone = (phone: string): boolean => {
  const regex: RegExp = /^\+?[0-9\s\-().]{7,20}$/;
  return regex.test(phone);
};

/**
 * Valide une URL
 */
const isValidURL = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// ============================================================
// FONCTION PRINCIPALE
// ============================================================

/**
 * Sécurise un input selon son type
 * @param {string} value     - La valeur brute de l'input
 * @param {string} type      - Le type : 'text' | 'email' | 'phone' | 'url' | 'number' | 'html'
 * @param {object} options   - Options : { maxLength, required }
 * @returns {{ value, error, isValid }}
 */
export const sanitizeInput = (value: string, type = 'text', options: { maxLength?: number; required?: boolean } = {}): { value: string | number; error: string | null; isValid: boolean } => {
  const { maxLength = 255, required = false } = options;

  // Vérification de base
  if (value === null || value === undefined) {
    return { value: '', error: required ? 'Ce champ est requis' : null, isValid: !required };
  }

  let sanitized = String(value).trim();

  // Champ requis vide
  if (required && sanitized === '') {
    return { value: '', error: 'Ce champ est requis', isValid: false };
  }

  // Traitement selon le type
  switch (type) {

    case 'text': {
      sanitized = removeControlChars(sanitized);
      sanitized = escapeHTML(sanitized);
      sanitized = escapeSQLChars(sanitized);
      sanitized = truncate(sanitized, maxLength);
      return { value: sanitized, error: null, isValid: true };
    }

    case 'email': {
      sanitized = sanitized.toLowerCase();
      sanitized = removeControlChars(sanitized);
      sanitized = truncate(sanitized, 254);
      if (!isValidEmail(sanitized)) {
        return { value: sanitized, error: 'Email invalide', isValid: false };
      }
      return { value: sanitized, error: null, isValid: true };
    }

    case 'phone': {
      sanitized = removeControlChars(sanitized);
      sanitized = truncate(sanitized, 20);
      if (!isValidPhone(sanitized)) {
        return { value: sanitized, error: 'Numéro de téléphone invalide', isValid: false };
      }
      return { value: sanitized, error: null, isValid: true };
    }

    case 'url': {
      sanitized = removeControlChars(sanitized);
      sanitized = truncate(sanitized, 2048);
      if (!isValidURL(sanitized)) {
        return { value: sanitized, error: 'URL invalide ou non sécurisée', isValid: false };
      }
      return { value: sanitized, error: null, isValid: true };
    }

    case 'number': {
      const num = Number(sanitized);
      if (isNaN(num)) {
        return { value: '', error: 'Nombre invalide', isValid: false };
      }
      return { value: num, error: null, isValid: true };
    }

    case 'html': {
      // Cas où on autorise du HTML limité (ex: éditeur de texte riche)
      sanitized = purifyHTML(sanitized);
      sanitized = truncate(sanitized, maxLength);
      return { value: sanitized, error: null, isValid: true };
    }

    default:
      return { value: escapeHTML(sanitized), error: null, isValid: true };
  }
};

// ============================================================
// HOOK REACT - useSecureInput
// ============================================================

import { useState, useCallback } from 'react';

/**
 * Hook pour gérer un input sécurisé
 * @param {string} initialValue
 * @param {string} type
 * @param {object} options
 */
export const useSecureInput = (initialValue = '', type = 'text', options = {}) => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [error, setError]   = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = e.target.value;
    const result = sanitizeInput(raw, type, options);
    setValue(result.value);
    setError(result.error);
    setIsValid(result.isValid);
  }, [type, options]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setIsValid(true);
  }, [initialValue]);

  return { value, error, isValid, handleChange, reset };
};