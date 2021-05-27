<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "container" div.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>
<!doctype html>
<html class="no-js <?php echo ( class_exists('Illuminate\Events\Dispatcher') ? 'laravel' : '' ); ?>" <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title><?php if(isset($title) && class_exists('Illuminate\Events\Dispatcher') ){ echo $title . ' - '; }elseif (function_exists('is_tag') && is_tag()) { echo 'Tag Archive for &quot;'.$tag.'&quot; - '; } elseif (is_archive()) { wp_title(''); echo ' Archive - '; } elseif (is_search()) { echo 'Search for &quot;'.wp_specialchars($s).'&quot; - '; } elseif (!(is_404()) && (is_single()) && !(is_front_page()) || (is_page())  && !(is_front_page()) ) { wp_title(''); echo ' - '; } elseif (is_404()) { echo 'Not Found - '; } if (is_front_page()) { bloginfo('name'); } else { bloginfo('name'); } ?></title>
		<?php fp_9hf_gtm_scripts_head(); ?>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

	<?php fp_9hf_gtm_scripts_body(); ?>

	<?php if ( get_theme_mod( 'wpt_mobile_menu_layout' ) === 'offcanvas' ) : ?>
		<?php get_template_part( 'template-parts/mobile-off-canvas' ); ?>
	<?php endif; ?>

	<header class="site-header" role="banner">
		<div class="mobile site-title-bar title-bar" <?php foundationpress_title_bar_responsive_toggle(); ?>>
			<div class="title-bar-left">
				<span class="site-mobile-title title-bar-title">
					<?php if ( get_header_image() ) : ?>
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php header_image(); ?>" /></a>
					<?php else : ?>
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
					<?php endif; ?>
				</span>
				<button aria-label="<?php _e( 'Main Menu', 'foundationpress' ); ?>" class="menu-icon" type="button" data-toggle="<?php foundationpress_mobile_menu_id(); ?>"><i class="fas fa-bars"></i></button>
			</div>
		</div>

		<nav class="top-bar">
			<div class="top-bar-left">
				<div class="site-desktop-title top-bar-title">
					<?php if ( get_header_image() ) : ?>
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php header_image(); ?>" /></a>
					<?php else : ?>
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
					<?php endif; ?>
				</div>
			</div>
			<div class="top-bar-right">
				<?php get_template_part( 'template-parts/header-top-bar' ); ?>
			</div>
		</nav>

		<nav class="site-navigation" role="navigation">
			<div class="top-bar-nav">
				<?php foundationpress_top_bar_r(); ?>

				<?php if ( ! get_theme_mod( 'wpt_mobile_menu_layout' ) || get_theme_mod( 'wpt_mobile_menu_layout' ) === 'topbar' ) : ?>
					<?php get_template_part( 'template-parts/mobile-top-bar' ); ?>
				<?php endif; ?>
			</div>
		</nav>

	</header>
