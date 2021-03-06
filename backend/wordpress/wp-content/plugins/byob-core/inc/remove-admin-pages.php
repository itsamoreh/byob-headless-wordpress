<?php
/**
 * Remove admin pages that are not needed or might
 * break things in a headless WordPress setup.
 *
 * @package byob-core
 */

define( 'DISALLOW_FILE_EDIT', true );

/**
 * Remove admin pages.
 */
add_action(
	'admin_menu',
	function() {
		global $submenu;

		// Themes.
		remove_submenu_page( 'themes.php', 'theme-editor.php' );

		// Tools.
		remove_submenu_page( 'tools.php', 'export.php' );
		remove_submenu_page( 'tools.php', 'tools.php' );
		remove_submenu_page( 'tools.php', 'import.php' );

		// Customizer.
		foreach ( $submenu as $name => $items ) {
			if ( $name === 'themes.php' ) {
				foreach ( $items as $i => $data ) {
					if ( in_array( 'customize', $data, true ) ) {
						unset( $submenu[ $name ][ $i ] );

						return;
					}
				}
			}
		}
	}
);

/**
 * Hide any links to the customizer.
 */
add_action('admin_head', function() {
	echo '<style>
    .hide-if-no-customize {
      display: none !important;
    }
  </style>';
});

/**
 * Remove admin dashboard widgets.
 */
add_action(
	'wp_dashboard_setup',
	function() {
		remove_action( 'welcome_panel', 'wp_welcome_panel' ); // Welcome Panel.
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' ); // Quick Draft.
		remove_meta_box( 'dashboard_primary', get_current_screen(), 'side' ); // News and Events.
		remove_meta_box( 'dashboard_site_health', get_current_screen(), 'normal' ); // Site Health.
	}
);
