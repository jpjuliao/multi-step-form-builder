import './styles.css';
import { createRoot } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';

// Set up REST API
if (window.msfFrontend) {
  apiFetch.use(apiFetch.createNonceMiddleware(window.msfFrontend.nonce));
  apiFetch.use(apiFetch.createRootURLMiddleware(window.msfFrontend.apiUrl));
}

// Initialize forms on page load
document.addEventListener('DOMContentLoaded', () => {
  // Handle shortcode-based forms (inline or modal based on settings)
  const formContainers = document.querySelectorAll('.msf-form-container');

  // Process each form container
  Array.from(formContainers).forEach(async (container) => {
    const formId = container.dataset.formId;
    if (!formId) return;

    try {
      // Fetch form config to check display settings
      const formConfig = await apiFetch({
        path: `/msf/v1/forms/${formId}`,
      });

      const settings = formConfig.settings || {};

      // If modal on load is enabled, create modal instead of inline form
      if (settings.showModalOnLoad) {
        // Create modal container in body
        const modalContainer = document.createElement('div');
        modalContainer.id = `msf-modal-${formId}`;
        document.body.appendChild(modalContainer);

        import('./components/ModalWrapper').then(({ default: ModalWrapper }) => {
          createRoot(modalContainer).render(
            <ModalWrapper
              formId={formId}
              showModalOnLoad={true}
              modalDelay={settings.modalDelay || 0}
            />
          );
        });

        // Remove the original container since we're using modal
        container.remove();
      } else {
        // Regular inline form
        import('./components/MultiStepForm').then(({ default: MultiStepForm }) => {
          createRoot(container).render(<MultiStepForm formId={formId} />);
        });
      }
    } catch (error) {
      console.error('Error initializing form:', error);
      // Fallback to regular form
      import('./components/MultiStepForm').then(({ default: MultiStepForm }) => {
        createRoot(container).render(<MultiStepForm formId={formId} />);
      });
    }
  });

  const modalTriggerButtons = document.querySelectorAll('.msf-modal-trigger');

  Array.from(modalTriggerButtons).forEach(async (button) => {
    const formId = button.dataset.formId;
    if (!formId) return;

    try {
      const formConfig = await apiFetch({
        path: `/msf/v1/forms/${formId}`,
      });

      const settings = formConfig.settings || {};
      if (!settings.showModalOnButtonClick) return;

      button.addEventListener('click', () => {
        const existingModal = document.getElementById(`msf-modal-trigger-${formId}`);
        if (existingModal) {
          existingModal.remove();
        }

        const modalContainer = document.createElement('div');
        modalContainer.id = `msf-modal-trigger-${formId}`;
        document.body.appendChild(modalContainer);

        import('./components/ModalWrapper').then(({ default: ModalWrapper }) => {
          createRoot(modalContainer).render(
            <ModalWrapper
              formId={formId}
              showModalOnLoad={true}
              modalDelay={0}
            />
          );
        });
      });
    } catch (error) {
      console.error('Error initializing modal trigger:', error);
    }
  });

  // Handle global modal forms (no shortcode needed)
  if (window.msfFrontend && window.msfFrontend.modalForms) {
    window.msfFrontend.modalForms.forEach((modalForm) => {
      // Create modal container in body
      const modalContainer = document.createElement('div');
      modalContainer.id = `msf-modal-${modalForm.id}`;
      document.body.appendChild(modalContainer);

      import('./components/ModalWrapper').then(({ default: ModalWrapper }) => {
        createRoot(modalContainer).render(
          <ModalWrapper
            formId={modalForm.id}
            showModalOnLoad={true}
            modalDelay={modalForm.delay || 0}
          />
        );
      });
    });
  }
});
