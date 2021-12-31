<?php
/**
 * Set WordPress home_url to the FRONTEND_APP_URL.
 *
 * @package byob-core
 */

/**
 * This will fix issues in Gutenberg when home_url
 * (Site / frontend URL) is different than site_url
 * (WordPress URL).
 *
 * @param string $url The url to replace.
 * @see https://github.com/WordPress/gutenberg/issues/1761
 */
function byob_fix_rest_url( $url ) {
	$url = str_replace( home_url(), site_url(), $url );
	return $url;
}

if ( defined( 'FRONTEND_APP_URL' ) ) {
	// Set home_url option "Settings > General > Site Address (URL)".
	update_option( 'home', FRONTEND_APP_URL );

	// Fix Gutenberg issues caused by different home and siteurl.
	add_filter( 'rest_url', 'byob_fix_rest_url' );
}
