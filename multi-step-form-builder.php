<?php
/**
 * Plugin Name: Multi Step Form Builder
 * Description: A comprehensive multi-step form builder plugin with drag-and-drop interface.
 * Version: 1.0.0
 * Author: JP Juliao
 * Text Domain: multi-step-form-builder
 * Domain Path: /languages
 */

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

// Define plugin constants
define('MSF_VERSION', '1.0.0');
define('MSF_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('MSF_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load main plugin class
require_once MSF_PLUGIN_DIR . 'includes/class-plugin.php';

// Initialize plugin
function msf_init()
{
  Plugin::get_instance();
}
add_action('plugins_loaded', __NAMESPACE__ . '\\msf_init');
