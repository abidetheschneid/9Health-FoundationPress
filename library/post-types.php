<?php
// Register custom post types
function fp_register_post_types() {

    // Data for cpts
    $post_types = [
        '9hf_slide'    => [
            'name'  => 'Slide',
            'args'  => [
                'supports'      => [ 'title', 'thumbnail', 'revisions' ],
                'taxonomies'    => [ '9hf_slide_category' ],
                'public'        => false,
            ],
        ],
    ];

    // Generate cpt data and register
    foreach ( $post_types as $post_type => $values ) {

        $name = $values['name'];
        $name_plural = isset( $values['name_plural'] ) ? $values['name_plural'] : "{$name}s";

        $labels = array(
            'name'                  => esc_html__( $name_plural, 'foundationpress' ),
            'singular_name'         => esc_html__( $name, 'foundationpress' ),
            'add_new'               => esc_html__( "Add New {$name}", 'foundationpress' ),
            'add_new_item'          => esc_html__( "Add New {$name}", 'foundationpress' ),
            'edit_item'             => esc_html__( "Edit {$name}", 'foundationpress' ),
            'new_item'              => esc_html__( "New {$name}", 'foundationpress' ),
            'view_item'             => esc_html__( "View {$name}", 'foundationpress' ),
            'search_items'          => esc_html__( "Search {$name_plural}", 'foundationpress' ),
            'not_found'             => esc_html__( "No {$name_plural} found", 'foundationpress' ),
            'not_found_in_trash'    => esc_html__( "No {$name_plural} found in Trash", 'foundationpress' ),
            'parent_item_colon'     => esc_html__( "Parent {$name}:", 'foundationpress' ),
            'menu_name'             => esc_html__( "{$name_plural}", 'foundationpress' ),
        );

        $defaults = array(
            'labels'                => $labels,
            'hierarchical'          => false,
            'description'           => "Create {$name_plural}",
            'supports'              => array( 'title' ),
            'taxonomies'            => array( '' ),
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 20,
            'show_in_nav_menus'     => true,
            'publicly_queryable'    => true,
            'exclude_from_search'   => true,
            'has_archive'           => true,
            'query_var'             => true,
            'can_export'            => true,
            'rewrite'               => true,
            'capability_type'       => 'post',
        );

        $args = wp_parse_args( $values['args'], $defaults );
        register_post_type( $post_type, $args );

    }

}
add_action( 'init', 'fp_register_post_types' );

// Register custom taxonomies
function fp_register_taxonomies() {

    // Data for taxonomies
    $taxonomies = [
        '9hf_slide_category'    => [
            'name'                  => 'Category',
            'name_plural'           => 'Categories',
            'post_type'             => '9hf_slide',
            'publicly_queryable'    => false,
            'has_archive'           => false,
        ],
    ];

    // Generate tax. data and register
    foreach ( $taxonomies as $taxonomy => $values ) {

        $name = $values['name'];
        $name_plural = isset( $values['name_plural'] ) ? $values['name_plural'] : "{$name}s";

        $labels = array(
            'name'                  => esc_html__( $name_plural, 'foundationpress' ),
            'singular_name'         => esc_html__( $name, 'foundationpress' ),
            'add_new_item'          => esc_html__( "Add New {$name}", 'foundationpress' ),
            'edit_item'             => esc_html__( "Edit {$name}", 'foundationpress' ),
            'update_item'           => esc_html__( "Update {$name}", 'foundationpress' ),
            'new_item_name'         => esc_html__( "New {$name}", 'foundationpress' ),
            'search_items'          => esc_html__( "Search {$name_plural}", 'foundationpress' ),
            'all_items'             => esc_html__( "All {$name_plural}", 'foundationpress' ),
            'parent_item'           => esc_html__( "Parent {$name}:", 'foundationpress' ),
            'parent_item_colon'     => esc_html__( "Parent {$name}:", 'foundationpress' ),
            'menu_name'             => esc_html__( "{$name_plural}", 'foundationpress' ),
        );

        $defaults = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => true,
        );

        $args = isset( $values['args'] ) ? wp_parse_args( $values['args'], $defaults ) : $defaults;
        register_taxonomy( $taxonomy, array( $values['post_type'] ), $args );

    }

}
add_action( 'init', 'fp_register_taxonomies' );

