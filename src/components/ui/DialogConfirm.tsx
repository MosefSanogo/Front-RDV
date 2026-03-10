import React, { useEffect } from 'react';
import { AlertTriangle, X, Check, AlertCircle, Info } from 'lucide-react';
import './DialogConfirm.css';

export type DialogType = 'danger' | 'warning' | 'info' | 'success';

export interface DialogConfirmProps {
  /** Contrôle l'ouverture du dialogue */
  isOpen: boolean;
  /** Fonction appelée à la fermeture */
  onClose: () => void;
  /** Fonction appelée à la confirmation */
  onConfirm: () => void;
  /** Titre du dialogue */
  title?: string;
  /** Message de confirmation */
  message?: string;
  /** Type de dialogue (danger, warning, info, success) */
  type?: DialogType;
  /** Texte du bouton de confirmation */
  confirmText?: string;
  /** Texte du bouton d'annulation */
  cancelText?: string;
  /** État de chargement */
  isLoading?: boolean;
  /** Désactiver la fermeture en cliquant sur l'overlay */
  disableOverlayClick?: boolean;
  /** Icône personnalisée */
  icon?: React.ReactNode;
  /** Taille du dialogue */
  size?: 'sm' | 'md' | 'lg';
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmer l\'action',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  type = 'danger',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  isLoading = false,
  disableOverlayClick = false,
  icon,
  size = 'md'
}) => {
  // Gestion de la touche Echap
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Bloquer le scroll du body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLoading, onClose]);

  // Icônes par défaut selon le type
  const getDefaultIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle size={24} />;
      case 'warning':
        return <AlertCircle size={24} />;
      case 'info':
        return <Info size={24} />;
      case 'success':
        return <Check size={24} />;
      default:
        return <AlertTriangle size={24} />;
    }
  };

  // Classes CSS selon le type
  const getTypeClass = () => {
    switch (type) {
      case 'danger': return 'dialog-danger';
      case 'warning': return 'dialog-warning';
      case 'info': return 'dialog-info';
      case 'success': return 'dialog-success';
      default: return 'dialog-danger';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`dialog-overlay ${size}`} 
      onClick={!disableOverlayClick && !isLoading ? onClose : undefined}
    >
      <div 
        className={`dialog-container ${getTypeClass()} ${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dialog-header">
          <div className="dialog-title">
            <span className="dialog-icon">
              {icon || getDefaultIcon()}
            </span>
            <h3>{title}</h3>
          </div>
          {!isLoading && (
            <button 
              className="dialog-close"
              onClick={onClose}
              aria-label="Fermer"
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="dialog-content">
          <p className="dialog-message">{message}</p>
        </div>

        {/* Footer */}
        <div className="dialog-footer">
          <button
            className="dialog-btn dialog-btn-cancel"
            onClick={onClose}
            disabled={isLoading}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={`dialog-btn dialog-btn-confirm ${type}`}
            onClick={onConfirm}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <>
                <span className="dialog-spinner" />
                Chargement...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogConfirm;