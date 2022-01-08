<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package byob
 */

if ( ! function_exists( 'byob_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function byob_setup() {
		add_theme_support( 'post-thumbnails' );

		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'bring-your-own-blocks' ),
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'byob_setup' );

/**
 * Add custom editor styles.
 */
function byob_enable_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style-editor.css' );
}
add_action( 'after_setup_theme', 'byob_enable_editor_styles' );

/**
 * Add custom admin theme.
 */
function byob_admin_color_scheme() {
	wp_admin_css_color(
		'byob',
		__( 'BYOB' ),
		get_stylesheet_directory_uri() . '/style-admin.css',
		array( '#1e293b', '#f8fafc', '#d54e21', '#4f46e5' )
	);
}
add_action( 'admin_init', 'byob_admin_color_scheme' );

/**
 * Add custom login theme.
 */
function byob_login_styles() {
	wp_enqueue_style('custom-login', get_stylesheet_directory_uri() . '/style-login.css');
}
add_action( 'login_enqueue_scripts', 'byob_login_styles' );

/**
 * Disable admin color scheme picker and set default color scheme.
 */
function byob_set_admin_color() {
		remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );

		return 'byob';
}
add_filter( 'get_user_option_admin_color', 'byob_set_admin_color' );

/**
 * Add Favicon.
 * Add a custom favicon to the WordPress admin panel.
 */
function byob_admin_favicon() {
	echo '<link rel="icon" href="' . esc_url( get_template_directory_uri() ) . '/favicon.ico" />';
}
add_action( 'login_head', 'byob_admin_favicon' );
add_action( 'admin_head', 'byob_admin_favicon' );

/**
 * Disable Gutenberg's default fullscreen mode.
 */
function byob_disable_editor_fullscreen_mode() {
	$script = "jQuery( window ).load(function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } });";
	wp_add_inline_script( 'wp-blocks', $script );
}
add_action( 'enqueue_block_editor_assets', 'byob_disable_editor_fullscreen_mode' );

/**
 * Enable Gutenberg top toolbar.
 */
function byob_enable_editor_top_toolbar() {
	$script = "jQuery( window ).load(function() { const isfixedToolbar = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ); if ( !isfixedToolbar ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fixedToolbar' ); } });";
	wp_add_inline_script( 'wp-blocks', $script );
}
add_action( 'enqueue_block_editor_assets', 'byob_enable_editor_top_toolbar' );
