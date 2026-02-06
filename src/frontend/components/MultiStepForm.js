import { useState, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import FormField from './FormField';
import ProgressBar from './ProgressBar';

const MultiStepForm = ({ formId, onSuccess }) => {
  const [formConfig, setFormConfig] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      setLoading(true);
      const response = await apiFetch({
        path: `/msf/v1/forms/${formId}`,
      });
      setFormConfig(response);
    } catch (error) {
      console.error('Error loading form:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateStep = () => {
    // Skip validation for the final step (Finish step)
    if (currentStep >= formConfig.steps.length) {
      return true;
    }

    const step = formConfig.steps[currentStep];
    const stepErrors = {};

    step.fields?.forEach(field => {
      const value = formData[field.name];

      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        stepErrors[field.name] = `${field.label} is required`;
      }

      if (field.type === 'email' && value && !isValidEmail(value)) {
        stepErrors[field.name] = 'Please enter a valid email address';
      }

      if (field.type === 'url' && value && !isValidUrl(value)) {
        stepErrors[field.name] = 'Please enter a valid URL';
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('handleNext', currentStep, validateStep());
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to top to show validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit', currentStep, validateStep());

    if (!validateStep()) {
      // Scroll to top to show validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiFetch({
        path: `/msf/v1/forms/${formId}/submit`,
        method: 'POST',
        data: formData,
      });

      setSuccessMessage(response.message);
      setSubmitted(true);
      setHasError(false);
      // Move to the final step (Finish step)
      setCurrentStep(formConfig.steps.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Call onSuccess callback if provided (for modal close)
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000); // Close modal after 2 seconds
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.data?.errors) {
        setErrors(error.data.errors);
        setSuccessMessage('Please correct the errors and try again.');
      } else {
        setSuccessMessage(error.message || 'An error occurred while submitting the form. Please try again.');
      }

      setHasError(true);
      // Move to the final step (Finish step) on error too, or stay?
      // User request: "step to display the Thank you message or Errors"
      // So we move to the final step to show the error.
      setCurrentStep(formConfig.steps.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormKeyDown = (e) => {
    // Prevent Enter key from submitting the form unless on the last input step
    const isLastFormStep = currentStep === formConfig.steps.length - 1;
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && !isLastFormStep) {
      e.preventDefault();
      // Trigger next button click instead
      handleNext();
    }
  };

  const updateFieldValue = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: null });
    }
  };

  if (loading) {
    return (
      <div className="msf-form-loading">
        <div className="msf-spinner"></div>
        <p>Loading form...</p>
      </div>
    );
  }

  if (!formConfig || !formConfig.steps || formConfig.steps.length === 0) {
    return <p>Form not found or has no steps.</p>;
  }

  if (submitted && currentStep < formConfig.steps.length) {
    // Fallback if somehow submitted but not on final step, shouldn't happen with new logic but good safety
    // Actually, we want to render the virtual step.
  }

  // Create a virtual final step
  const allSteps = [
    ...formConfig.steps,
    {
      title: 'Finish',
      description: '',
      fields: []
    }
  ];

  const settings = formConfig.settings || {};
  const isLastFormStep = currentStep === formConfig.steps.length - 1;
  const isFinalStep = currentStep === formConfig.steps.length;

  return (
    <div className="msf-form-wrapper">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={allSteps.length}
        steps={allSteps}
      />

      {isFinalStep ? (
        <div className="msf-step-content">
          <div className={`msf-form-${hasError ? 'error' : 'success'}`}>
            <div className={`msf-${hasError ? 'error' : 'success'}-icon`}>
              {hasError ? '✕' : '✓'}
            </div>
            <h3>{hasError ? 'Error' : 'Success!'}</h3>
            <p>{successMessage}</p>
            {hasError && Object.keys(errors).length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(formConfig.steps.length - 1);
                  setSubmitted(false);
                  setHasError(false);
                }}
                className="msf-btn msf-btn-primary"
                style={{ marginTop: '20px' }}
              >
                Go Back
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="msf-form">
          <div className="msf-step-content">
            {formConfig.steps[currentStep].title && (
              <h3 className="msf-step-title">{formConfig.steps[currentStep].title}</h3>
            )}
            {formConfig.steps[currentStep].description && (
              <p className="msf-step-description">{formConfig.steps[currentStep].description}</p>
            )}

            <div className="msf-fields">
              {formConfig.steps[currentStep].fields?.map((field, index) => (
                <FormField
                  key={field.name || index}
                  field={field}
                  value={formData[field.name]}
                  onChange={(value) => updateFieldValue(field.name, value)}
                  error={errors[field.name]}
                />
              ))}
            </div>
          </div>

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
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
