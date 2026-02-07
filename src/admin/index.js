import './styles.css';
import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';

// Initialize Form Builder on edit screen
const formBuilderRoot = document.getElementById('msf-form-builder-root');
if (formBuilderRoot) {
  import('./components/FormBuilder').then(({ default: FormBuilder }) => {
    createRoot(formBuilderRoot).render(<FormBuilder />);
  });
}

// Initialize Submissions List on submissions page
const submissionsRoot = document.getElementById('msf-submissions-root');
if (submissionsRoot) {
  import('./components/SubmissionsList').then(({ default: SubmissionsList }) => {
    createRoot(submissionsRoot).render(<SubmissionsList />);
  });
}
