<?php


/**
 * enregistre custom post type programmes
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function cptui_register_my_cpts() {

	/**
	 * Post Type: Programmes.
	 */

	$labels = [
		"name" => __( "Programmes", "custom-post-type-ui" ),
		"singular_name" => __( "Programme", "custom-post-type-ui" ),
	];

	$args = [
		"label" => __( "Programmes", "custom-post-type-ui" ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => true,
		"rest_base" => "",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"has_archive" => false,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => [ "slug" => "programmes", "with_front" => true ],
		"query_var" => true,
		"supports" => [ "title", "editor", "thumbnail", "custom-fields" ],
		"show_in_graphql" => false,
	];

	register_post_type( "programmes", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );
