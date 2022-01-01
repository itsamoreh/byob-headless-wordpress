<?php
/**
 * Replace the excerpt ellipsis.
 *
 * @package byob-core
 */

/**
 * Replace the excerpt ellipsis.
 *
 * @param string $more The more ellipsis.
 */
function byob_replace_excerpt_ellipsis( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'byob_replace_excerpt_ellipsis' );
