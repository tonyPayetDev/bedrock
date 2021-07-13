<?php 
/**
 * Plugin Name: React Example
 */
defined( 'ABSPATH' ) || die();

// In main plugin file
add_shortcode( 'example_react_app', 'example_react_app' );
/**
 * Registers a shortcode that simply displays a placeholder for our React App.
 */
function example_react_app( $atts = array(), $content = null , $tag = 'example_react_app' ){
    ob_start();
    ?>
      <div id="app">App goes here</div>

        <?php wp_enqueue_script( 'example-app', plugins_url( 'build/index.js', __FILE__ ), array( 'wp-element' ), time(), true ); ?>
        <?php  $stylesheet_url =  plugins_url( 'build/index.css', __FILE__ ); wp_enqueue_style( 'my-custom-styles', esc_url( $stylesheet_url ) );?>
       
        <?php  $stylesheet_url =  plugins_url( 'build/images', __FILE__ ); wp_enqueue_style( 'my-custom-styles', esc_url( $stylesheet_url ) );?>
        <?php
    // Chargement des styles et des scripts Bootstrap sur WordPress
        wp_enqueue_style('style', get_stylesheet_uri());
        wp_enqueue_style('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
        wp_enqueue_script('jquery');
        wp_enqueue_script('popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', array('jquery'), 1, true);
        wp_enqueue_script('boostrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', array('jquery', 'popper'), 1, true);
?>
	);
    <?php return ob_get_clean();
}