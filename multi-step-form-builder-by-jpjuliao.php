<?php

/**
 * Plugin Name: Multi Step Form Builder by JPJuliao
 * Description: A comprehensive multi-step form builder plugin with drag-and-drop interface.
 * Version: 1.2.3
 * Author: Juan Pablo Juliao
 * Author URI: https://jpjuliao.github.io/
 * Text Domain: multi-step-form-builder-by-jpjuliao
 * Domain Path: /languages
 * License: GPL2
 * Tested up to: 6.9
 */

namespace JPJULIAO\Wordpress\MultiStepFormBuilder;

if (!defined('ABSPATH')) {
    exit;
}

// Load Composer autoloader if available.
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
} else {
    // Fallback to manual loading for environments without Composer.
    require_once __DIR__ . '/includes/Plugin.php';
}

function init(): void
{
    Plugin::get_instance();
}

\add_action('plugins_loaded', __NAMESPACE__ . '\\init');
