<?php
/**
 * Plugin Name:       BYOB Headless WordPress
 * Plugin URI:        https://github.com/itsamoreh/byob-headless-wordpress
 * Description:       Customize WordPress for BYOB Headless WordPress.
 * Author:            Amor Kumar
 * Author URI:        https://amorkumar.com
 * Requires at least: 5.8
 * Requires PHP:      7.4
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
