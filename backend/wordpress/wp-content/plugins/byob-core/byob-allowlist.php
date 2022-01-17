<?php
/**
 * Gutenberg block allowlist.
 *
 * @package byob-core
 */

/**
 * Removes support for all blocks not included in the array.
 * Add supported block names to the array or they will not show in the editor.
 */
add_filter(
	'allowed_block_types',
	function( $allowed_blocks ) {
		return array(
			'core/freeform',
			'acf/byob-call-to-action',
			'acf/byob-content',
		);
	}
);
