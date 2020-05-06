<?php defined( 'ABSPATH' ) || exit; ?>

<?php
/**
 * !!! DO NOT EDIT TEMPLATES IN THE PLUGIN FOLDER !!!
 *
 * Do not edit templates in the plugin folder, since all your changes will be
 * lost after the plugin update. Read the following article to learn how to
 * change this template or create a custom one:
 *
 * https://getshortcodes.com/docs/posts/
 */
?>

<div class="su-display-posts su-display-posts-template-list<?php echo esc_attr( su_get_css_class( $atts ) ); ?>" id="<?php echo esc_attr( $atts['id'] ); ?>">

	<ul>

		<?php if ( $su_posts->have_posts() ) : ?>

			<?php while ( $su_posts->have_posts() ) : ?>

				<?php $su_posts->the_post(); ?>

				<li id="su-post-<?php the_ID(); ?>" class="su-post">
					<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
				</li>

			<?php endwhile; ?>

		<?php else : ?>

			<li><?php esc_html_e( 'Posts not found', 'shortcodes-ultimate' ); ?></li>

		<?php endif; ?>

	</ul>

</div>
