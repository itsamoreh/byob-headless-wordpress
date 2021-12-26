<?php
/**
 * Plugin Name:       BYOB ACF Fields
 * Plugin URI:        https://amorkumar.com
 * Description:       An example ACF plugin.
 * Author:            Amor Kumar
 * Author URI:        https://amorkumar.com
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * License:           GPL-2
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package byob-acf
 */

/**
 * Render the block preview iframe.
 *
 * The url will update as the editor fills in fields. The inline
 * style on the wrapper div prevents any interaction with the block.
 *
 * @param array $block The block being previewed.
 */
function byob_block_render_callback( $block ) {
	$frontend_url = FRONTEND_APP_URL; // Defined in byob-core plugin
	$attributes = get_fields();
	$attributes_encoded = urlencode(json_encode($attributes));

	echo '
		<div style="position: relative; width: 100%; height: 100%; pointer-events: none;">
			<iframe src="' . $frontend_url . '/block-preview?name=' . $block['name'] . '&acfAttributes=' . $attributes_encoded . '" title="description"></iframe>
		</div>
	';
}

/**
 * Include custom ACF block types.
 */
foreach( glob( dirname( __FILE__ ) . "/blocks/*.php" ) as $block){
	require $block;
}

/**
 * Include ACF field groups.
 */
foreach( glob( dirname( __FILE__ ) . "/fields/*.php" ) as $fields){
	require $fields;
}
