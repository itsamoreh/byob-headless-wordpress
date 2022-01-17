<?php
/**
 * Register a Call to Action ACF block.
 *
 * @package byob-acf
 */

/**
 * Init Call to Action block.
 */
add_action(
	'acf/init',
	function() {
		if ( function_exists( 'acf_register_block_type' ) ) {

			acf_register_block_type(
				array(
					'name'            => 'byob-call-to-action',
					'title'           => __( 'Call to Action' ),
					'description'     => __( 'Call the user to action!' ),
					'icon'            => 'admin-comments',
					'keywords'        => array( 'cta', 'call' ),
					'render_callback' => 'byob_block_render_callback',
					'mode'            => 'edit',
					'supports'        => array(
						'align' => false,
					),
				)
			);
		}
	}
);
