const FormField = ({ field, value, onChange, error }) => {
  const handleChange = (e) => {
    if (field.type === 'checkbox') {
      const checkboxValue = e.target.value;
      const currentValues = Array.isArray(value) ? value : [];

      if (e.target.checked) {
        onChange([...currentValues, checkboxValue]);
      } else {
        onChange(currentValues.filter(v => v !== checkboxValue));
      }
    } else {
      onChange(e.target.value);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
            className="msf-textarea"
          />
        );

      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="msf-select"
          >
            <option value="">Select an option...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="msf-radio-group">
            {field.options?.map((option, index) => (
              <label key={index} className="msf-radio-label">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={field.required}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="msf-checkbox-group">
            {field.options?.map((option, index) => (
              <label key={index} className="msf-checkbox-label">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={handleChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            step={field.step}
            className="msf-input"
          />
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className="msf-input"
          />
        );
    }
  };

  return (
    <div className={`msf-field msf-field-${field.type} ${error ? 'msf-field-error' : ''}`}>
      <label htmlFor={field.name} className="msf-label">
        {field.label}
        {field.required && <span className="msf-required">*</span>}
      </label>
      {renderField()}
      {field.helpText && <p className="msf-help-text">{field.helpText}</p>}
      {error && <p className="msf-error-message">{error}</p>}
    </div>
  );
};

export default FormField;
