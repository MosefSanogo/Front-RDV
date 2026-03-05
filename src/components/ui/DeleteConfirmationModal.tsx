import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './DeleteConfirmationModal.css';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  message,
  isLoading = false
}) => {
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
          <button className="close-btn" onClick={onClose} disabled={isLoading}>
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
            onClick={onConfirm}
            disabled={isLoading}
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