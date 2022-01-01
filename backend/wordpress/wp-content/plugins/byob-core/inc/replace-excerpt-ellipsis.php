<?php
/**
 * Replace the excerpt ellipsis.
 *
 * @package byob-core
 */

/**
 * Replace the excerpt ellipsis.
 */
add_filter(
	'excerpt_more',
	function( $more ) {
		return '...';
	}
);
