<?php

su_add_shortcode(
	array(
		'id'       => 'display_posts',
		'callback' => 'su_shortcode_display_posts',
		'image'    => su_get_plugin_url() . 'admin/images/shortcodes/display-posts.svg',
		'icon'     => 'th-list',
		'name'     => __( 'Posts', 'shortcodes-ultimate' ),
		'type'     => 'single',
		'group'    => 'other',
		'article'  => 'https://getshortcodes.com/docs/display-posts/',
		'atts'     => array(
			'template'            => array(
				'default' => 'default-loop.php',
				'name'    => __( 'Template', 'shortcodes-ultimate' ),
				'desc'    => __( 'Relative path to the template file. Default templates placed in the plugin directory (templates folder). You can copy them under your theme directory and modify as you want. You can use following default templates that already available in the plugin directory:<br/><b%value>default-loop.php</b> - posts loop<br/><b%value>teaser-loop.php</b> - posts loop with thumbnail and title<br/><b%value>single-post.php</b> - single post template<br/><b%value>list-loop.php</b> - unordered list with posts titles', 'shortcodes-ultimate' ),
			),
			'ids'                 => array(
				'default' => '',
				'name'    => __( 'Post IDs', 'shortcodes-ultimate' ),
				'desc'    => __( 'Comma separated list of IDs of the posts that must be shown', 'shortcodes-ultimate' ),
			),
			'posts_per_page'      => array(
				'type'    => 'number',
				'min'     => -1,
				'max'     => 100,
				'step'    => 1,
				'default' => '',
				'name'    => __( 'Posts per page', 'shortcodes-ultimate' ),
				'desc'    => __( 'Number of posts that will be shown. Use -1 to display all posts', 'shortcodes-ultimate' ),
			),
			'post_type'           => array(
				'type'     => 'post_type',
				'multiple' => true,
				'values'   => array(),
				'default'  => 'post',
				'name'     => __( 'Post types', 'shortcodes-ultimate' ),
				'desc'     => __( 'Post types of the posts to show', 'shortcodes-ultimate' ),
			),
			'taxonomy_1'          => array(
				'type'    => 'taxonomy',
				'values'  => array(),
				'default' => 'category',
				'name'    => __( 'Taxonomy', 'shortcodes-ultimate' ),
				'desc'    => __( 'Taxonomy to show posts from', 'shortcodes-ultimate' ),
			),
			'tax_terms_1'         => array(
				'type'     => 'term',
				'multiple' => true,
				'values'   => array(),
				'default'  => '',
				'name'     => __( 'Terms', 'shortcodes-ultimate' ),
				'desc'     => __( 'The terms to show posts from', 'shortcodes-ultimate' ),
			),
			'tax_operator_1'      => array(
				'type'    => 'select',
				'values'  => array(
					'IN'     => __(
						'IN - posts that have any of the selected terms',
						'shortcodes-ultimate'
					),
					'NOT IN' => __(
						'NOT IN - posts that do not have any of the selected terms',
						'shortcodes-ultimate'
					),
					'AND'    => __(
						'AND - posts that have all of the selected terms',
						'shortcodes-ultimate'
					),
				),
				'default' => 'IN',
				'name'    => __( 'Taxonomy term operator', 'shortcodes-ultimate' ),
				'desc'    => __( 'Operator to test', 'shortcodes-ultimate' ),
			),
			'author'              => array(
				'default' => '',
				'name'    => __( 'Authors', 'shortcodes-ultimate' ),
				'desc'    => __( 'Comma separated list of author IDs. Example: 1,7,18', 'shortcodes-ultimate' ),
			),
			'meta_key'            => array(
				'default' => '',
				'name'    => __( 'Meta key', 'shortcodes-ultimate' ),
				'desc'    => __( 'Meta key name to show posts that have the specified meta field', 'shortcodes-ultimate' ),
			),
			'offset'              => array(
				'type'    => 'number',
				'min'     => 0,
				'max'     => 10000,
				'step'    => 1,
				'default' => 0,
				'name'    => __( 'Offset', 'shortcodes-ultimate' ),
				'desc'    => __( 'Number of post to displace or pass over. The offset parameter is ignored when posts_per_page=-1 (show all posts) is used.', 'shortcodes-ultimate' ),
			),
			'order'               => array(
				'type'    => 'select',
				'values'  => array(
					'desc' => __( 'Descending', 'shortcodes-ultimate' ),
					'asc'  => __( 'Ascending', 'shortcodes-ultimate' ),
				),
				'default' => 'desc',
				'name'    => __( 'Order', 'shortcodes-ultimate' ),
				'desc'    => __( 'Posts order', 'shortcodes-ultimate' ),
			),
			'orderby'             => array(
				'type'    => 'select',
				'values'  => array(
					'none'           => __( 'None', 'shortcodes-ultimate' ),
					'id'             => __( 'Post ID', 'shortcodes-ultimate' ),
					'author'         => __( 'Post author', 'shortcodes-ultimate' ),
					'title'          => __( 'Post title', 'shortcodes-ultimate' ),
					'name'           => __( 'Post slug', 'shortcodes-ultimate' ),
					'date'           => __( 'Date', 'shortcodes-ultimate' ),
					'modified'       => __( 'Last modified date', 'shortcodes-ultimate' ),
					'parent'         => __( 'Post parent', 'shortcodes-ultimate' ),
					'rand'           => __( 'Random', 'shortcodes-ultimate' ),
					'comment_count'  => __( 'Comments number', 'shortcodes-ultimate' ),
					'menu_order'     => __( 'Menu order', 'shortcodes-ultimate' ),
					'meta_value'     => __( 'Meta key values', 'shortcodes-ultimate' ),
					'meta_value_num' => __( 'Meta key values (Numeric)', 'shortcodes-ultimate' ),
				),
				'default' => 'date',
				'name'    => __( 'Order by', 'shortcodes-ultimate' ),
				'desc'    => __( 'Order posts by', 'shortcodes-ultimate' ),
			),
			'post_parent'         => array(
				'default' => '',
				'name'    => __( 'Post parent', 'shortcodes-ultimate' ),
				'desc'    => __( 'Show childrens of entered post (enter post ID)', 'shortcodes-ultimate' ),
			),
			'post_status'         => array(
				'type'    => 'select',
				'values'  => array(
					'publish'    => __( 'Published', 'shortcodes-ultimate' ),
					'pending'    => __( 'Pending', 'shortcodes-ultimate' ),
					'draft'      => __( 'Draft', 'shortcodes-ultimate' ),
					'auto-draft' => __( 'Auto-draft', 'shortcodes-ultimate' ),
					'future'     => __( 'Future post', 'shortcodes-ultimate' ),
					'private'    => __( 'Private post', 'shortcodes-ultimate' ),
					'inherit'    => __( 'Inherit', 'shortcodes-ultimate' ),
					'trash'      => __( 'Trashed', 'shortcodes-ultimate' ),
					'any'        => __( 'Any', 'shortcodes-ultimate' ),
				),
				'default' => 'publish',
				'name'    => __( 'Post status', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Show only posts with selected status',
					'shortcodes-ultimate'
				),
			),
			'ignore_sticky_posts' => array(
				'type'    => 'bool',
				'default' => 'no',
				'name'    => __( 'Ignore sticky', 'shortcodes-ultimate' ),
				'desc'    => __( 'Select Yes to ignore sticky posts', 'shortcodes-ultimate' ),
			),
		),
		'desc'     => __( 'Custom posts query with customizable template', 'shortcodes-ultimate' ),
	)
);

