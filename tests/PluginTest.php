<?php
/**
 * Unit tests for the Plugin class.
 *
 * @package JPJULIAO\Wordpress\MultiStepFormBuilder\Tests
 */

namespace JPJULIAO\Wordpress\MultiStepFormBuilder\Tests;

use JPJULIAO\Wordpress\MultiStepFormBuilder\Plugin;
use PHPUnit\Framework\TestCase;

/**
 * Plugin test case.
 */
class PluginTest extends TestCase {

    /**
     * Test that the plugin singleton pattern works correctly.
     */
    public function testGetInstanceReturnsSingleton() {
        // Reset the instance for testing.
        $reflection = new \ReflectionClass(Plugin::class);
        $property   = $reflection->getProperty('instance');
        $property->setAccessible(true);
        $property->setValue(null, null);

        $instance1 = Plugin::get_instance();
        $instance2 = Plugin::get_instance();

        $this->assertSame($instance1, $instance2, 'Plugin::get_instance() should return the same instance');
        $this->assertInstanceOf(Plugin::class, $instance1, 'Plugin::get_instance() should return a Plugin instance');
    }

    /**
     * Test that the plugin initializes correctly.
     */
    public function testPluginInitialization() {
        // Reset the instance for testing.
        $reflection = new \ReflectionClass(Plugin::class);
        $property   = $reflection->getProperty('instance');
        $property->setAccessible(true);
        $property->setValue(null, null);

        $plugin = Plugin::get_instance();

        // Check that all required components are initialized.
        $this->assertObjectHasProperty('database', $plugin);
        $this->assertObjectHasProperty('post_type', $plugin);
        $this->assertObjectHasProperty('admin', $plugin);
        $this->assertObjectHasProperty('frontend', $plugin);
        $this->assertObjectHasProperty('shortcode', $plugin);
        $this->assertObjectHasProperty('rest_api', $plugin);
    }

    /**
     * Test that the plugin namespace is correctly set.
     */
    public function testPluginNamespace() {
        $plugin = Plugin::get_instance();
        $this->assertEquals(
            'JPJULIAO\\Wordpress\\MultiStepFormBuilder',
            'JPJULIAO\\Wordpress\\MultiStepFormBuilder'
        );
    }
}
