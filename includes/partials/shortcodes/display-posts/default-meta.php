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

<div class="su-display-posts su-display-posts-template-default<?php echo esc_attr( su_get_css_class( $atts ) ); ?>" id="<?php echo esc_attr( $atts['id'] ); ?>">

	<?php if ( $su_query->have_posts() ) : ?>

		<?php while ( $su_query->have_posts() ) : ?>

			<?php $su_query->the_post(); ?>

			<div id="su-post-<?php the_ID(); ?>" class="su-post">

				<?php if ( has_post_thumbnail( get_the_ID() ) ) : ?>
					<div class="su-post-thumbnail">
						<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'thumbnail' ); ?></a>
					</div>
				<?php endif; ?>

				<div class="su-post-body">

					<h2 class="su-post-title">
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</h2>

					<div class="su-post-meta">
						<span><?php esc_html_e( 'Posted', 'shortcodes-ultimate' ); ?>: <?php the_time( get_option( 'date_format' ) ); ?></span>

						<?php if ( get_the_category() ) : ?>
							<span class="su-post-meta-separator">|</span>
							<span><?php esc_html_e( 'Category' ); ?>: <?php the_category( ', ' ); ?></span>
						<?php endif; ?>

						<?php if ( have_comments() || comments_open() ) : ?>
							<span class="su-post-meta-separator">|</span>
							<span>
								<a href="<?php comments_link(); ?>">
									<?php // translators: % will be replaced with number of comments, greater than 1 ?>
									<?php comments_number( __( 'Leave a reply', 'shortcodes-ultimate' ), __( '1 comment', 'shortcodes-ultimate' ), __( 'Comments (%)', 'shortcodes-ultimate' ) ); ?>
								</a>
							</span>
						<?php endif; ?>

					</div>

					<div class="su-post-excerpt">
						<?php the_excerpt(); ?>
					</div>

				</div>

			</div>

		<?php endwhile; ?>

		<?php su_shortcode_display_posts_pagination(); ?>

	<?php else : ?>
		<p><?php esc_html_e( 'Posts not found', 'shortcodes-ultimate' ); ?></p>
	<?php endif; ?>

</div>