<?php
/**
 * Plugin Name:       BYOB Core
 * Plugin URI:        https://github.com/itsamoreh/byob-headless-wordpress
 * Description:       BYOB Headless WordPress Core Plugin.
 * Author:            Amor Kumar
 * Author URI:        https://amorkumar.com
 * Requires at least: 5.8
 * Requires PHP:      7.4
 *
 * @package byob-core
 */

// Block allowlist.
require_once dirname( __FILE__ ) . '/byob-allowlist.php';

// Includes.
require_once dirname( __FILE__ ) . '/inc/add-admin-notices.php';
require_once dirname( __FILE__ ) . '/inc/remove-admin-pages.php';
require_once dirname( __FILE__ ) . '/inc/remove-comments.php';
require_once dirname( __FILE__ ) . '/inc/set-home-url.php';
