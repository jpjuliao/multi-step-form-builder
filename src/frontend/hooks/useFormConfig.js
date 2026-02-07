import { useState, useEffect } from 'react';
import { fetchFormConfig } from '../services/api';

export const useFormConfig = (formId) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        setLoading(true);
        const response = await fetchFormConfig(formId);
        setConfig(response);
      } catch (err) {
        console.error('Error loading form:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      loadForm();
    }
  }, [formId]);

  return { config, loading, error };
};
