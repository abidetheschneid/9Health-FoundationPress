<?php
/**
 * Template part for top bar menu
 *
 * @package WordPress
 * @subpackage FoundationPress
 * @since FoundationPress 1.0.0
 */

?>
<div class="right top-bar-section">
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('top-bar-right') ) : ?>
    <?php endif; ?>
</div>
