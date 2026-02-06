import './styles.css';
import { createRoot } from 'react-dom/client';
import MultiStepForm from './components/MultiStepForm';

// Find all form containers and initialize them
document.addEventListener('DOMContentLoaded', () => {
  const formContainers = document.querySelectorAll('.msf-form-container');

  formContainers.forEach(container => {
    const formId = container.dataset.formId;
    if (formId) {
      createRoot(container).render(<MultiStepForm formId={formId} />);
    }
  });
});
