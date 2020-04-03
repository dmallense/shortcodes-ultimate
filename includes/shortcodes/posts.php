<?php

su_add_shortcode(
	array(
		'id'       => 'posts',
		'callback' => 'su_shortcode_posts',
		'image'    => su_get_plugin_url() . 'admin/images/shortcodes/posts.svg',
		'name'     => __( 'Posts', 'shortcodes-ultimate' ),
		'type'     => 'single',
		'group'    => 'other',
		'article'  => 'https://getshortcodes.com/docs/posts/',
		'atts'     => array(
			'template'            => array(
				'default' => 'templates/default-loop.php',
				'name'    => __( 'Template', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Relative path to the template file. Default templates placed in the plugin directory (templates folder). You can copy them under your theme directory and modify as you want. You can use following default templates that already available in the plugin directory:<br/><b%value>templates/default-loop.php</b> - posts loop<br/><b%value>templates/teaser-loop.php</b> - posts loop with thumbnail and title<br/><b%value>templates/single-post.php</b> - single post template<br/><b%value>templates/list-loop.php</b> - unordered list with posts titles',
					'shortcodes-ultimate'
				),
			),
			'id'                  => array(
				'default' => '',
				'name'    => __( 'Post IDs', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Comma separated list of IDs of the posts that must be shown',
					'shortcodes-ultimate'
				),
			),
			'posts_per_page'      => array(
				'type'    => 'number',
				'min'     => -1,
				'max'     => 10000,
				'step'    => 1,
				'default' => get_option( 'posts_per_page' ),
				'name'    => __( 'Posts per page', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Number of posts that will be shown. Use -1 to display all posts',
					'shortcodes-ultimate'
				),
			),
			'post_type'           => array(
				'type'     => 'post_type',
				'multiple' => true,
				'values'   => array(),
				'default'  => 'post',
				'name'     => __( 'Post types', 'shortcodes-ultimate' ),
				'desc'     => __(
					'Post types of the posts to show',
					'shortcodes-ultimate'
				),
			),
			'taxonomy'            => array(
				'type'    => 'taxonomy',
				'values'  => array(),
				'default' => 'category',
				'name'    => __( 'Taxonomy', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Taxonomy to show posts from',
					'shortcodes-ultimate'
				),
			),
			'tax_term'            => array(
				'type'     => 'term',
				'multiple' => true,
				'values'   => array(),
				'default'  => '',
				'name'     => __( 'Terms', 'shortcodes-ultimate' ),
				'desc'     => __( 'The terms to show posts from', 'shortcodes-ultimate' ),
			),
			'tax_operator'        => array(
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
				'desc'    => __(
					'Comma separated list of author IDs. Example: 1,7,18',
					'shortcodes-ultimate'
				),
			),
			'meta_key'            => array(
				'default' => '',
				'name'    => __( 'Meta key', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Meta key name to show posts that have the specified meta field',
					'shortcodes-ultimate'
				),
			),
			'offset'              => array(
				'type'    => 'number',
				'min'     => 0,
				'max'     => 10000,
				'step'    => 1,
				'default' => 0,
				'name'    => __( 'Offset', 'shortcodes-ultimate' ),
				'desc'    => __(
					'Number of post to displace or pass over. The offset parameter is ignored when posts_per_page=-1 (show all posts) is used.',
					'shortcodes-ultimate'
				),
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
				'desc'    => __(
					'Show childrens of entered post (enter post ID)',
					'shortcodes-ultimate'
				),
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
				'desc'    => __(
					'Select Yes to ignore sticky posts',
					'shortcodes-ultimate'
				),
			),
		),
		'desc'     => __(
			'Custom posts query with customizable template',
			'shortcodes-ultimate'
		),
		'icon'     => 'th-list',
	)
);

