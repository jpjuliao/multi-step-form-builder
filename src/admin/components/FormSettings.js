import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, PanelBody, ToggleControl } from '@wordpress/components';

const FormSettings = ({ settings, onUpdate }) => {
  const updateSetting = (key, value) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="msf-form-settings">
      <PanelBody title={__('Button Labels', 'multi-step-form-builder')} initialOpen={true}>
        <TextControl
          label={__('Next Button Text', 'multi-step-form-builder')}
          value={settings.nextButtonText || 'Next'}
          onChange={(value) => updateSetting('nextButtonText', value)}
        />
        <TextControl
          label={__('Previous Button Text', 'multi-step-form-builder')}
          value={settings.previousButtonText || 'Previous'}
          onChange={(value) => updateSetting('previousButtonText', value)}
        />
        <TextControl
          label={__('Submit Button Text', 'multi-step-form-builder')}
          value={settings.submitButtonText || 'Submit'}
          onChange={(value) => updateSetting('submitButtonText', value)}
        />
      </PanelBody>

      <PanelBody title={__('Messages', 'multi-step-form-builder')} initialOpen={true}>
        <TextareaControl
          label={__('Success Message', 'multi-step-form-builder')}
          value={settings.successMessage || 'Thank you for your submission!'}
          onChange={(value) => updateSetting('successMessage', value)}
          rows={3}
        />
      </PanelBody>

      <PanelBody title={__('Display Conditions', 'multi-step-form-builder')} initialOpen={false}>
        <ToggleControl
          label={__('Show in Modal on Page Load', 'multi-step-form-builder')}
          checked={settings.showModalOnLoad || false}
          onChange={(value) => updateSetting('showModalOnLoad', value)}
          help={__('Display the form in a modal popup when the page loads', 'multi-step-form-builder')}
        />
        {settings.showModalOnLoad && (
          <TextControl
            label={__('Delay (seconds)', 'multi-step-form-builder')}
            type="number"
            value={settings.modalDelay || 0}
            onChange={(value) => updateSetting('modalDelay', parseInt(value) || 0)}
            help={__('Delay before showing the modal (0 for immediate)', 'multi-step-form-builder')}
            min={0}
            max={60}
          />
        )}
      </PanelBody>
    </div>
  );
};

export default FormSettings;
