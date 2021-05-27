<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "off-canvas-wrap" div and all content after.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>

<footer class="footer">
	<section class="sub-footer">
		<div class="footer-container">
			<div class="footer-grid">
				<?php fp_footer_nav(); ?>
				<div class="sub-footer-widgets">
					<?php dynamic_sidebar( 'sub-footer-widgets' ); ?>
				</div>
			</div>
		</div>
	</section>
	<section class="footer-contact-bar">
		<div class="footer-container">
			<div class="footer-grid">
				<?php dynamic_sidebar( 'footer-widgets' ); ?>
			</div>
		</div>
	</section>
</footer>

<?php if ( get_theme_mod( 'wpt_mobile_menu_layout' ) === 'offcanvas' ) : ?>
	</div><!-- Close off-canvas content -->
<?php endif; ?>

<?php wp_footer(); ?>

<?php fp_9hf_intercom_scripts(); ?>
</body>
</html>
