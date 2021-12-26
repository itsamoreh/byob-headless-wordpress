<?php
/**
 * The main template file.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package byob
 */

/**
 * Redirect editors to the headless frontend.
 */
if ( defined('FRONTEND_APP_URL') ) { // Defined in byob-core plugin
	header( 'X-Redirect-By: BYOB Headless WordPress Theme' );
	header( 'Location: ' . FRONTEND_APP_URL . $_SERVER[REQUEST_URI], true, $statusCode );
	die();
}

?>

<!-- Show *something* if the redirect didn't work. -->
<main id="primary" class="site-main">
	<div>
		<h1>Redirection Error</h1>
		<p>There was a problem redirecting you to the headless frontend. Please manually navigate there to see your changes.</p>
		<p><small>Make sure to define <code>FRONTEND_APP_URL</code> in the BYOB Core plugin.</small></p>
	</div>
</main><!-- #primary -->
