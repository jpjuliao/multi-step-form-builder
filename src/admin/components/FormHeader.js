import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, ToggleControl } from '@wordpress/components';

const FormHeader = ({ formConfig, updateFormConfig }) => {
  const { title, description, showTitle = true, showDescription = true } = formConfig;

  const updateHeader = (key, value) => {
    updateFormConfig({
      ...formConfig,
      [key]: value
    });
  };

  return (
    <div className="msf-form-header-settings">
      <ToggleControl
        label={__('Show Title', 'multi-step-form-builder')}
        checked={showTitle}
        onChange={(value) => updateHeader('showTitle', value)}
      />

      {showTitle && (
        <TextControl
          label={__('Form Title', 'multi-step-form-builder')}
          value={title || ''}
          onChange={(value) => updateHeader('title', value)}
          placeholder={__('Enter form title', 'multi-step-form-builder')}
        />
      )}

      <ToggleControl
        label={__('Show Description', 'multi-step-form-builder')}
        checked={showDescription}
        onChange={(value) => updateHeader('showDescription', value)}
      />

      {showDescription && (
        <TextareaControl
          label={__('Form Description', 'multi-step-form-builder')}
          value={description || ''}
          onChange={(value) => updateHeader('description', value)}
          placeholder={__('Enter form description', 'multi-step-form-builder')}
          rows={3}
        />
      )}
    </div>
  );
};

export default FormHeader;
