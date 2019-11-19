<?php defined( 'ABSPATH' ) || exit; ?>

<button
type="button"
class="su-coder-classic-editor-button <?php echo esc_attr( $data['class'] ); ?>"
title="<?php echo esc_attr( $data['title'] ); ?>"
onclick='window.SUCoder.insertClassicEditor( "<?php echo esc_js( $data['editor'] ); ?>" );'
>
<?php if ( $data['icon'] ) : ?>
	<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="14"><path fill="currentcolor" d="m6.25 3.5h-2.625v7h2.625v3.5h-5.25v-14h5.25zm8.75-3.5v14h-5.25v-3.5h2.625v-7h-2.625v-3.5z"/></svg>
<?php endif; ?>
<?php if ( $data['label'] ) : ?>
	<span><?php echo esc_html( $data['label'] ); ?></span>
<?php endif; ?>
</button>
