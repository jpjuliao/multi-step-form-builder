import apiFetch from '@wordpress/api-fetch';

const getForm = async (formId) => {
  return apiFetch({
    path: `/msf/v1/forms/${formId}`,
    method: 'GET',
  });
};

const saveForm = async (formId, data) => {
  return apiFetch({
    path: `/msf/v1/forms/${formId}`,
    method: 'POST',
    data,
  });
};

const listForms = async () => {
  return apiFetch({
    path: `/msf/v1/forms`,
    method: 'GET',
  });
};

const listSubmissions = async (formId) => {
  return apiFetch({
    path: `/msf/v1/forms/${formId}/submissions`,
    method: 'GET',
  });
};

export const FormsService = {
  getForm,
  saveForm,
  listForms,
  listSubmissions,
};
