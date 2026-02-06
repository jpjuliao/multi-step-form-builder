const ProgressBar = ({ currentStep, totalSteps, steps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="msf-progress-container">
      <div className="msf-progress-bar">
        <div
          className="msf-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="msf-progress-steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`msf-progress-step ${index < currentStep ? 'completed' :
                index === currentStep ? 'active' :
                  'pending'
              }`}
          >
            <div className="msf-progress-step-number">
              {index < currentStep ? '✓' : index + 1}
            </div>
            <div className="msf-progress-step-label">
              {step.title || `Step ${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
