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
if ( defined( 'FRONTEND_APP_URL' ) ) { // Defined in byob-core plugin.
	header( 'X-Redirect-By: BYOB Headless WordPress Theme' );
	header( 'Location: ' . FRONTEND_APP_URL . $_SERVER[ REQUEST_URI ], true, $statusCode );
	die();
}

?>

<!-- Show *something* if the redirect didn't work. -->
<main id="primary" class="site-main">
		<div style="padding: 24px; border: 2px solid firebrick;">
			<h2 style="margin-top: 0; color: firebrick;">Redirect Error</h2>
			<p>Manually navigate to the frontend to see your changes. Activate the BYOB Core Plugin to be automatically redirected.</p>
			<p style="margin-bottom: 0;"><small><code>FRONTEND_APP_URL</code> is not defined.</small></p>
		</div>
</main><!-- #primary -->
