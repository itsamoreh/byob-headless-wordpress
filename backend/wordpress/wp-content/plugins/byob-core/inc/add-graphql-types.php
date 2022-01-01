<?php
/**
 * Register GraphQL types.
 *
 * @package byob-core
 */

/**
 * Register "onlySticky" argument.
 *
 * @see https://www.wpgraphql.com/2018/11/16/querying-sticky-posts-with-graphql/
 */
add_action(
	'graphql_register_types',
	function() {
		register_graphql_field(
			'RootQueryToPostConnectionWhereArgs',
			'onlySticky',
			array(
				'type'        => 'Boolean',
				'description' => __( 'Whether to only include sticky posts', 'your-textdomain' ),
			)
		);
	}
);

/**
 * Filter WP_Query for "onlySticky" argument.
 *
 * @see https://www.wpgraphql.com/2018/11/16/querying-sticky-posts-with-graphql/
 */
add_filter(
	'graphql_post_object_connection_query_args',
	function( $query_args, $source, $args, $context, $info ) {
		if ( isset( $args['where']['onlySticky'] ) && true === $args['where']['onlySticky'] ) {
			$sticky_ids                   = get_option( 'sticky_posts' );
			$query_args['posts_per_page'] = count( $sticky_ids );
			$query_args['post__in']       = $sticky_ids;
		}
		return $query_args;
	},
	10,
	5
);
