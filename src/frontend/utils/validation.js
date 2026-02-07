export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateStep = (step, formData) => {
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

  return stepErrors;
};
