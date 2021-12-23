<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package bring-your-own-blocks
 */

?>

	<style>
		body {
			font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
		}

		.site-main {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	</style>

	<main id="primary" class="site-main">

	<?php if ( is_customize_preview() ) : ?>
		<p>Please navigate to the headless frontend to see your changes.</p>
	<?php else : ?>
		<p>Please navigate to the headless frontend or the <a href="/wp-admin">WordPress Admin Panel</a>.</p>
	<?php endif; ?>

	</main><!-- #primary -->