function su_shortcode_display_posts( $atts = null, $content = null ) {

	$raw      = (array) $atts;
	$defaults = su_get_shortcode_defaults( 'display_posts' );
	$atts     = su_parse_shortcode_atts( 'display_posts', $atts );
	$query    = array();

	// $atts = shortcode_atts(
	// 	array(
	//# 		// 'template'            => 'default-loop.php',
	// 		'id'                  => '',
	// 		'posts_per_page'      => get_option( 'posts_per_page' ),
	// 		'post_type'           => 'post',
	// 		'taxonomy'            => 'category',
	// 		'tax_term'            => false,
	// 		'tax_operator'        => 'IN',
	// 		'author'              => '',
	// 		'tag'                 => '',
	// 		'meta_key'            => '',
	// 		'offset'              => 0,
	// 		'order'               => 'DESC',
	// 		'orderby'             => 'date',
	// 		'post_parent'         => false,
	// 		'post_status'         => 'publish',
	// 		'ignore_sticky_posts' => 'no',
	// 	),
	// 	$atts,
	// 	'posts'
	// );

	if ( $atts['author'] ) {
		$query['author'] = sanitize_text_field( $atts['author'] );
	}

	if ( 'yes' === $atts['ignore_sticky_posts'] ) {
		$query['ignore_sticky_posts'] = true;
	}

	if ( $atts['offset'] ) {
		$query['offset'] = intval( $atts['offset'] );
	}

	if ( $atts['meta_key'] ) {
		$query['meta_key'] = sanitize_text_field( $atts['meta_key'] );
	}

	if ( $atts['order'] !== $defaults['order'] ) {
		$query['order'] = sanitize_key( $atts['order'] );
	}

	if ( $atts['orderby'] !== $defaults['orderby'] ) {
		$query['orderby'] = sanitize_key( $atts['orderby'] );
	}

	if ( $atts['post_status'] !== $defaults['post_status'] ) {
		$query['post_status'] = sanitize_key( $atts['post_status'] );
	}

	if (
		is_numeric( $atts['posts_per_page'] ) &&
		get_option( 'posts_per_page' ) !== $atts['posts_per_page']
	) {
		$query['posts_per_page'] = intval( $atts['posts_per_page'] );
	}

	if ( 'current' === $atts['post_parent'] ) {
		$atts['post_parent'] = get_the_ID();
	}

	if ( is_numeric( $atts['post_parent'] ) ) {
		$query['post_parent'] = intval( $atts['post_parent'] );
	}

	$atts['ids'] = array_map(
		'intval',
		array_filter( explode( ',', $atts['ids'] ), 'is_numeric' )
	);

	if ( ! empty( $atts['ids'] ) ) {
		$query['post__in'] = $atts['ids'];
	}

	$query['post_type'] = array_map(
		'sanitize_text_field',
		explode( ',', $atts['post_type'] )
	);

	for ( $i = 1; true; $i++ ) {

		if ( ! isset( $raw[ "taxonomy_{$i}" ] ) ) {
			$raw[ "taxonomy_{$i}" ] = 'category';
		}

		$raw[ "taxonomy_{$i}" ] = sanitize_text_field( $raw[ "taxonomy_{$i}" ] );

		if ( ! isset( $raw[ "tax_terms_{$i}" ] ) ) {
			break;
		}

		$raw[ "tax_terms_{$i}" ] = array_map(
			'sanitize_text_field',
			explode( ',', $raw[ "tax_terms_{$i}" ] )
		);

		$raw[ "tax_terms_{$i}" ] = array_filter(
			$raw[ "tax_terms_{$i}" ],
			function( $item ) {
				return ! empty( $item );
			}
		);

		if ( ! isset( $raw[ "tax_operator_{$i}" ] ) ) {
			$raw[ "tax_operator_{$i}" ] = 'IN';
		}

		$raw[ "tax_operator_{$i}" ] = sanitize_text_field( $raw[ "tax_operator_{$i}" ] );
		$raw[ "tax_operator_{$i}" ] = strtoupper( $raw[ "tax_operator_{$i}" ] );

		if (
			empty( $raw[ "taxonomy_{$i}" ] ) ||
			empty( $raw[ "tax_terms_{$i}" ] ) ||
			empty( $raw[ "tax_operator_{$i}" ] )
		) {
			break;
		}

		if ( ! isset( $query['tax_query'] ) ) {
			$query['tax_query'] = array();
		}

		$query['tax_query'][] = array(
			'taxonomy' => $raw[ "taxonomy_{$i}" ],
			'field'    => is_numeric( $raw[ "tax_terms_{$i}" ][0] ) ? 'id' : 'slug',
			'terms'    => $raw[ "tax_terms_{$i}" ],
			'operator' => $raw[ "tax_operator_{$i}" ],
		);

	}

	if ( ! isset( $raw['tax_relation'] ) ) {
		$raw['tax_relation'] = 'AND';
	}

	if (
		isset( $query['tax_query'] ) &&
		count( $query['tax_query'] ) > 1
	) {

		$query['tax_query']['relation'] = strtoupper(
			sanitize_key( $raw['tax_relation'] )
		);

	}

	$atts['template'] = su_shortcode_display_posts_locate_template( $atts['template'] );

	if ( ! $atts['template'] ) {

		return su_error_message(
			'Posts',
			__( 'invalid template name', 'shortcodes-ultimate' )
		);

	}

	$query = apply_filters( 'su/shortcode/display_posts/query', $query, $atts );

	var_dump( $query ); // TODO: remove (0)

	$su_posts = new WP_Query( $query );

	$output = su_shortcode_display_posts_include_template( $atts, $su_posts );

	wp_reset_postdata();

	su_query_asset( 'css', 'su-shortcodes' );

	return $output;

}

function su_shortcode_display_posts_include_template( $atts, $su_posts ) {

	ob_start();

	include $atts['template'];

	return ob_get_clean();

}

function su_shortcode_display_posts_locate_template( $template ) {

	$template = su_set_file_extension( $template, 'php' );
	$template = ltrim( $template, '\\/' );

	$locations = array(
		get_stylesheet_directory(),
		get_template_directory(),
		path_join(
			su_get_plugin_path(),
			'includes/partials/display-posts-templates'
		),
	);

	foreach ( $locations as $base ) {

		$base = untrailingslashit( $base );

		$path = path_join( $base, $template );
		$path = realpath( $path );

		if ( strpos( $path, $base ) === 0 ) {
			return $path;
		}

	}

	return false;

}
