# Global Modal Display - Updated Feature

## Overview

The modal display feature now works **globally** on all pages when `showModalOnLoad` is enabled. No shortcode is required!

## How It Works

### Backend (PHP)

The `Frontend` class now:

1. **Queries all published forms** on every page load
2. **Checks each form's settings** for `showModalOnLoad`
3. **Passes modal forms to JavaScript** via `wp_localize_script`

```php
// In class-frontend.php
private function get_modal_forms() {
    // Query all published forms
    // Check settings for showModalOnLoad
    // Return array of modal forms with ID and delay
}
```

### Frontend (JavaScript)

The frontend initialization now handles two scenarios:

1. **Shortcode-based forms** - Forms embedded via `[multi_step_form id="X"]`
   - Can be inline OR modal based on settings
   
2. **Global modal forms** - Forms with `showModalOnLoad` enabled
   - Automatically rendered on ALL pages
   - No shortcode needed

```javascript
// Handle global modal forms
if (window.msfFrontend && window.msfFrontend.modalForms) {
    window.msfFrontend.modalForms.forEach((modalForm) => {
        // Create and render modal
    });
}
```

## Usage

### Enable Global Modal

1. Edit a form in WordPress admin
2. Go to **Settings** tab
3. Expand **Display Conditions**
4. Toggle **"Show in Modal on Page Load"** to ON
5. Set delay (optional)
6. **Save the form**

That's it! The form will now appear as a modal on **every page** of your site.

### Disable Global Modal

Simply toggle **"Show in Modal on Page Load"** to OFF and save.

## Data Flow

```
Page Load
    ↓
Frontend PHP checks for modal forms
    ↓
Passes modal forms array to JavaScript
    ↓
JavaScript creates modal containers
    ↓
Renders ModalWrapper components
    ↓
Modal appears after delay
```

## Performance Considerations

### Query Optimization

The `get_modal_forms()` method:
- Only queries published forms
- Uses `'fields' => 'ids'` for efficiency
- Caches results within the request

### Asset Loading

Frontend assets are enqueued when:
- A shortcode is present on the page, OR
- At least one form has modal enabled

This ensures assets are only loaded when needed.

## Multiple Modal Forms

You can have **multiple forms** with modal enabled:
- Each will appear in its own modal
- Each can have a different delay
- They will appear sequentially based on delay

**Example:**
- Form A: delay = 0 (appears immediately)
- Form B: delay = 5 (appears after 5 seconds)

## Shortcode Behavior

The shortcode still works as before:

```
[multi_step_form id="123"]
```

**If modal is enabled:**
- Modal appears globally on all pages
- Shortcode location is ignored (container removed)

**If modal is disabled:**
- Form displays inline at shortcode location
- Normal behavior

## Use Cases

### Popup Newsletter Signup
- Enable modal on newsletter form
- Set delay to 5 seconds
- Appears on all pages after 5 seconds

### Exit Intent Survey
- Enable modal on survey form
- Set delay to 0
- Use with exit intent plugin

### Lead Capture
- Enable modal on contact form
- Set delay to 10 seconds
- Appears after user browses for 10 seconds

## Technical Details

### Localized Script Data

```javascript
window.msfFrontend = {
    apiUrl: "http://site.com/wp-json/msf/v1",
    nonce: "abc123...",
    restUrl: "http://site.com/wp-json/",
    modalForms: [
        { id: 123, delay: 0 },
        { id: 456, delay: 5 }
    ]
};
```

### Form Meta Storage

Settings are stored in post meta:

```json
{
  "steps": [...],
  "settings": {
    "showModalOnLoad": true,
    "modalDelay": 5
  }
}
```

## Differences from Previous Version

### Before
- Modal only worked with shortcode
- Required shortcode on page
- Limited to specific pages

### After
- Modal works globally
- No shortcode required
- Appears on all pages when enabled

## Migration

Existing forms with modal enabled will automatically work globally after update. No migration needed.

## Future Enhancements

Potential additions:
- Page-specific targeting (show only on certain pages)
- User role targeting (show only to logged-in users)
- Cookie-based "don't show again"
- Frequency capping (once per session, once per day, etc.)
