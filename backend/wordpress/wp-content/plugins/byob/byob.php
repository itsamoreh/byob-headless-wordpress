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
