<?php

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

class Shortcode
{

  public function __construct()
  {
    \add_shortcode('multi_step_form', array($this, 'render_shortcode'));
  }

  public function render_shortcode(array $atts): string
  {
    $atts = \shortcode_atts(array(
      'id' => 0,
    ), $atts);

    $form_id = intval($atts['id']);

    if (!$form_id) {
      return '<p>' . __('Please provide a valid form ID.', 'multi-step-form-builder') . '</p>';
    }

    $post = \get_post($form_id);
    if (!$post || $post->post_type !== 'msf_form') {
      return '<p>' . __('Form not found.', 'multi-step-form-builder') . '</p>';
    }

    return sprintf(
      '<div class="msf-form-container" data-form-id="%d"></div>',
      $form_id
    );
  }
}
