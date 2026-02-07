import React from 'react';

const FormNavigation = ({
  currentStep,
  isLastFormStep,
  handlePrevious,
  handleNext,
  submitting,
  settings = {}
}) => {
  return (
    <div className="msf-form-navigation">
      {currentStep > 0 && (
        <button
          type="button"
          onClick={handlePrevious}
          className="msf-btn msf-btn-secondary"
        >
          {settings.previousButtonText || 'Previous'}
        </button>
      )}

      {!isLastFormStep ? (
        <button
          type="button"
          onClick={handleNext}
          className="msf-btn msf-btn-primary"
        >
          {settings.nextButtonText || 'Next'}
        </button>
      ) : (
        <button
          type="submit"
          disabled={submitting}
          className="msf-btn msf-btn-primary"
        >
          {submitting ? 'Submitting...' : (settings.submitButtonText || 'Submit')}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
