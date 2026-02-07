import apiFetch from '@wordpress/api-fetch';

export const fetchFormConfig = async (formId) => {
  return await apiFetch({
    path: `/msf/v1/forms/${formId}`,
  });
};

export const submitForm = async (formId, data) => {
  return await apiFetch({
    path: `/msf/v1/forms/${formId}/submit`,
    method: 'POST',
    data: data,
  });
};
