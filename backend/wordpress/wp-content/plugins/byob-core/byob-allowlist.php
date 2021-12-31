<?php
/**
 * Gutenberg block allowlist.
 *
 * @package byob-core
 */

/**
 * Removes support for all blocks not included in the array.
 * Add supported block names to the array or they will not show in the editor.
 *
 * @param array $allowed_blocks Blocks to allow.
 */
function byob_allowed_block_types( $allowed_blocks ) {
	return array(
		'core/freeform',
		'acf/byob-call-to-action',
		'acf/byob-content',
	);
}
add_filter( 'allowed_block_types', 'byob_allowed_block_types' );
