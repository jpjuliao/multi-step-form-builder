import { generateStepId } from '../utils/id';
import { moveItem } from '../utils/list';

export const useSteps = (formConfig, setFormConfig) => {
  const addStep = () => {
    const newStep = {
      id: generateStepId(),
      title: '',
      description: '',
      fields: [],
    };
    setFormConfig({
      ...formConfig,
      steps: [...(formConfig?.steps || []), newStep],
    });
  };

  const updateStep = (index, updatedStep) => {
    const steps = [...formConfig.steps];
    steps[index] = updatedStep;
    setFormConfig({ ...formConfig, steps });
  };

  const deleteStep = (index) => {
    const steps = formConfig.steps.filter((_, i) => i !== index);
    setFormConfig({ ...formConfig, steps });
  };

  const moveStep = (fromIndex, toIndex) => {
    const steps = moveItem(formConfig.steps, fromIndex, toIndex);
    setFormConfig({ ...formConfig, steps });
  };

  const updateSettings = (settings) => {
    setFormConfig({ ...formConfig, settings });
  };

  return {
    addStep,
    updateStep,
    deleteStep,
    moveStep,
    updateSettings,
  };
};
