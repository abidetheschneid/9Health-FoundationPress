<?php
// Determine which elements to display
if ( is_singular( 'page' ) ) {
    $slug = $post->post_name;
    if ( strpos( $slug, 'ewell') > -1 ) {
        set_query_var( 'featured-image-type', 'ewell' );
    } else if ( strpos( $slug, 'eprevent' ) > -1 ) {
        set_query_var( 'featured-image-type', 'eprevent' );
    }
}

// Featured image
get_template_part( 'template-parts/featured-image' );

// Secondary navigation
get_template_part( 'template-parts/interior-navigation' );