/** Custom post type related shortcodes */

// Slider shortcode
function fp_shortcode_slider( $atts ) {

    $atts = shortcode_atts( [
        'category'  => '',
        'type'      => '',
    ], $atts );

    $category = $atts['category'];
    $type = $atts['type'];

    // Set type automatically based on category
    $type =
        $category == 'testimonials' ? 'plain' :
        ( $category == 'sponsors' ? 'image' : $type );

    // Return if no category selected
    if ( $category == '' ) {
        return;
    }

    // Retrieve slides
    $args = [
        'post_status'       => 'publish',
        'post_type'         => '9hf_slide',
        'posts_per_page'    => -1,
        'order'             => 'ASC',
        'orderby'           => 'name',
        'tax_query'         => [
            [
                'taxonomy'  => '9hf_slide_category',
                'terms'     => $category,
                'field'     => 'slug',
            ],
        ],
    ];

    $slides = get_posts( $args );

    // Return if no posts exist
    if ( sizeof( $slides ) < 1 ) {
        return;
    }

    $slide_class = "slide_cat-{$category}" .
        ( $type == '' ? ' fp-dots' : '' );
    ob_start();
    ?>
    <div class="fp-slides <?php echo $slide_class; ?>">
        <?php foreach ( $slides as $slide ) : ?>
            <div class="fp-slide">
                <?php
                $has_thumb = has_post_thumbnail( $slide->ID );
                $column_class = $has_thumb ? 'vc_col-sm-5' : 'vc_col-sm-12';
                $meta = [
                    'heading',
                    'subheading',
                    'button'
                ];
                foreach ( $meta as $meta_key ) {
                    $meta[$meta_key] = get_post_meta( $slide->ID, "slide_{$meta_key}", true );
                }
                if ( $meta['button'] != '' && $meta['button'] != 'none' ) {
                    $button_link = get_post_meta( $slide->ID, "slide_button_link_{$meta['button']}", true );
                    $button_link = $meta['button'] == 'page' ? get_the_permalink( $button_link ) : $button_link;
                    $button_target = $meta['button'] == 'external' ? 'target="_blank"' : '';
                    $button_text = get_post_meta( $slide->ID, 'slide_button_text', true );
                }
                ?>
                <?php if ( $type == 'image' ) : ?>
                    <a class="fp-link-wrap" href="<?php echo $button_link; ?>" <?php echo $button_target; ?>>
                <?php endif; ?>
                <?php if ( $has_thumb ) : ?>
                    <?php $image_class = $type != 'image' ? 'vc_col-sm-7' : ''; ?>
                    <div class="fp-image <?php echo $image_class; ?>">
                        <?php echo get_the_post_thumbnail( $slide->ID, 'full' ); ?>
                    </div>
                <?php endif; ?>
                <?php if ( $type != 'image' ) : ?>
                    <div class="fp-text <?php echo $column_class; ?>">
                        <div class="fp-text-wrap">
                            <h1 class="fp-title"><?php echo $meta['heading']; ?></h1>
                            <?php if ( $meta['subheading'] != '' ) : ?>
                                <p class="fp-subtitle"><?php echo $meta['subheading']; ?></p>
                            <?php endif; ?>
                            <?php if ( $type == 'plain' ) : ?>
                                <a class="fp-link" href="<?php echo $button_link; ?>" <?php echo $button_target; ?>>
                                    <?php echo $button_text; ?> <i class="fas fa-angle-right"></i>
                                </a>
                            <?php else : ?>
                                <a class="button fp-button button-primary" href="<?php echo $button_link; ?>" <?php echo $button_target; ?>>
                                    <?php echo $button_text; ?>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>
                <?php if ( $type == 'image' ) : ?>
                    </a>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();

}
add_shortcode( 'fp_slider', 'fp_shortcode_slider' );
