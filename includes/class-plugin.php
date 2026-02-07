<?php

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

class Plugin
{

  private static ?Plugin $instance = null;

  private Database $database;
  private Post_Type $post_type;
  private Admin $admin;
  private Frontend $frontend;
  private Shortcode $shortcode;
  private REST_API $rest_api;

  public static function get_instance(): Plugin
  {
    if (self::$instance === null) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  private function __construct()
  {
    $this->load_dependencies();
    $this->init_components();

    \register_activation_hook(dirname(__DIR__) . '/multi-step-form-builder.php', array($this, 'activate'));
    \register_deactivation_hook(dirname(__DIR__) . '/multi-step-form-builder.php', array($this, 'deactivate'));
  }

  private function load_dependencies(): void
  {
    require_once \plugin_dir_path(__FILE__) . 'class-database.php';
    require_once \plugin_dir_path(__FILE__) . 'class-post-type.php';
    require_once \plugin_dir_path(__FILE__) . 'class-admin.php';
    require_once \plugin_dir_path(__FILE__) . 'class-frontend.php';
    require_once \plugin_dir_path(__FILE__) . 'class-shortcode.php';
    require_once \plugin_dir_path(__FILE__) . 'class-rest-api.php';
  }

  private function init_components(): void
  {
    $this->database = new Database();
    $this->post_type = new Post_Type();
    $this->admin = new Admin();
    $this->frontend = new Frontend();
    $this->shortcode = new Shortcode();
    $this->rest_api = new REST_API($this->database);
  }

  public function activate(): void
  {
    $this->database->create_table();
    \flush_rewrite_rules();
  }

  public function deactivate(): void
  {
    \flush_rewrite_rules();
  }
}
