<?php
/**
 * Plugin Name: Multi Step Form Builder by JPJuliao
 * Description: A comprehensive multi-step form builder plugin with drag-and-drop interface.
 * Version: 1.2.0
 * Author: Juan Pablo Juliao
 * Author URI: https://jpjuliao.github.io/
 * Text Domain: multi-step-form-builder
 * Domain Path: /languages
 * License: GPL2
 * Tested up to: 6.9
 */

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

if (!defined('ABSPATH')) {
  exit;
}

define('MSF_VERSION', '1.2.0');
define('MSF_PLUGIN_DIR', \plugin_dir_path(__FILE__));
define('MSF_PLUGIN_URL', \plugin_dir_url(__FILE__));

require_once MSF_PLUGIN_DIR . 'includes/class-plugin.php';

function msf_init(): void
{
  Plugin::get_instance();
}

\add_action('plugins_loaded', __NAMESPACE__ . '\\msf_init');
