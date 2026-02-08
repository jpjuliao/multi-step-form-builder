import { useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { useFormConfig } from '../hooks/useFormConfig';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import Spinner from './Spinner';

const ProgressBar = lazy(() => import('./ProgressBar'));
const FormHeader = lazy(() => import('./FormHeader'));
const StepContent = lazy(() => import('./StepContent'));
const FormNavigation = lazy(() => import('./FormNavigation'));
const FormFeedback = lazy(() => import('./FormFeedback'));

const MultiStepForm = ({ formId, onSuccess }) => {
  const { config, loading: configLoading, error: configError } = useFormConfig(formId);
  const {
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
    resetForm
  } = useMultiStepForm(formId, config, onSuccess);

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      const firstInput = formRef.current.querySelector('input, select, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [currentStep]);

  const handleFormKeyDown = useCallback((e) => {
    if (!config || !config.steps) return;

    const isLastFormStep = currentStep === config.steps.length - 1;
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && !isLastFormStep) {
      e.preventDefault();
      handleNext();
    }
  }, [config, currentStep, handleNext]);

  if (configLoading) {
    return (
      <div className="msf-form-loading">
        <Spinner />
        <p>Loading form...</p>
      </div>
    );
  }

  if (configError) {
    return <p>Error loading form. Please try again later.</p>;
  }

  if (!config || !config.steps || config.steps.length === 0) {
    return <p>Form not found or has no steps.</p>;
  }

  const allSteps = [
    ...config.steps,
    {
      title: 'Finish',
      description: '',
      fields: []
    }
  ];

  const isFinalStep = currentStep === config.steps.length;
  const isLastFormStep = currentStep === config.steps.length - 1;
  const settings = config.settings || {};

  return (
    <div className="msf-form-wrapper" ref={formRef}>
      <Suspense fallback={<div className="msf-form-loading"><Spinner /><p>Loading form...</p></div>}>
        <FormHeader formConfig={config} />

        {isFinalStep ? (
          <FormFeedback
            hasError={hasError}
            successMessage={successMessage}
            errors={errors}
            onBack={resetForm}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleFormKeyDown}
            className="msf-form"
          >
            <StepContent
              step={config.steps[currentStep]}
              formData={formData}
              errors={errors}
              updateFieldValue={updateFieldValue}
            />

            <FormNavigation
              currentStep={currentStep}
              isLastFormStep={isLastFormStep}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              submitting={submitting}
              settings={settings}
            />
          </form>
        )}

        <ProgressBar
          currentStep={currentStep}
          totalSteps={allSteps.length}
          steps={allSteps}
        />
      </Suspense>
    </div>
  );
};

export default MultiStepForm;
