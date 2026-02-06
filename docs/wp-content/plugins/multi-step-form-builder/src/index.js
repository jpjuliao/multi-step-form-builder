import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import { TabPanel, TextControl, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from 'react';

const FormBuilder = () => {
  const [formData, setFormData] = useState({ step1: '', step2: '' });
  const [currentTab, setCurrentTab] = useState('step1');

  useEffect(() => {
    apiFetch({ path: '/wp/v2/settings?_fields=form_steps_data' })
      .then(({ form_steps_data }) => setFormData(formData || {}));
  }, []);

  const saveForm = async () => {
    await apiFetch({
      path: '/wp/v2/settings',
      method: 'POST',
      body: { form_steps_data: formData }
    });
    wp.data.dispatch('core/notices').createNotice('success', 'Form saved successfully');
  };

  const tabs = [
    {
      name: 'step1',
      title: 'Step 1',
      content: <TextControl
        label="Field 1"
        value={formData.step1}
        onChange={(v) => setFormData({ ...formData, step1: v })} />
    },
    {
      name: 'step2',
      title: 'Step 2',
      content: <TextControl
        label="Field 2"
        value={formData.step2}
        onChange={(v) => setFormData({ ...formData, step2: v })} />
    }
  ];

  return (
    <div>
      <h1>{__('Form Builder', 'textdomain')}</h1>
      <TabPanel
        tabs={tabs}
        onSelect={(tab) => setCurrentTab(tab)} activeTab={currentTab}>
        {(tab) => <div>{tab.content}</div>}
      </TabPanel>
      <Button variant="primary" onClick={saveForm}>
        {__('Save Form', 'textdomain')}
      </Button>
    </div>
  );
};

createRoot(document.getElementById('form-builder-root'))
  .render(<FormBuilder />);
