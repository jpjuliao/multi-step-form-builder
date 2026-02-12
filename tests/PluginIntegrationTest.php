<?php
/**
 * Integration tests for the Plugin class.
 *
 * @package JPJULIAO\Wordpress\MultiStepFormBuilder\Tests
 */

namespace JPJULIAO\Wordpress\MultiStepFormBuilder\Tests;

use JPJULIAO\Wordpress\MultiStepFormBuilder\Plugin;
use PHPUnit\Framework\TestCase;

/**
 * Plugin integration test case.
 */
class PluginIntegrationTest extends TestCase {

    /**
     * Test that the plugin initializes correctly in WordPress environment.
     */
    public function testPluginInitializationInWordPress() {
        // Reset the instance for testing.
        $reflection = new \ReflectionClass(Plugin::class);
        $property   = $reflection->getProperty('instance');
        $property->setAccessible(true);
        $property->setValue(null, null);

        $plugin = Plugin::get_instance();

        // Test that the plugin is properly initialized.
        $this->assertInstanceOf(Plugin::class, $plugin);

        // Test that WordPress hooks are properly set up.
        $this->assertTrue(has_action('plugins_loaded', 'JPJULIAO\\Wordpress\\MultiStepFormBuilder\\init'));
    }

    /**
     * Test plugin activation and deactivation hooks.
     */
    public function testPluginActivationDeactivationHooks() {
        $plugin = Plugin::get_instance();

        // Test that activation and deactivation methods exist.
        $this->assertTrue(method_exists($plugin, 'activate'));
        $this->assertTrue(method_exists($plugin, 'deactivate'));

        // Test that hooks are registered (this is a basic check).
        $this->assertTrue(has_action('activate_multi-step-form-builder-by-jpjuliao/multi-step-form-builder-by-jpjuliao.php'));
        $this->assertTrue(has_action('deactivate_multi-step-form-builder-by-jpjuliao/multi-step-form-builder-by-jpjuliao.php'));
    }
}
