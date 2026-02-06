import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, TextControl } from '@wordpress/components';
import FieldEditor from './FieldEditor';
import { FIELD_TYPES } from './FieldTypes';

const StepEditor = ({ step, stepIndex, onUpdate, onDelete }) => {
  const [showFieldTypes, setShowFieldTypes] = useState(false);

  const updateStep = (key, value) => {
    onUpdate({ ...step, [key]: value });
  };

  const addField = (fieldType) => {
    const newField = {
      ...fieldType.defaultConfig,
      name: `field_${Date.now()}`,
      id: `field_${Date.now()}`
    };
    const newFields = [...(step.fields || []), newField];
    updateStep('fields', newFields);
    setShowFieldTypes(false);
  };

  const updateField = (fieldIndex, updatedField) => {
    const newFields = [...step.fields];
    newFields[fieldIndex] = updatedField;
    updateStep('fields', newFields);
  };

  const deleteField = (fieldIndex) => {
    const newFields = step.fields.filter((_, i) => i !== fieldIndex);
    updateStep('fields', newFields);
  };

  const moveField = (fromIndex, toIndex) => {
    const newFields = [...step.fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    updateStep('fields', newFields);
  };

  return (
    <div className="msf-step-editor">
      <div className="msf-step-header">
        <TextControl
          label={__('Step Title', 'multi-step-form-builder')}
          value={step.title || ''}
          onChange={(value) => updateStep('title', value)}
          placeholder={__(`Step ${stepIndex + 1}`, 'multi-step-form-builder')}
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
        value={step.description || ''}
        onChange={(value) => updateStep('description', value)}
        placeholder={__('Optional description for this step', 'multi-step-form-builder')}
      />

      <div className="msf-fields-list">
        <h4>{__('Fields', 'multi-step-form-builder')}</h4>
        {step.fields?.length > 0 ? (
          step.fields.map((field, index) => (
            <div key={field.id || index} className="msf-field-item">
              {index > 0 && (
                <Button
                  icon="arrow-up"
                  onClick={() => moveField(index, index - 1)}
                  isSmall
                  className="msf-move-btn"
                />
              )}
              <FieldEditor
                field={field}
                onUpdate={(updatedField) => updateField(index, updatedField)}
                onDelete={() => deleteField(index)}
              />
              {index < step.fields.length - 1 && (
                <Button
                  icon="arrow-down"
                  onClick={() => moveField(index, index + 1)}
                  isSmall
                  className="msf-move-btn"
                />
              )}
            </div>
          ))
        ) : (
          <p className="msf-empty-message">{__('No fields yet. Add your first field below.', 'multi-step-form-builder')}</p>
        )}
      </div>

      <div className="msf-add-field">
        <Button
          variant="secondary"
          onClick={() => setShowFieldTypes(!showFieldTypes)}
        >
          {showFieldTypes ? __('Hide Field Types', 'multi-step-form-builder') : __('Add Field', 'multi-step-form-builder')}
        </Button>

        {showFieldTypes && (
          <div className="msf-field-types-grid">
            {FIELD_TYPES.map((fieldType) => (
              <button
                key={fieldType.type}
                className="msf-field-type-btn"
                onClick={() => addField(fieldType)}
              >
                <span className="msf-field-type-icon">{fieldType.icon}</span>
                <span className="msf-field-type-label">{fieldType.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepEditor;
