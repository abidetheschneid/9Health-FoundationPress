<?php
/**
 * The template for displaying search form
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>

<form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
	<div class="input-group grid-x">
		<input type="text" class="input-group-field small-11" value="" name="s" id="s" aria-label="Search" placeholder="<?php esc_attr_e( 'Search', 'foundationpress' ); ?>">
		<div class="input-group-button small-1">
			<button type="submit" id="searchsubmit" class="button"><i class="fas fa-search"></i></button>
		</div>
	</div>
</form>
