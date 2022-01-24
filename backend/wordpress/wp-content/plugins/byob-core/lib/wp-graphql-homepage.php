<?php
/**
 * A WPGraphQL Extension that adds a root query to the GraphQL schema that returns the front page.
 *
 * @see      http://github.com/ashhitch/wp-graphql-homepage
 * @author   Ash Hitchcock
 * @version  1.0.0
 * @package  byob-core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use WPGraphQL\AppContext;
use WPGraphQL\Data\DataSource;

add_action( 'graphql_register_types', function() {

	register_graphql_field( 'RootQuery', 'homepage', [
		'type' => 'Page',
		'description' => __( 'Returns the homepage', 'wp-graphql-homepage' ),
		'resolve' => function($item, array $args, AppContext $context) {
			$page_on_front = get_option( 'page_on_front', 0 );

			if ($page_on_front == 0 ) {
				return null;
			}

			return  DataSource::resolve_post_object( $page_on_front, $context );
		},
	]);

	register_graphql_field( 'RootQuery', 'pageForPosts', [
		'type' => 'Page',
		'description' => __( 'Returns the page for posts', 'wp-graphql-homepage' ),
		'resolve' => function($item, array $args, AppContext $context) {
			$page_for_posts = get_option( 'page_for_posts', 0 );

			if ($page_for_posts == 0 ) {
				return null;
			}

			return DataSource::resolve_post_object( $page_for_posts, $context );
		},
	]);

} );
