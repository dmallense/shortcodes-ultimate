<?php

return apply_filters(
	'su/data/shortcode_groups',
	array(
		array(
			'id'    => 'content',
			'title' => __( 'Content', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'box',
			'title' => __( 'Box', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'embed',
			'title' => __( 'Embed', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'gallery',
			'title' => __( 'Gallery', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'developer',
			'title' => __( 'Developer', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'other',
			'title' => __( 'Other', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'extra',
			'title' => __( 'Extra Shortcodes', 'shortcodes-ultimate' ),
		),
		array(
			'id'    => 'shortcode-creator',
			'title' => __( 'Custom Shortcodes', 'shortcodes-ultimate' ),
		),
	)
);
