import React from 'react';

const FormFeedback = ({
  hasError,
  successMessage,
  errors,
  onBack
}) => {
  return (
    <div className="msf-step-content">
      <div className={`msf-form-${hasError ? 'error' : 'success'}`}>
        <div className={`msf-${hasError ? 'error' : 'success'}-icon`}>
          {hasError ? '✕' : '✓'}
        </div>
        <div className="msf-form-message">
          <h3>{hasError ? 'Error' : 'Success!'}</h3>
          <p>{successMessage}</p>
        </div>
        {hasError && Object.keys(errors).length > 0 && (
          <button
            type="button"
            onClick={onBack}
            className="msf-btn msf-btn-primary"
            style={{ marginTop: '20px' }}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default FormFeedback;
