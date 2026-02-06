const FormHeader = ({ formConfig }) => {
  const { title, description, showTitle = true, showDescription = true } = formConfig;

  return (
    <div className="msf-form-header">
      {showTitle && <h2 className="msf-form-title">{title}</h2>}
      {showDescription && <p className="msf-form-description">{description}</p>}
    </div>
  );
};

export default FormHeader;
