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
 * @see https://github.com/WordPress/gutenberg/issues/1761
 */
if ( defined( 'FRONTEND_APP_URL' ) ) {
	// Set home_url option "Settings > General > Site Address (URL)".
	update_option( 'home', FRONTEND_APP_URL );

	// Fix Gutenberg issues caused by different home and siteurl.
	add_filter(
		'rest_url',
		function( $url ) {
			$url = str_replace( home_url(), site_url(), $url );
			return $url;
		}
	);
}
