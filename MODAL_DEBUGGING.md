# Modal Debugging Guide

## How to Test the Modal Feature

### Step 1: Enable Modal in Form Settings
1. Go to WordPress Admin → Forms
2. Edit or create a form
3. Click the **Settings** tab
4. Expand **Display Conditions** panel
5. Toggle **"Show in Modal on Page Load"** to ON
6. Set delay (optional, 0 = immediate)
7. Click **Save Form**

### Step 2: Add Shortcode to Page
1. Create or edit a page/post
2. Add the shortcode: `[multi_step_form id="YOUR_FORM_ID"]`
3. Publish the page

### Step 3: View the Page
1. Visit the page on the frontend
2. The modal should appear after the specified delay

## Debugging Checklist

If the modal doesn't appear, check these items:

### ✅ Browser Console
Open browser DevTools (F12) and check the Console tab for errors:

**Expected behavior:**
- No JavaScript errors
- You should see the form container element briefly before it's removed

**Common errors:**
- `apiFetch is not defined` → WordPress dependencies not loaded
- `404 on /wp-json/msf/v1/forms/X` → REST API endpoint issue
- `Nonce verification failed` → Authentication issue

### ✅ Network Tab
Check the Network tab in DevTools:

**Look for:**
- Request to `/wp-json/msf/v1/forms/YOUR_FORM_ID`
- Should return 200 status
- Response should include `settings.showModalOnLoad: true`

**Example response:**
```json
{
  "steps": [...],
  "settings": {
    "showModalOnLoad": true,
    "modalDelay": 0,
    "nextButtonText": "Next",
    ...
  }
}
```

### ✅ Page Source
View page source (Ctrl+U) and verify:

**Should contain:**
```html
<div class="msf-form-container" data-form-id="YOUR_FORM_ID"></div>
```

**Scripts should be loaded:**
```html
<script src=".../build/frontend.js"></script>
<link rel="stylesheet" href=".../build/frontend.css">
```

**Localized script:**
```html
<script>
var msfFrontend = {
  "apiUrl": "http://yoursite.com/wp-json/msf/v1",
  "nonce": "...",
  "restUrl": "http://yoursite.com/wp-json/"
};
</script>
```

### ✅ DOM Inspection
After page loads, inspect the DOM:

**If modal is working:**
- You should see `<div id="msf-modal-YOUR_FORM_ID">` in the `<body>`
- Inside it: `.msf-modal-overlay` → `.msf-modal-content` → form

**If modal is NOT working:**
- The `.msf-form-container` div is still present (not removed)
- No modal container in body

## Common Issues & Solutions

### Issue 1: Scripts Not Loading
**Symptom:** No frontend.js in page source

**Solution:**
- Ensure shortcode is present in page content
- Clear WordPress cache
- Check file permissions on `build/frontend.js`

### Issue 2: REST API 404
**Symptom:** Network request to `/wp-json/msf/v1/forms/X` returns 404

**Solution:**
- Go to Settings → Permalinks and click "Save Changes" (flush rewrite rules)
- Verify REST API is working: visit `/wp-json/msf/v1/forms/YOUR_FORM_ID` directly

### Issue 3: Settings Not Saving
**Symptom:** Modal toggle is ON but API returns `showModalOnLoad: false`

**Solution:**
- Check browser console when saving form
- Verify POST request to `/wp-json/msf/v1/forms/X` succeeds
- Check form meta in database: `wp_postmeta` table, look for `_msf_form_config`

### Issue 4: Modal Appears But Empty
**Symptom:** Modal overlay shows but no form inside

**Solution:**
- Check console for React errors
- Verify form has steps and fields configured
- Check that `MultiStepForm` component is rendering

## Manual Testing Commands

### Check REST API Endpoint
```bash
# Replace YOUR_FORM_ID with actual ID
curl http://yoursite.local/wp-json/msf/v1/forms/YOUR_FORM_ID
```

### Check Form Meta in Database
```sql
SELECT * FROM wp_postmeta 
WHERE post_id = YOUR_FORM_ID 
AND meta_key = '_msf_form_config';
```

## Expected Flow

1. **Page loads** → DOMContentLoaded event fires
2. **Script finds** `.msf-form-container` elements
3. **For each container:**
   - Extract `data-form-id`
   - Fetch form config via REST API
   - Check `settings.showModalOnLoad`
4. **If true:**
   - Create modal container in body
   - Render `ModalWrapper` component
   - Remove original container
   - Modal appears after delay
5. **If false:**
   - Render inline form in original container

## Still Not Working?

Add debug logging to frontend code:

```javascript
// In src/frontend/index.js, add console.logs:
console.log('Form containers found:', formContainers.length);
console.log('Form ID:', formId);
console.log('Form config:', formConfig);
console.log('Show modal?', settings.showModalOnLoad);
```

Then rebuild: `npm run build`
