<?php
/**
 * Register Menus
 *
 * @link http://codex.wordpress.org/Function_Reference/register_nav_menus#Examples
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

register_nav_menus(
	array(
		'top-bar-r'  => esc_html__( 'Main Menu', 'foundationpress' ),
		'mobile-nav' => esc_html__( 'Mobile', 'foundationpress' ),
        'logged-in-nav' => esc_html__( 'Logged In Menu', 'foundationpress' ),
        'logged-out-nav' => esc_html__( 'Logged Out Menu', 'foundationpress' ),
	)
);


/**
 * Desktop navigation - right top bar
 *
 * @link http://codex.wordpress.org/Function_Reference/wp_nav_menu
 */
if ( ! function_exists( 'foundationpress_top_bar_r' ) ) {
	function foundationpress_top_bar_r() {
		wp_nav_menu(
			array(
				'container'      => false,
				'menu_class'     => 'dropdown menu',
				'items_wrap'     => '<ul id="%1$s" class="%2$s desktop-menu" data-dropdown-menu>%3$s</ul>',
				'theme_location' => 'top-bar-r',
				'depth'          => 3,
				'fallback_cb'    => false,
				'walker'         => new Foundationpress_Top_Bar_Walker(),
			)
		);
	}
}


/**
 * Mobile navigation - topbar (default) or offcanvas
 */
if ( ! function_exists( 'foundationpress_mobile_nav' ) ) {
	function foundationpress_mobile_nav() {
		wp_nav_menu(
			array(
				'container'      => false,                         // Remove nav container
				'menu'           => __( 'mobile-nav', 'foundationpress' ),
				'menu_class'     => 'vertical menu',
				'theme_location' => 'mobile-nav',
				'items_wrap'     => '<ul id="%1$s" class="%2$s" data-submenu-toggle="false">%3$s</ul>',
				'fallback_cb'    => false,
				'walker'         => new Foundationpress_Mobile_Walker(),
			)
		);
	}
}


/**
 * Add support for buttons in the top-bar menu:
 * 1) In WordPress admin, go to Apperance -> Menus.
 * 2) Click 'Screen Options' from the top panel and enable 'CSS CLasses' and 'Link Relationship (XFN)'
 * 3) On your menu item, type 'has-form' in the CSS-classes field. Type 'button' in the XFN field
 * 4) Save Menu. Your menu item will now appear as a button in your top-menu
*/
if ( ! function_exists( 'foundationpress_add_menuclass' ) ) {
	function foundationpress_add_menuclass( $ulclass ) {
		$find    = array( '/<a rel="button"/', '/<a title=".*?" rel="button"/' );
		$replace = array( '<a rel="button" class="button"', '<a rel="button" class="button"' );

		return preg_replace( $find, $replace, $ulclass, 1 );
	}
	add_filter( 'wp_nav_menu', 'foundationpress_add_menuclass' );
}


// Secondary/sub navigation
function fp_sub_nav( $post_id = null, $url = null ) {

    $html = '';
    $parents = get_post_ancestors( $post_id );
    $id = ( $parents ) ? $parents[count( $parents ) - 1] : $post_id;

    $items = wp_get_nav_menu_items( 'Main Nav' );
    $items = buildTheTree( $items );

    if ( count( $items ) ) {

        foreach ( $items as $item ) {

            if ( $id == $item->object_id ) {
                $menu = $item;
                break;
            }

            if ( in_array( 'fp-megamenu', $item->classes ) && isset( $item->wpse_children ) ) {
                foreach ( $item->wpse_children as $child ) {
                    if ( $id == $child->object_id ) {
                        $menu = $child;
                        break;
                    }
                }
            }

        }

    }

    if ( isset( $menu ) && isset( $menu->wpse_children ) && count( $menu->wpse_children ) ) {

        $html .= '<ul class="interior-nav">';
        $html .= "<li class='parent'><a href='{$menu->url}'>{$menu->title}</a><ul>";
        $html .= fp_build_menu_inner( $menu->wpse_children, $url );
        $html .= '</ul></li></ul>';

    }

    return $html;

}