function su_shortcode_posts( $atts = null, $content = null ) {
	$original_atts = $atts;

	// ‼️
	// replace :208 with su_parse_shortcode_atts()
	$atts = su_parse_shortcode_atts(
		'posts',
		$atts,
		array(
			'taxonomy_2'     => null,
			'taxonomy_3'     => null,
			'taxonomy_4'     => null,
			'taxonomy_5'     => null,
			'tax_2_term'     => null,
			'tax_3_term'     => null,
			'tax_4_term'     => null,
			'tax_5_term'     => null,
			'tax_2_operator' => null,
			'tax_3_operator' => null,
			'tax_4_operator' => null,
			'tax_5_operator' => null,
		)
	);

	$atts = shortcode_atts(
		array(
			// 'template'            => 'templates/default-loop.php',

			// ‼️
			// id attribute isn't equal to the default '' / false
			'id'                  => false,
			'posts_per_page'      => get_option( 'posts_per_page' ),
			'post_type'           => 'post',
			'taxonomy'            => 'category',
			'tax_term'            => false,
			'tax_operator'        => 'IN',
			'author'              => '',
			'tag'                 => '',
			'meta_key'            => '',
			'offset'              => 0,
			'order'               => 'DESC',
			'orderby'             => 'date',
			'post_parent'         => false,
			'post_status'         => 'publish',
			'ignore_sticky_posts' => 'no',
		),
		$atts,
		'posts'
	);

	$args = array();

	$args['author']              = sanitize_text_field( $atts['author'] );
	$args['ignore_sticky_posts'] = 'yes' === $atts['ignore_sticky_posts'];
	$args['offset']              = intval( $atts['offset'] );
	$args['order']               = sanitize_key( $atts['order'] );
	$args['orderby']             = sanitize_key( $atts['orderby'] );
	$args['meta_key']            = sanitize_text_field( $atts['meta_key'] );
	$args['post_status']         = sanitize_key( $atts['post_status'] );
	$args['posts_per_page']      = intval( $atts['posts_per_page'] );
	$args['tag']                 = sanitize_text_field( $atts['tag'] );

	if ( 'current' === $atts['post_parent'] ) {
		$atts['post_parent'] = get_the_ID();
	}

	if ( is_numeric( $atts['post_parent'] ) ) {
		$args['post_parent'] = intval( $atts['post_parent'] );
	}

	$atts['id'] = array_map(
		'intval',
		array_filter( explode( ',', $atts['id'] ), 'is_numeric' )
	);

	if ( ! empty( $atts['id'] ) ) {
		$args['post__in'] = $atts['id'];
	}

	$atts['post_type'] = array_map(
		'sanitize_text_field',
		explode( ',', $atts['post_type'] )
	);

	$args['post_type'] = 1 === count( $atts['post_type'] )
		? $atts['post_type'][0]
		: $atts['post_type'];




	$tax_operator = $atts['tax_operator'];
	$tax_term     = sanitize_text_field( $atts['tax_term'] );
	$taxonomy     = sanitize_key( $atts['taxonomy'] );

	// If taxonomy attributes, create a taxonomy query
	if ( ! empty( $taxonomy ) && ! empty( $tax_term ) ) {
		// Term string to array
		$tax_term = explode( ',', $tax_term );
		// Validate operator
		$tax_operator = str_replace(
			array( 0, 1, 2 ),
			array( 'IN', 'NOT IN', 'AND' ),
			$tax_operator
		);
		if ( ! in_array( $tax_operator, array( 'IN', 'NOT IN', 'AND' ), true ) ) {
			$tax_operator = 'IN';
		}
		$tax_args = array(
			'tax_query' => array(
				array(
					'taxonomy' => $taxonomy,
					'field'    => is_numeric( $tax_term[0] ) ? 'id' : 'slug',
					'terms'    => $tax_term,
					'operator' => $tax_operator,
				),
			),
		);
		// Check for multiple taxonomy queries
		$count            = 2;
		$more_tax_queries = false;
		while (
			isset( $original_atts[ 'taxonomy_' . $count ] ) &&
			! empty( $original_atts[ 'taxonomy_' . $count ] ) &&
			isset( $original_atts[ 'tax_' . $count . '_term' ] ) &&
			! empty( $original_atts[ 'tax_' . $count . '_term' ] )
		) {
			// Sanitize values
			$more_tax_queries        = true;
			$taxonomy                = sanitize_key( $original_atts[ 'taxonomy_' . $count ] );
			$terms                   = explode(
				', ',
				sanitize_text_field( $original_atts[ 'tax_' . $count . '_term' ] )
			);
			$tax_operator            = isset( $original_atts[ 'tax_' . $count . '_operator' ] )
				? $original_atts[ 'tax_' . $count . '_operator' ]
				: 'IN';
			$tax_operator            = in_array( $tax_operator, array( 'IN', 'NOT IN', 'AND' ), true )
				? $tax_operator
				: 'IN';
			$tax_args['tax_query'][] = array(
				'taxonomy' => $taxonomy,
				'field'    => 'slug',
				'terms'    => $terms,
				'operator' => $tax_operator,
			);
			$count++;
		}
		if ( $more_tax_queries ) {
			$tax_relation = 'AND';

			if (
				isset( $original_atts['tax_relation'] ) &&
				in_array( $original_atts['tax_relation'], array( 'AND', 'OR' ), true )
			) {
				$tax_relation = $original_atts['tax_relation'];
			}

			$args['tax_query']['relation'] = $tax_relation;
		}

		$args = array_merge( $args, $tax_args );
	}

	// --------------------------------------------------------------------------
	//
	// --------------------------------------------------------------------------

	$atts['template'] = su_posts_locate_template( $atts['template'] );

	if ( ! $atts['template'] || ! su_is_valid_template_name( $atts['template'] ) ) {

		return su_error_message(
			'Posts',
			__( 'invalid template name', 'shortcodes-ultimate' )
		);

	}

	$su_posts = new WP_Query( $args );

	$output = su_posts_include_template( $atts['template'], $su_posts, $atts );

	wp_reset_postdata();

	su_query_asset( 'css', 'su-shortcodes' );

	return $output;

}

function su_posts_include_template( $template, $su_posts, $atts ) {

	ob_start();

	include $template;

	return ob_get_clean();

}

function su_posts_locate_template( $template ) {

	$template = su_set_file_extension( $template, 'php' );
	$template = ltrim( $template, '\\/' );

	$paths = array(
		get_stylesheet_directory(),
		get_template_directory(),
		plugin_dir_path( dirname( dirname( __FILE__ ) ) ),
	);

	foreach ( $paths as $path ) {

		$path = untrailingslashit( $path );
		$path = path_join( $path, $template );
		$path = realpath( $path );

		if ( $path ) {
			return $path;
		}

	}

	return false;

}
