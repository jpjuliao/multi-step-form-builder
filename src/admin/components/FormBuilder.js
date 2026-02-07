import { useState, useEffect, lazy, Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button, Spinner, TabPanel, Notice } from '@wordpress/components';

const StepEditor = lazy(() => import('./StepEditor'));
const FormSettings = lazy(() => import('./FormSettings'));
const FormHeader = lazy(() => import('./FormHeader'));

const FormBuilder = () => {
  const [formConfig, setFormConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const formId = window.msfAdmin?.formId;

  useEffect(() => {
    loadForm();
  }, []);

  const loadForm = async () => {
    try {
      setLoading(true);
      const response = await apiFetch({
        path: `/msf/v1/forms/${formId}`,
        method: 'GET',
      });
      setFormConfig(response);
    } catch (error) {
      console.error('Error loading form:', error);
      setNotice({ type: 'error', message: __('Failed to load form', 'multi-step-form-builder') });
    } finally {
      setLoading(false);
    }
  };

  const saveForm = async () => {
    try {
      setSaving(true);
      await apiFetch({
        path: `/msf/v1/forms/${formId}`,
        method: 'POST',
        data: formConfig,
      });
      setNotice({ type: 'success', message: __('Form saved successfully!', 'multi-step-form-builder') });
      setTimeout(() => setNotice(null), 3000);
    } catch (error) {
      console.error('Error saving form:', error);
      setNotice({ type: 'error', message: __('Failed to save form', 'multi-step-form-builder') });
    } finally {
      setSaving(false);
    }
  };

  const addStep = () => {
    const newStep = {
      id: `step_${Date.now()}`,
      title: '',
      description: '',
      fields: []
    };
    setFormConfig({
      ...formConfig,
      steps: [...(formConfig.steps || []), newStep]
    });
  };

  const updateStep = (stepIndex, updatedStep) => {
    const newSteps = [...formConfig.steps];
    newSteps[stepIndex] = updatedStep;
    setFormConfig({ ...formConfig, steps: newSteps });
  };

  const deleteStep = (stepIndex) => {
    const newSteps = formConfig.steps.filter((_, i) => i !== stepIndex);
    setFormConfig({ ...formConfig, steps: newSteps });
  };

  const moveStep = (fromIndex, toIndex) => {
    const newSteps = [...formConfig.steps];
    const [movedStep] = newSteps.splice(fromIndex, 1);
    newSteps.splice(toIndex, 0, movedStep);
    setFormConfig({ ...formConfig, steps: newSteps });
  };

  const updateSettings = (newSettings) => {
    setFormConfig({ ...formConfig, settings: newSettings });
  };

  if (loading) {
    return (
      <div className="msf-loading">
        <Spinner />
        <p>{__('Loading form...', 'multi-step-form-builder')}</p>
      </div>
    );
  }

  const tabs = [
    {
      name: 'steps',
      title: __('Steps', 'multi-step-form-builder'),
      className: 'msf-tab-steps',
    },
    {
      name: 'header',
      title: __('Header', 'multi-step-form-builder'),
      className: 'msf-tab-header',
    },
    {
      name: 'settings',
      title: __('Settings', 'multi-step-form-builder'),
      className: 'msf-tab-settings',
    },
  ];

  return (
    <div className="msf-form-builder">
      {notice && (
        <Notice
          status={notice.type}
          onRemove={() => setNotice(null)}
          isDismissible
        >
          {notice.message}
        </Notice>
      )}

      <div className="msf-builder-header">
        <Button
          variant="primary"
          onClick={saveForm}
          isBusy={saving}
          disabled={saving}
        >
          {saving ? __('Saving...', 'multi-step-form-builder') : __('Save Form', 'multi-step-form-builder')}
        </Button>
      </div>

      <TabPanel
        className="msf-tabs"
        activeClass="is-active"
        tabs={tabs}
      >
        {(tab) => (
          <Suspense fallback={<div className="msf-loading-tab"><Spinner /></div>}>
            {(() => {
              if (tab.name === 'header') {
                return (
                  <div className="msf-header-panel">
                    <FormHeader
                      formConfig={formConfig}
                      updateFormConfig={setFormConfig}
                    />
                  </div>
                );
              }

              if (tab.name === 'steps') {
                return (
                  <div className="msf-steps-panel">
                    {formConfig.steps?.length > 0 ? (
                      formConfig.steps.map((step, index) => (
                        <div key={step.id || index} className="msf-step-wrapper">
                          <div className="msf-step-controls">
                            <span className="msf-step-number">
                              {__('Step', 'multi-step-form-builder')} {index + 1}
                            </span>
                            <div className="msf-step-move-buttons">
                              {index > 0 && (
                                <Button
                                  icon="arrow-up"
                                  onClick={() => moveStep(index, index - 1)}
                                  label={__('Move Up', 'multi-step-form-builder')}
                                  isSmall
                                />
                              )}
                              {index < formConfig.steps.length - 1 && (
                                <Button
                                  icon="arrow-down"
                                  onClick={() => moveStep(index, index + 1)}
                                  label={__('Move Down', 'multi-step-form-builder')}
                                  isSmall
                                />
                              )}
                            </div>
                          </div>
                          <StepEditor
                            step={step}
                            stepIndex={index}
                            onUpdate={(updatedStep) => updateStep(index, updatedStep)}
                            onDelete={() => deleteStep(index)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="msf-empty-state">
                        <p>{__('No steps yet. Add your first step to get started.', 'multi-step-form-builder')}</p>
                      </div>
                    )}
                    <Button variant="secondary" onClick={addStep} className="msf-add-step-btn">
                      {__('Add Step', 'multi-step-form-builder')}
                    </Button>
                  </div>
                );
              }

              if (tab.name === 'settings') {
                return (
                  <FormSettings
                    settings={formConfig.settings || {}}
                    onUpdate={updateSettings}
                    formId={formId}
                  />
                );
              }
            })()}
          </Suspense>
        )}
      </TabPanel>
    </div>
  );
};

export default FormBuilder;