// Menu builder helper
function fp_build_menu_inner( $items, $current = '' ) {

    $html = '';

    foreach ( $items as $item ) {

        $classes = '';
        if ( $current != '' && $item->url == $current ) {
            $classes .= ' active';
        }

        $html .= "<li class='{$classes}'><a href='{$item->url}' target='{$item->target}'>{$item->title}</a></li>";

    }

    return $html;

}


// Menu tree helper
function buildTheTree( array &$elements, $parentId = 0 ) {

    $branch = array();

    foreach ( $elements as &$element ) {

        if ( $element->menu_item_parent == $parentId ) {
            $children = buildTheTree( $elements, $element->ID );

            if ( $children ) {
                $element->wpse_children = $children;
            }

            $branch[$element->ID] = $element;
            unset( $element );
        }

    }

    return $branch;

}


// Footer navigation
function fp_footer_nav() {

    add_filter( 'wp_nav_menu_args', 'fp_wp_nav_menu_footer_args', 999999 );
    add_filter( 'wp_nav_menu_objects', 'fp_wp_nav_menu_footer_objects', 999999, 2 );

    wp_nav_menu(
        [ 'theme_location' => 'top-bar-r' ]
    );

    remove_filter( 'wp_nav_menu_args', 'fp_wp_nav_menu_footer_args', 999999 );
    remove_filter( 'wp_nav_menu_objects', 'fp_wp_nav_menu_footer_objects', 999999 );

}


// Undo megamenu classes for footer nav
function fp_wp_nav_menu_footer_args( $args ) {

    $new_args = [
        'container'     => false,
        'menu_class'    => 'horizontal menu',
        'menu_id'       => 'footer-nav',
        'items_wrap'    => '<ul id="%1$s" class="%2$s" data-submenu-toggle="false">%3$s</ul>',
        'walker'        => new Foundationpress_Mobile_Walker(),
    ];

    return array_merge( $args, $new_args );

}


// Remove homepage item from footer nav
function fp_wp_nav_menu_footer_objects( $items, $args ) {
    array_shift( $items );
    return $items;
}


// Top bar nav dropdown on click
function fp_widget_nav_menu_args( $nav_menu_args, $nav_menu, $args, $instance ) {

    if ( strpos( $nav_menu->slug, 'logged' ) !== false ) {
        $nav_menu_args['menu_class'] = 'dropdown menu';
        $nav_menu_args['items_wrap'] = '<ul id="%1$s" class="%2$s desktop-menu" data-accordion-menu>%3$s</ul>';
        $nav_menu_args['walker'] = new Foundationpress_Top_Bar_Walker();
    }
    return $nav_menu_args;

}
add_filter( 'widget_nav_menu_args', 'fp_widget_nav_menu_args', 10, 4 );


// Tob bar account nav shortcode
function fp_account_navigation() {

    $args = [
        'container_class' => 'menu-account-container',
        'menu_class'     => 'dropdown menu',
        'items_wrap'     => '<ul id="%1$s" class="%2$s desktop-menu" data-accordion-menu>%3$s</ul>',
        'fallback_cb'    => false,
        'echo'          => false,
    ];

    $logged_in_nav = wp_nav_menu(
        array_merge(
            [ 'theme_location' => 'logged-in-nav' ],
            $args )
    );
    $logged_out_nav = wp_nav_menu(
        array_merge(
            [ 'theme_location' => 'logged-out-nav' ],
            $args )
    );

    $is_user_logged_in = apply_filters( 'fp_is_user_logged_in', is_user_logged_in() );
    echo ( $is_user_logged_in ? $logged_in_nav : $logged_out_nav );

}
add_shortcode( 'account_navigation', 'fp_account_navigation' );
