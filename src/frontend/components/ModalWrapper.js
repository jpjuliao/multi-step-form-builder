import { useState, useEffect } from 'react';
import MultiStepForm from './MultiStepForm';

const ModalWrapper = ({ formId, showModalOnLoad, modalDelay }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (showModalOnLoad) {
      const delay = (modalDelay || 0) * 1000;
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [showModalOnLoad, modalDelay]);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="msf-modal-overlay" onClick={closeModal}>
      <div className="msf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="msf-modal-close"
          onClick={closeModal}
          aria-label="Close"
        >
          ×
        </button>
        <MultiStepForm formId={formId} onSuccess={closeModal} />
      </div>
    </div>
  );
};

export default ModalWrapper;
