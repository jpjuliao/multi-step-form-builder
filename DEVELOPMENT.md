# Development Guide

This document provides instructions for setting up the development environment for the Multi Step Form Builder plugin.

## Requirements

- PHP 7.4 or higher
- Composer
- Git

## Setup

1. Clone the repository or navigate to the plugin directory
2. Install dependencies:

```bash
composer install
```

## Development Commands

### Running Tests

```bash
# Run all tests
composer test

# Run tests with coverage
composer test-coverage
```

### Code Quality

```bash
# Check code style
composer lint

# Fix code style issues automatically
composer lint-fix
```

### Development Dependencies

```bash
# Install development dependencies
composer install-dev
```

## Project Structure

```
multi-step-form-builder-by-jpjuliao/
├── composer.json                 # Composer configuration
├── composer.lock                 # Locked dependencies
├── phpcs.xml                    # PHPCS configuration
├── phpunit.xml                  # PHPUnit configuration
├── vendor/                      # Composer dependencies
├── includes/                    # Plugin classes
│   ├── Admin.php
│   ├── Database.php
│   ├── Frontend.php
│   ├── Plugin.php
│   ├── Post_Type.php
│   ├── REST_API.php
│   └── Shortcode.php
├── tests/                       # Test files
│   ├── bootstrap.php
│   ├── PluginTest.php
│   └── PluginIntegrationTest.php
├── languages/                   # Translation files
└── multi-step-form-builder-by-jpjuliao.php  # Main plugin file
```

## PSR-4 Autoloading

This plugin uses PSR-4 autoloading. The namespace `JPJULIAO\Wordpress\MultiStepFormBuilder` maps to the `includes/` directory.

## Testing

The plugin includes unit and integration tests using PHPUnit. The test suite includes:

- Unit tests for individual classes
- Integration tests for plugin functionality
- Mock WordPress functions for testing outside WordPress environment

## Code Standards

The plugin follows PSR-12 coding standards with WordPress-specific allowances:

- Snake_case method names (WordPress convention)
- Class names with underscores (WordPress convention)
- Line length up to 200 characters

## Contributing

1. Follow the existing code style
2. Write tests for new functionality
3. Ensure all tests pass before submitting
4. Run `composer lint` to check code style
