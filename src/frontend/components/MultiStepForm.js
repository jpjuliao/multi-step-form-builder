import { useState, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import FormField from './FormField';
import ProgressBar from './ProgressBar';

const MultiStepForm = ({ formId }) => {
  const [formConfig, setFormConfig] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      setErrors({});
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

    if (!validateStep()) {
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.data?.errors) {
        setErrors(error.data.errors);
      } else {
        alert('An error occurred while submitting the form. Please try again.');
      }
    } finally {
      setSubmitting(false);
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

  if (submitted) {
    return (
      <div className="msf-form-success">
        <div className="msf-success-icon">✓</div>
        <h3>Success!</h3>
        <p>{successMessage}</p>
      </div>
    );
  }

  const step = formConfig.steps[currentStep];
  const settings = formConfig.settings || {};
  const isLastStep = currentStep === formConfig.steps.length - 1;

  return (
    <div className="msf-form-wrapper">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={formConfig.steps.length}
        steps={formConfig.steps}
      />

      <form onSubmit={handleSubmit} className="msf-form">
        <div className="msf-step-content">
          {step.title && <h3 className="msf-step-title">{step.title}</h3>}
          {step.description && <p className="msf-step-description">{step.description}</p>}

          <div className="msf-fields">
            {step.fields?.map((field, index) => (
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

          {!isLastStep ? (
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
    </div>
  );
};

export default MultiStepForm;
