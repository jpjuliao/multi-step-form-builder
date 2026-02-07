import apiFetch from '@wordpress/api-fetch';

export const triggerPostUpdate = () => {
  const editorDispatch = window.wp?.data?.dispatch?.('core/editor');
  if (editorDispatch?.savePost) {
    editorDispatch.savePost();
    return;
  }
  const publishBtn = document.getElementById('publish');
  if (publishBtn) {
    publishBtn.click();
    return;
  }
  const postForm = document.getElementById('post');
  if (postForm) {
    postForm.submit();
  }
};

export const setupPostSaveSync = (
  formId, getFormConfig, getIsSyncing = () => false
) => {
  const editorSelect = window.wp?.data?.select?.('core/editor');
  const editorSubscribe = window.wp?.data?.subscribe;

  let savingTransition = false;

  if (editorSubscribe && editorSelect) {
    const unsubscribe = editorSubscribe(() => {
      const selector = window.wp?.data?.select?.('core/editor');
      const isSavingPost = selector?.isSavingPost?.();
      const isAutosavingPost = selector?.isAutosavingPost?.();

      if (isSavingPost && !isAutosavingPost) {
        if (!savingTransition) {
          savingTransition = true;
          if (!getIsSyncing()) {
            const data = getFormConfig();
            apiFetch({
              path: `/msf/v1/forms/${formId}`,
              method: 'POST',
              data,
            }).catch(() => { });
          }
        }
      } else {
        savingTransition = false;
      }
    });
    return typeof unsubscribe === 'function' ? unsubscribe : () => { };
  }

  const handler = () => {
    const data = getFormConfig();
    apiFetch({
      path: `/msf/v1/forms/${formId}`,
      method: 'POST',
      data,
    }).catch(() => { });
  };

  const publishBtn = document.getElementById('publish');
  const saveDraftBtn = document.getElementById('save-post');

  if (publishBtn) {
    publishBtn.addEventListener('click', handler, { once: false });
  }
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', handler, { once: false });
  }

  return () => {
    if (publishBtn) {
      publishBtn.removeEventListener('click', handler);
    }
    if (saveDraftBtn) {
      saveDraftBtn.removeEventListener('click', handler);
    }
  };
};
