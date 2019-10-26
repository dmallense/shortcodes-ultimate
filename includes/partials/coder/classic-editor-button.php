<?php defined( 'ABSPATH' ) || exit; ?>

<button
type="button"
class="su-coder-classic-editor-button <?php echo esc_attr( $data['class'] ); ?>"
title="<?php echo esc_attr( $data['title'] ); ?>"
onclick='window.SUCoder.insertClassicEditor( "<?php echo esc_js( $data['editor'] ); ?>" );'
>
<?php if ( $data['icon'] ) : ?>
	<svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path fill="currentcolor" d="M8,0l0,4l-4,0l0,12l4,0l0,4l-8,0l0,-20l8,0Zm11.972,20l-7.929,0l-0.043,-4l4,0l0,-12l-3.957,0l0,-4l7.929,0l0,20Z"/></svg>
<?php endif; ?>
<?php if ( $data['label'] ) : ?>
	<span><?php echo esc_html( $data['label'] ); ?></span>
<?php endif; ?>
</button>
