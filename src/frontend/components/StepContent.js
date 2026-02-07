import React, { lazy } from 'react';

const FormField = lazy(() => import('./FormField'));

const StepContent = ({ step, formData, errors, updateFieldValue }) => {
  if (!step) return null;

  return (
    <div className="msf-step-content">
      {step.title && (
        <h3 className="msf-step-title">{step.title}</h3>
      )}
      {step.description && (
        <p className="msf-step-description">{step.description}</p>
      )}

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
  );
};

export default StepContent;
