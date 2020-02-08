<div class="su-posts su-posts-teaser-loop">
	<?php if ( $su_posts->have_posts() ) : ?>
		<?php while ( $su_posts->have_posts() ) : ?>
			<?php $su_posts->the_post(); ?>

			<div id="su-post-<?php the_ID(); ?>" class="su-post">
				<?php if ( has_post_thumbnail() ) : ?>
					<a class="su-post-thumbnail" href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
				<?php endif; ?>
				<h2 class="su-post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			</div>

		<?php endwhile; ?>
	<?php else : ?>
		<h4><?php esc_html_e( 'Posts not found', 'shortcodes-ultimate' ); ?></h4>
	<?php endif; ?>
</div>
