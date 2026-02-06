import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, PanelBody } from '@wordpress/components';

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
    </div>
  );
};

export default FormSettings;
