<?php
/**
 * Enqueue all styles and scripts
 *
 * Learn more about enqueue_script: {@link https://codex.wordpress.org/Function_Reference/wp_enqueue_script}
 * Learn more about enqueue_style: {@link https://codex.wordpress.org/Function_Reference/wp_enqueue_style }
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */


// Check to see if rev-manifest exists for CSS and JS static asset revisioning
//https://github.com/sindresorhus/gulp-rev/blob/master/integration.md

if ( ! function_exists( 'foundationpress_asset_path' ) ) :
	function foundationpress_asset_path( $filename ) {
		$filename_split = explode( '.', $filename );
		$dir            = end( $filename_split );
		$manifest_path  = dirname( dirname( __FILE__ ) ) . '/dist/assets/' . $dir . '/rev-manifest.json';

		if ( file_exists( $manifest_path ) ) {
			$manifest = json_decode( file_get_contents( $manifest_path ), true );
		} else {
			$manifest = [];
		}

		if ( array_key_exists( $filename, $manifest ) ) {
			return $manifest[ $filename ];
		}
		return $filename;
	}
endif;


if ( ! function_exists( 'foundationpress_scripts' ) ) :
	function foundationpress_scripts() {

		$dir_assets = get_stylesheet_directory_uri() . '/dist/assets';
		$path_assets = get_stylesheet_directory() . '/dist/assets';

		// Enqueue the main Stylesheet.
		$asset_path = '/css/' . foundationpress_asset_path( 'app.css' );
		$asset_date = date( 'YmdGi', filemtime( $path_assets . $asset_path ) );
		wp_enqueue_style( 'main-stylesheet', $dir_assets . $asset_path, array(), $asset_date, 'all' );

		// Deregister the jquery version bundled with WordPress.
		wp_deregister_script( 'jquery' );

		// CDN hosted jQuery placed in the header, as some plugins require that jQuery is loaded in the header.
		wp_enqueue_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', array(), '3.5.1', false );

		// Deregister the jquery-migrate version bundled with WordPress.
		wp_deregister_script( 'jquery-migrate' );

		// CDN hosted jQuery migrate for compatibility with jQuery 3.x
		wp_register_script( 'jquery-migrate', '//code.jquery.com/jquery-migrate-3.0.1.min.js', array('jquery'), '3.0.1', false );

		// Enqueue jQuery migrate. Uncomment the line below to enable.
		// wp_enqueue_script( 'jquery-migrate' );

		// Enqueue Foundation scripts
		$asset_path = '/js/' . foundationpress_asset_path( 'app.js' );
		$asset_date = date( 'YmdGi', filemtime( $path_assets . $asset_path ) );
		wp_enqueue_script( 'foundation', $dir_assets . $asset_path, array( 'jquery' ), $asset_date, true );

		// Enqueue Foundation Header scripts
		$asset_path = '/js/' . foundationpress_asset_path( 'app-header.js' );
		$asset_date = date( 'YmdGi', filemtime( $path_assets . $asset_path ) );
		wp_enqueue_script( 'foundation-header', $dir_assets . $asset_path, array( 'jquery' ), $asset_date, false );

		// Enqueue FontAwesome from CDN. Uncomment the line below if you need FontAwesome.
		//wp_enqueue_script( 'fontawesome', 'https://use.fontawesome.com/5016a31c8c.js', array(), '4.7.0', true );

		// Add the comment-reply library on pages where it is necessary
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		// Enqueue upcoming fairs script - only on front/home page
		if ( is_front_page() ) {
			wp_enqueue_script( 'ninehealth-upcomingfair-script', $dir_assets . '/js/ninehealth-upcomingfair.js', array(), '1.0.0', true );
		}

		// Enqueue IEC list script - only on IEC page
		// TODO: enqueue only on IEC page
		wp_enqueue_script( 'ninehealth-iec-list-script', $dir_assets . '/js/ninehealth-iec-list.js', array(), '1.0.0', true );

		// Enqueue devbridge-autocomplete
		wp_enqueue_script( 'devbridge autocomplete script', '/health-fairs/js/jquery.autocomplete.min.js', array(), '1.0.0', true );

		// Enqueue health-fairs stylesheets
		wp_enqueue_style( 'healthfairs-custom', '/health-fairs/css/jm_custom.css', array(), '1.0.0', 'all' );
		wp_enqueue_style( 'healthfairs-ninehealth-custom', '/health-fairs/css/bb_ninehealth_custom.css', array(), '1.0.0', 'all' );

		// Enqueue ff market web font
		wp_enqueue_style( 'ff-market-web', 'https://use.typekit.net/jfk1gip.css' );

	}

	add_action( 'wp_enqueue_scripts', 'foundationpress_scripts' );
endif;

if ( ! function_exists( 'foundationpress_head' ) ) :
	function foundationpress_head() {

		$apple_icons = [
			'144x144',
			'114x114',
			'72x72',
			null
		];

		foreach ( $apple_icons as $icon ) {
			echo '<link rel="apple-touch-icon-precomposed"' . ( $icon ? 'sizes="' . $icon . '"' : '' ) . ' href="' . get_stylesheet_directory_uri() . '/dist/assets/images/icons/apple-touch-icon-' . ( $icon ? "{$icon}-" : '' ) . 'precomposed.png">';
		}

	}

	add_action( 'wp_head', 'foundationpress_head' );
endif;

/**
 * Output GTM scripts in <head>.
 *
 * @author Rebekah Van Epps <rebekah@sofostudios.com>
 * @since  2019-11-23
 */
function fp_9hf_gtm_scripts_head() {
	?>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-NNL5S7S');</script>
	<!-- End Google Tag Manager -->
	<?php
}

/**
 * Output GTM scripts at beginning of <body>.
 *
 * @author Rebekah Van Epps <rebekah@sofostudios.com>
 * @since  2019-11-23
 */
function fp_9hf_gtm_scripts_body() {
	?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNL5S7S"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	<?php
}

/**
 * Output Intercom scripts at end of <body>.
 *
 * @author Rebekah Van Epps <rebekah@sofostudios.com>
 * @since  2019-11-23
 */
function fp_9hf_intercom_scripts() {
	?>
	<script>
	  window.intercomSettings = {
		app_id: "rvf2q5gh"
	  };
	</script>
	<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/rvf2q5gh';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>
	<?php
}
