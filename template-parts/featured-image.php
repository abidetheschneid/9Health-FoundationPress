<?php
// If a featured image is set, insert into layout and use Interchange
// to select the optimal image size per named media query.
if ( ! is_front_page() && has_post_thumbnail( $post->ID ) ) :
    $text = '';

    if ( is_singular( 'page' ) ) {
        $banner_display = get_post_meta( $post->ID, 'banner_display', true );

        // Don't display on pages unless specifically marked
        if ( ! $banner_display || $banner_display == '' ) {
            return;
        }

        // Format banner text
        $banner_headline = get_post_meta( $post->ID, 'banner_headline', true );
        $banner_subhead = get_post_meta( $post->ID, 'banner_subhead', true );
        $banner_button_link = get_post_meta( $post->ID, 'banner_button_link', true );
        $banner_button_text = get_post_meta( $post->ID, 'banner_button_text', true );

        // Add special formatting for ewell/eprevent
        $wrapper_class = $text_class = $image = '';
        if ( ( $type = get_query_var( 'featured-image-type', '' ) ) != '' ) {
            $wrapper_class = "etools {$type}";
            $text_class = 'medium-6 large-4';
            $image_path = get_stylesheet_directory_uri() . "/dist/assets/images/etools/{$type}/logo.png";
            $image = "<img src='{$image_path}' alt='' />";
        }

        $text =
            "<div class='featured-text small-12 {$text_class}'>" .
            $image .
            ( $banner_headline != '' ? "<h1>{$banner_headline}</h1>" : '' ) .
            ( $banner_subhead != '' ? "<p>{$banner_subhead}</p>" : '' ) .
            ( $banner_button_link != null && $banner_button_text != '' ?
                "<a href='{$banner_button_link}' class='button radius bkg-primary'>{$banner_button_text}</a>" : '' ) .
            '</div>'
        ;
    } ?>
	<header class="featured-hero grid-x <?php echo $wrapper_class; ?>" role="banner" data-interchange="[<?php the_post_thumbnail_url( 'featured-small' ); ?>, small], [<?php the_post_thumbnail_url( 'featured-medium' ); ?>, medium], [<?php the_post_thumbnail_url( 'featured-large' ); ?>, large], [<?php the_post_thumbnail_url( 'featured-xlarge' ); ?>, xlarge]">
        <?php echo $text; ?>
	</header>
<?php endif;
