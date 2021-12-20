<?php
/**
 * Plugin Name:       BYOB Headless WordPress
 * Plugin URI:        https://github.com/itsamoreh/byob-headless-wordpress
 * Description:       Customize Gutenberg for BYOB Headless WordPress.
 * Author:            Amor Kumar
 * Author URI:        https://amorkumar.com
 * Version:           0.1
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * License:           GPL-3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * @package byob
 */

/**
 * This const is used to fix "Preview", "View Post" and internal links inside blocks.
 */
define( 'FRONTEND_APP_URL', 'http://localhost:3000' );

/**
 * Block allowlist.
 * Add new blocks to the array or they will not show in the editor.
 *
 * @param array $allowed_blocks Blocks to allow.
 */
function byob_allowed_block_types( $allowed_blocks ) {
	return array(
		'core/freeform',
	);
}
add_filter( 'allowed_block_types', 'byob_allowed_block_types' );

/**
 * Admin Favicon.
 * Add a custom favicon to the WordPress admin panel.
 */
function byob_admin_favicon() {
	echo '<link rel="icon" href="' . esc_url( plugin_dir_url( __FILE__ ) ) . 'public/favicon.ico" />';
}
add_action( 'login_head', 'byob_admin_favicon' );
add_action( 'admin_head', 'byob_admin_favicon' );
