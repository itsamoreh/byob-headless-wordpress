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


	if( !empty($frontend_url) ): ?>
		<div style="position: relative; width: 100%; height: 100%; pointer-events: none;">
			<iframe
				class="blockPreviewIframe"
				src="<?php echo($frontend_url . '/block-preview?name=' . $block['name'] . '&acfAttributes=' . $attributes_encoded); ?>"
				title="<?php echo($block['name'] . ' Preview'); ?>"
			></iframe>
		</div>
		<script>
			iFrameResize({ log: false, resizeFrom: "child", heightCalculationMethod: "max" }, ".blockPreviewIframe")
		</script>
	<?php else: ?>
		<div style="padding: 24px; border: 2px solid firebrick;">
			<h2 style="margin-top: 0; color: firebrick;">Preview Unavailable</h2>
			<p>Activate the BYOB Core Plugin to see block previews. <br/></p>
			<p style="margin-bottom: 0;"><small><code>FRONTEND_APP_URL</code> is not defined.</small></p>
		</div>
	<?php endif;
}

/**
 * Enqueue the iframe-resizer script.
 *
 * @see https://github.com/davidjbradshaw/iframe-resizer
 */
function byob_enqueue_iframe_resizer() {
	wp_enqueue_script(
			'byob-iframe-resizer',
			plugins_url( 'lib/iframe-resizer.js', __FILE__ )
	);
}
add_action( 'enqueue_block_editor_assets', 'byob_enqueue_iframe_resizer' );

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
