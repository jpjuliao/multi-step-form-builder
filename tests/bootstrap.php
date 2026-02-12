<?php
/**
 * PHPUnit bootstrap file for the Multi Step Form Builder plugin.
 *
 * @package JPJULIAO\Wordpress\MultiStepFormBuilder\Tests
 */

// Ensure we're running from the plugin directory.
$plugin_dir = dirname(__DIR__);

// Mock WordPress hooks storage.
$GLOBALS['wp_actions'] = [];
$GLOBALS['wp_filters'] = [];

// Define minimal WordPress functions for testing without WordPress environment.
if (! function_exists('add_action')) {
    function add_action($hook_name, $callback, $priority = 10, $accepted_args = 1) {
        // Mock function for testing
        $GLOBALS['wp_actions'][$hook_name] = $callback;
        return true;
    }
}

if (! function_exists('has_action')) {
    function has_action($hook_name, $callback = false) {
        // Mock function for testing
        if ($callback === false) {
            return isset($GLOBALS['wp_actions'][$hook_name]);
        }
        return isset($GLOBALS['wp_actions'][$hook_name]) && $GLOBALS['wp_actions'][$hook_name] === $callback;
    }
}

if (! function_exists('register_activation_hook')) {
    function register_activation_hook($file, $callback) {
        // Mock function for testing
        $hook_name = 'activate_' . basename(dirname($file)) . '/' . basename($file);
        $GLOBALS['wp_actions'][$hook_name] = $callback;
        return true;
    }
}

if (! function_exists('register_deactivation_hook')) {
    function register_deactivation_hook($file, $callback) {
        // Mock function for testing
        $hook_name = 'deactivate_' . basename(dirname($file)) . '/' . basename($file);
        $GLOBALS['wp_actions'][$hook_name] = $callback;
        return true;
    }
}

if (! function_exists('flush_rewrite_rules')) {
    function flush_rewrite_rules() {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('add_shortcode')) {
    function add_shortcode($tag, $callback) {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('register_post_type')) {
    function register_post_type($post_type, $args = []) {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('register_rest_route')) {
    function register_rest_route($route, $args = []) {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('add_filter')) {
    function add_filter($hook_name, $callback, $priority = 10, $accepted_args = 1) {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('admin_enqueue_scripts')) {
    function admin_enqueue_scripts($hook) {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('add_admin_menu')) {
    function add_admin_menu() {
        // Mock function for testing
        return true;
    }
}

if (! function_exists('admin_menu')) {
    function admin_menu() {
        // Mock function for testing
        return true;
    }
}

// Mock $wpdb global object.
if (! isset($GLOBALS['wpdb'])) {
    $GLOBALS['wpdb'] = new class {
        public $prefix = 'wp_';
        
        public function get_charset_collate() {
            return 'DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci';
        }
        
        public function prepare($query, ...$args) {
            return $query;
        }
        
        public function query($query) {
            return true;
        }
        
        public function get_var($query) {
            return null;
        }
    };
}

// Define WordPress constants if not already defined.
if (! defined('ABSPATH')) {
    define('ABSPATH', $plugin_dir . '/');
}

if (! defined('WP_PLUGIN_DIR')) {
    define('WP_PLUGIN_DIR', ABSPATH . 'wp-content/plugins');
}

// Load Composer autoloader if available.
if (file_exists($plugin_dir . '/vendor/autoload.php')) {
    require_once $plugin_dir . '/vendor/autoload.php';
}

// Load the plugin.
require_once $plugin_dir . '/multi-step-form-builder-by-jpjuliao.php';

// Define test-specific constants.
define('MULTI_STEP_FORM_BUILDER_TESTS_DIR', __DIR__);
define('MULTI_STEP_FORM_BUILDER_PLUGIN_DIR', $plugin_dir);
