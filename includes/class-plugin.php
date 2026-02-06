<?php

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

/**
 * Main plugin class
 */
class Plugin
{

  private static $instance = null;

  private $database;
  private $post_type;
  private $admin;
  private $frontend;
  private $shortcode;
  private $rest_api;

  /**
   * Get singleton instance
   */
  public static function get_instance()
  {
    if (self::$instance === null) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  /**
   * Constructor
   */
  private function __construct()
  {
    $this->load_dependencies();
    $this->init_components();

    register_activation_hook(dirname(__DIR__) . '/multi-step-form-builder.php', array($this, 'activate'));
    register_deactivation_hook(dirname(__DIR__) . '/multi-step-form-builder.php', array($this, 'deactivate'));
  }

  /**
   * Load required files
   */
  private function load_dependencies()
  {
    require_once plugin_dir_path(__FILE__) . 'class-database.php';
    require_once plugin_dir_path(__FILE__) . 'class-post-type.php';
    require_once plugin_dir_path(__FILE__) . 'class-admin.php';
    require_once plugin_dir_path(__FILE__) . 'class-frontend.php';
    require_once plugin_dir_path(__FILE__) . 'class-shortcode.php';
    require_once plugin_dir_path(__FILE__) . 'class-rest-api.php';
  }

  /**
   * Initialize components
   */
  private function init_components()
  {
    $this->database = new Database();
    $this->post_type = new Post_Type();
    $this->admin = new Admin();
    $this->frontend = new Frontend();
    $this->shortcode = new Shortcode();
    $this->rest_api = new REST_API($this->database);
  }

  /**
   * Plugin activation
   */
  public function activate()
  {
    $this->database->create_table();
    flush_rewrite_rules();
  }

  /**
   * Plugin deactivation
   */
  public function deactivate()
  {
    flush_rewrite_rules();
  }
}
