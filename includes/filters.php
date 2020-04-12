<?php

/**
 * Filters.
 *
 * @since        5.0.4
 * @package      Shortcodes_Ultimate
 * @subpackage   Shortcodes_Ultimate/includes
 */

/**
 * Disable wptexturize filter for nestable shortcodes.
 *
 * @since  5.0.4
 * @param array   $shortcodes Shortcodes to not texturize.
 * @return array              Shortcodes to not texturize.
 */
function su_filter_disable_wptexturize( $shortcodes ) {

	$prefix = su_get_shortcode_prefix();

	$exclude = array(
		$prefix . 'spoiler',
		$prefix . 'row',
		$prefix . 'column',
		$prefix . 'list',
		$prefix . 'note',
		$prefix . 'box',
		$prefix . 'quote',
	);

	return array_merge( $shortcodes, $exclude );

}

/**
 * Custom formatting filter.
 *
 * @since  5.0.4
 * @param string  $content
 * @return string Formatted content with clean shortcodes content.
 */
function su_filter_custom_formatting( $content ) {

	$replacements = array(
		'<p>['    => '[',
		']</p>'   => ']',
		']<br />' => ']',
	);

	return strtr( $content, $replacements );

}

/**
 * Simple filter to parse shortcodes and blocks in a string with raw post
 * content.
 *
 * @since 5.8.0
 * @param  string $content Raw content
 * @return string          Parsed content
 */
function su_filter_post_content( $content ) {

	$content = do_shortcode( $content );
	$content = parse_blocks( $content );
	$content = wpautop( $content );

	return $content;

}
