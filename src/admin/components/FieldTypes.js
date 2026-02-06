export const FIELD_TYPES = [
  {
    type: 'text',
    label: 'Text Field',
    icon: '📝',
    defaultConfig: {
      type: 'text',
      label: 'Text Field',
      name: '',
      placeholder: '',
      required: false,
      helpText: ''
    }
  },
  {
    type: 'email',
    label: 'Email',
    icon: '📧',
    defaultConfig: {
      type: 'email',
      label: 'Email Address',
      name: '',
      placeholder: 'example@email.com',
      required: false,
      helpText: ''
    }
  },
  {
    type: 'textarea',
    label: 'Textarea',
    icon: '📄',
    defaultConfig: {
      type: 'textarea',
      label: 'Message',
      name: '',
      placeholder: '',
      required: false,
      rows: 4,
      helpText: ''
    }
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: '📋',
    defaultConfig: {
      type: 'select',
      label: 'Select Option',
      name: '',
      required: false,
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ],
      helpText: ''
    }
  },
  {
    type: 'radio',
    label: 'Radio Buttons',
    icon: '🔘',
    defaultConfig: {
      type: 'radio',
      label: 'Choose One',
      name: '',
      required: false,
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ],
      helpText: ''
    }
  },
  {
    type: 'checkbox',
    label: 'Checkboxes',
    icon: '☑️',
    defaultConfig: {
      type: 'checkbox',
      label: 'Select All That Apply',
      name: '',
      required: false,
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ],
      helpText: ''
    }
  },
  {
    type: 'number',
    label: 'Number',
    icon: '🔢',
    defaultConfig: {
      type: 'number',
      label: 'Number',
      name: '',
      placeholder: '',
      required: false,
      min: '',
      max: '',
      step: '1',
      helpText: ''
    }
  },
  {
    type: 'tel',
    label: 'Phone',
    icon: '📱',
    defaultConfig: {
      type: 'tel',
      label: 'Phone Number',
      name: '',
      placeholder: '(555) 123-4567',
      required: false,
      helpText: ''
    }
  },
  {
    type: 'url',
    label: 'URL',
    icon: '🔗',
    defaultConfig: {
      type: 'url',
      label: 'Website URL',
      name: '',
      placeholder: 'https://example.com',
      required: false,
      helpText: ''
    }
  },
  {
    type: 'date',
    label: 'Date',
    icon: '📅',
    defaultConfig: {
      type: 'date',
      label: 'Date',
      name: '',
      required: false,
      helpText: ''
    }
  }
];
