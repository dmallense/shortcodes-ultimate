<?php

su_add_shortcode( array(
		'id' => 'spacer',
		'callback' => 'su_shortcode_spacer',
		'name' => __( 'Spacer', 'shortcodes-ultimate' ),
		'type' => 'single',
		'group' => 'content other',
		'icon' => plugin_dir_url( dirname( __FILE__ ) ) . 'images/coder/shortcodes/spacer.svg',
		'atts' => array(
			'size' => array(
				'type' => 'slider',
				'min' => 0,
				'max' => 800,
				'step' => 10,
				'default' => 20,
				'name' => __( 'Height', 'shortcodes-ultimate' ),
				'desc' => __( 'Height of the spacer in pixels', 'shortcodes-ultimate' )
			),
			'class' => array(
				'type' => 'extra_css_class',
				'name' => __( 'Extra CSS class', 'shortcodes-ultimate' ),
				'desc' => __( 'Additional CSS class name(s) separated by space(s)', 'shortcodes-ultimate' ),
				'default' => '',
			),
		),
		'desc' => __( 'Empty space with adjustable height', 'shortcodes-ultimate' ),
	) );

function su_shortcode_spacer( $atts = null, $content = null ) {

	$atts = shortcode_atts( array(
			'size'  => '20',
			'class' => ''
		), $atts, 'spacer' );

	su_query_asset( 'css', 'su-shortcodes' );

	return '<div class="su-spacer' . su_get_css_class( $atts ) . '" style="height:' . (string) $atts['size'] . 'px"></div>';

}
