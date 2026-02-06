import './styles.css';
import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import FormBuilder from './components/FormBuilder';
import SubmissionsList from './components/SubmissionsList';

// Initialize Form Builder on edit screen
const formBuilderRoot = document.getElementById('msf-form-builder-root');
if (formBuilderRoot) {
  createRoot(formBuilderRoot).render(<FormBuilder />);
}

// Initialize Submissions List on submissions page
const submissionsRoot = document.getElementById('msf-submissions-root');
if (submissionsRoot) {
  createRoot(submissionsRoot).render(<SubmissionsList />);
}
