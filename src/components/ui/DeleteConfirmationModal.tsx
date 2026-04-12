import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './DeleteConfirmationModal.css';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: string) => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
  type: 'service' | 'sous-service' | 'employee' | 'holiday' | 'appointment' | 'pause';
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  message,
  isLoading = false,
  type,
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Gérer la touche Echap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const defaultMessage = `Êtes-vous sûr de vouloir supprimer cet élement ? Cette action est irréversible.`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <AlertTriangle size={24} className="warning-icon" />
            <h2>{title}</h2>
          </div>
          <button className="close-btn" onClick={onClose} disabled={isLoading} type='button'>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="confirmation-message">
            {message || defaultMessage}
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className="btn cancel-btn" 
            onClick={onClose}
            disabled={isLoading}
          >
            Non, annuler
          </button>
          <button 
            className="btn delete-btn" 
            onClick={() => onConfirm(type)}
            disabled={isLoading}
            type='button'
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                Suppression...
              </>
            ) : (
              'Oui, supprimer'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;