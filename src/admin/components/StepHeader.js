import { TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const StepHeader = ({ title, description, index, onUpdate, onDelete }) => {
  return (
    <>
      <div className="msf-step-header">
        <TextControl
          label={__('Step Title', 'multi-step-form-builder')}
          value={title || ''}
          onChange={(value) => onUpdate('title', value)}
          placeholder={__(`Step ${index + 1}`, 'multi-step-form-builder')}
        />
        <Button
          icon="trash"
          label={__('Delete Step', 'multi-step-form-builder')}
          onClick={onDelete}
          isDestructive
        />
      </div>

      <TextControl
        label={__('Step Description', 'multi-step-form-builder')}
        value={description || ''}
        onChange={(value) => onUpdate('description', value)}
        placeholder={__('Optional description for this step', 'multi-step-form-builder')}
      />
    </>
  );
};

export default StepHeader;
