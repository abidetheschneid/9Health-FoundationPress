<?php

// Redirect homepage donation form even with errors
function fp_gform_pre_submission( $form ) {
    if ( $form['title'] == 'Homepage Donation Form' && isset( $form['confirmations'] ) ) {
        $confirmations = reset( $form['confirmations'] );
        if ( $confirmations['type'] == 'page' && isset( $confirmations['pageId'] ) ) {
            wp_redirect( get_permalink( $confirmations['pageId'] ) );
            exit();
        }
    }
}
add_action( 'gform_post_process', 'fp_gform_pre_submission' );

// Homepage donation form: populate custom amount field with selected amount
function fp_gform_donate_populate() {
    ?>
    <script type="text/javascript">
        $( '.donate-online-form .set-amount input[type="radio"]' ).on( 'change', function() {
            $value = $( this ).val().split( '|' )[0];
            $( '.donate-online-form .any-amount input' ).val( $value );
        });
    </script>
    <?php
}
add_action( 'wp_footer', 'fp_gform_donate_populate' );
