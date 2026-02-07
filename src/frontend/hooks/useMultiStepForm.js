import { useState, useCallback } from 'react';
import { submitForm } from '../services/api';
import { validateStep } from '../utils/validation';

export const useMultiStepForm = (formId, formConfig, onSuccess) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  const updateFieldValue = useCallback((fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  }, [errors]);

  const validateCurrentStep = useCallback(() => {
    if (!formConfig || !formConfig.steps) return true;
    
    // Skip validation for the final step (Finish step)
    if (currentStep >= formConfig.steps.length) {
      return true;
    }

    const step = formConfig.steps[currentStep];
    const stepErrors = validateStep(step, formData);

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [formConfig, currentStep, formData]);

  const handleNext = useCallback((e) => {
    if (e) e.preventDefault();
    
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validateCurrentStep]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      const response = await submitForm(formId, formData);

      setSuccessMessage(response.message);
      setSubmitted(true);
      setHasError(false);
      // Move to the final step (Finish step)
      setCurrentStep(formConfig.steps.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
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
      setCurrentStep(formConfig.steps.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  }, [formId, formData, validateCurrentStep, formConfig, onSuccess]);

  const resetForm = useCallback(() => {
    setCurrentStep(formConfig.steps.length - 1); // Go back to last step
    setSubmitted(false);
    setHasError(false);
  }, [formConfig]);

  return {
    currentStep,
    formData,
    errors,
    submitting,
    submitted,
    successMessage,
    hasError,
    handleNext,
    handlePrevious,
    handleSubmit,
    updateFieldValue,
    resetForm,
    setCurrentStep // Exposed for specific cases if needed
  };
};
