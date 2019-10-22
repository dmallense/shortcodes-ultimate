<div id="su-generator-breadcrumbs">
	<a href="javascript:;" class="su-generator-home" title="<?php esc_html_e( 'Click to return to the shortcodes list', 'shortcodes-ultimate' ); ?>"><?php esc_html_e( 'All shortcodes', 'shortcodes-ultimate' ); ?></a>
	&rarr;
	<span><?php echo esc_html( $data['name'] ); ?></span>
	<small class="alignright"><?php echo esc_html( $data['desc'] ); ?></small>
	<div class="su-generator-clear"></div>
</div>

<div class="su-generator-extra-banner">
	<div class="su-generator-extra-banner-message">
		<?php esc_html_e( 'This shortcode is available with the Extra Shortcodes add-on', 'shortcodes-ultimate' ); ?>
	</div>
	<img src="<?php echo esc_attr( $this->get_image_url( 'generator/icon-banner.png' ) ); ?>" class="su-generator-extra-banner-icon">
	<h3 class="su-generator-extra-banner-title"><?php esc_html_e( 'Extra Shortcodes', 'shortcodes-ultimate' ); ?></h3>
	<p class="su-generator-extra-banner-description"><?php esc_html_e( 'This add-on extends Shortcodes Ultimate with 15 new shortcodes. Parallax sections, responsive content slider, pricing tables and more', 'shortcodes-ultimate' ); ?></p>
	<p class="su-generator-extra-banner-action">
		<a href="https://getshortcodes.com/add-ons/extra-shortcodes/?utm_source=admin&amp;utm_medium=generator&amp;utm_campaign=extra_shortcode" target="_blank" class="button button-primary"><?php esc_html_e( 'Details & Pricing', 'shortcodes-ultimate' ); ?> &rarr;</a>
	</p>
	<div class="su-generator-extra-banner-screenshot">
		<img src="<?php echo esc_attr( $this->get_image_url( 'screenshots/' . $data['id'] . '.png' ) ); ?>">
	</div>
</div>
