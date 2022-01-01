<?php
/**
 * Add admin notices to try to keep admins
 * from breaking the headless WordPress setup.
 *
 * @package byob-core
 */

global $pagenow;

/**
 * Error notice if FRONTEND_APP_URL is not defined.
 */
if ( ! defined( 'FRONTEND_APP_URL' ) ) {
	add_action(
		'admin_notices',
		function() {
			$class   = 'notice notice-error is-dismissible';
			$error   = '<p></p>';
			$message = sprintf(
				'
				<b>Error! <code>FRONTEND_APP_URL</code> is not defined.</b>

				WordPress might be disconnected from the headless frontend.

				You can manually point WordPress to the frontend app in <b>Settings > General > Site Address (URL)</b>.

				Site Address is currently: <a href="%1$s">%1$s</a>.
			',
				get_home_url()
			);

			printf( '<div class="%1$s">%2$s %3$s</div>', esc_attr( $class ), wp_kses_post( $error ), wp_kses_post( wpautop( $message ) ) );
		}
	);
}

/**
 * Warning notice for plugins screens.
 */
if ( in_array( $pagenow, array( 'plugins.php', 'plugin-install.php' ), true ) ) {
	add_action(
		'admin_notices',
		function() {
			$class   = 'notice notice-warning is-dismissible';
			$message =
			'
				<b>Warning! Advanced users only.</b>

				Since this is a headless WordPress setup, plugins work a little differently.

				Only install, deactivate, or update plugins if you know what you\'re doing.
			';
			printf( '<div class="%1$s">%2$s</div>', esc_attr( $class ), wp_kses_post( wpautop( $message ) ) );
		}
	);
}

/**
 * Warning notice for settings screens.
 */
if ( in_array( $pagenow, array( 'options-general.php', 'options-writing.php', 'options-reading.php', 'options-media.php', 'options-permalink.php' ), true ) ) {
	add_action(
		'admin_notices',
		function() {
			$class   = 'notice notice-warning is-dismissible';
			$message = '
			<b>Warning! Advanced users only.</b>

			Since this is a headless WordPress setup, settings work a little differently.

			Only change settings if you know what you\'re doing.
		';
			printf( '<div class="%1$s">%2$s</div>', esc_attr( $class ), wp_kses_post( wpautop( $message ) ) );
		}
	);
}
