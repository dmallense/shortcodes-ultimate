<?php defined( 'ABSPATH' ) || exit; ?>

<?php
/**
 * !!! DO NOT EDIT THIS FILE !!!
 *
 * Do not edit templates in the plugin folder, since all your changes will be
 * lost after the plugin update. Read the following article to learn how to
 * change this template or create a custom one:
 *
 * https://getshortcodes.com/docs/posts/#built-in-templates
 */
?>

<div class="su-display-posts su-display-posts-template-teaser-loop<?php echo esc_attr( su_get_css_class( $atts ) ); ?>" id="<?php echo esc_attr( $atts['id'] ); ?>">

	<?php if ( $su_posts->have_posts() ) : ?>

		<?php while ( $su_posts->have_posts() ) : ?>

			<?php $su_posts->the_post(); ?>

			<div id="su-post-<?php the_ID(); ?>" class="su-post">

				<?php if ( has_post_thumbnail() ) : ?>

					<a class="su-post-thumbnail" href="<?php the_permalink(); ?>">
						<?php the_post_thumbnail(); ?>
					</a>

				<?php endif; ?>

				<h2 class="su-post-title">
					<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
				</h2>

			</div>

		<?php endwhile; ?>

	<?php else : ?>

		<p class="su-posts-not-found">
			<?php esc_html_e( 'Posts not found', 'shortcodes-ultimate' ); ?>
		</p>

	<?php endif; ?>

</div>
