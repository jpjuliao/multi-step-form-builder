<?php

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

/**
 * Frontend functionality
 */
class Frontend
{

  public function __construct()
  {
    add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
  }

  /**
   * Enqueue frontend assets
   */
  public function enqueue_frontend_assets()
  {
    // Only enqueue if shortcode is present
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'multi_step_form')) {
      wp_enqueue_script(
        'msf-frontend',
        plugin_dir_url(dirname(__FILE__)) . 'build/frontend.js',
        array('wp-element', 'wp-i18n', 'wp-api-fetch'),
        filemtime(plugin_dir_path(dirname(__FILE__)) . 'build/frontend.js'),
        true
      );

      wp_enqueue_style(
        'msf-frontend',
        plugin_dir_url(dirname(__FILE__)) . 'build/frontend.css',
        array(),
        filemtime(plugin_dir_path(dirname(__FILE__)) . 'build/frontend.css')
      );

      wp_localize_script('msf-frontend', 'msfFrontend', array(
        'apiUrl' => rest_url('msf/v1'),
        'nonce' => wp_create_nonce('wp_rest'),
      ));
    }
  }
}
