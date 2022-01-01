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

/**
 * Includes.
 */
foreach ( glob( dirname( __FILE__ ) . '/inc/*.php' ) as $include ) {
	require $include;
}
