<?php

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

/**
 * Admin functionality
 */
class Admin
{

  public function __construct()
  {
    add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    add_action('admin_menu', array($this, 'add_admin_menu'));
  }

  /**
   * Enqueue admin assets
   */
  public function enqueue_admin_assets($hook)
  {
    global $post;

    // Only load on form edit screen
    if ($hook === 'post.php' || $hook === 'post-new.php') {
      if (isset($post) && $post->post_type === 'msf_form') {
        wp_enqueue_script(
          'msf-admin',
          plugin_dir_url(dirname(__FILE__)) . 'build/admin.js',
          array('wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch', 'wp-data'),
          filemtime(plugin_dir_path(dirname(__FILE__)) . 'build/admin.js'),
          true
        );

        wp_enqueue_style(
          'msf-admin',
          plugin_dir_url(dirname(__FILE__)) . 'build/admin.css',
          array('wp-components'),
          filemtime(plugin_dir_path(dirname(__FILE__)) . 'build/admin.css')
        );

        wp_localize_script('msf-admin', 'msfAdmin', array(
          'formId' => $post->ID,
          'apiUrl' => rest_url('msf/v1'),
          'nonce' => wp_create_nonce('wp_rest'),
        ));
      }
    }

    // Load on submissions page
    if (isset($_GET['page']) && $_GET['page'] === 'msf-submissions') {
      wp_enqueue_script(
        'msf-admin',
        plugin_dir_url(dirname(__FILE__)) . 'build/admin.js',
        array('wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch', 'wp-data'),
        filemtime(plugin_dir_path(dirname(__FILE__)) . 'build/admin.js'),
        true
      );

      wp_enqueue_style(
        'msf-admin',
        plugin_dir_url(dirname(__FILE__)) . 'build/admin.css',
        array('wp-components'),
        filemtime(plugin_dir_path(dirname(__FILE__)) . 'build/admin.css')
      );

      $form_id = isset($_GET['form_id']) ? intval($_GET['form_id']) : 0;

      wp_localize_script('msf-admin', 'msfAdmin', array(
        'formId' => $form_id,
        'apiUrl' => rest_url('msf/v1'),
        'nonce' => wp_create_nonce('wp_rest'),
      ));
    }
  }

  /**
   * Add admin menu items
   */
  public function add_admin_menu()
  {
    add_submenu_page(
      'edit.php?post_type=msf_form',
      __('Submissions', 'multi-step-form-builder'),
      __('Submissions', 'multi-step-form-builder'),
      'manage_options',
      'msf-submissions',
      array($this, 'render_submissions_page')
    );
  }

  /**
   * Render submissions page
   */
  public function render_submissions_page()
  {
    ?>
    <div class="wrap">
      <h1>
        <?php _e('Form Submissions', 'multi-step-form-builder'); ?>
      </h1>
      <div id="msf-submissions-root"></div>
    </div>
    <?php
  }
}
