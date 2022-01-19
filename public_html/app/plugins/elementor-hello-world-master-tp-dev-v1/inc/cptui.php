<?php

/**
 * enregistre custom post type programmes
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */

function cptui_register_my_cpts_programmes()
{

    /**
     * Post Type: programmes.
     */

    $labels = [
        "name" => __("programmes", "twentyeleven"),
        "singular_name" => __("programme", "twentyeleven"),
    ];

    $args = [
        "label" => __("programmes", "twentyeleven"),
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

    register_post_type("programmes", $args);
}

add_action('init', 'cptui_register_my_cpts_programmes');


/**
 * enregistre custom post type biens
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function cptui_register_biens()
{

    /**
     * Post Type: Biens.
     */

    $labels = [
        "name" => __("Biens", "custom-post-type-ui"),
        "singular_name" => __("Bien", "custom-post-type-ui"),
    ];

    $args = [
        "label" => __("Biens", "custom-post-type-ui"),
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
        "rewrite" => [ "slug" => "biens", "with_front" => true ],
        "query_var" => true,
        "supports" => [ "title", "editor", "thumbnail", "custom-fields" ],
        "show_in_graphql" => false,
    ];

    register_post_type("biens", $args);
}

add_action('init', 'cptui_register_biens');

acf_add_local_field_group(array(
    'key' => 'group_616d53072c5d1',
    'title' => 'contact',
    'fields' => array(
        array(
            'key' => 'field_616d53c4215cf',
            'label' => 'secteur',
            'name' => 'secteur',
            'type' => 'select',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'nord' => 'nord',
                'sud' => 'sud',
                'ouest' => 'ouest',
                'est' => 'est',
            ),
            'default_value' => false,
            'allow_null' => 1,
            'multiple' => 1,
            'ui' => 0,
            'return_format' => 'value',
            'ajax' => 0,
            'placeholder' => '',
        ),
        array(
            'key' => 'field_616d5bf89b1eb',
            'label' => 'professionnel ou résidentiel',
            'name' => 'pro_res',
            'type' => 'select',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'professionnel' => 'professionnel',
                'résidentiel' => 'résidentiel',
            ),
            'default_value' => false,
            'allow_null' => 1,
            'multiple' => 0,
            'ui' => 0,
            'return_format' => 'value',
            'ajax' => 0,
            'placeholder' => '',
        ),
    ),
    'location' => array(
        array(
            array(
                'param' => 'user_form',
                'operator' => '==',
                'value' => 'all',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
));


acf_add_local_field_group(array(
    'key' => 'group_6130a66755987',
    'title' => 'programmes',
    'fields' => array(


        array(
            'key' => 'field_616ecf9415643',
            'label' => 'reference',
            'name' => 'reference',
            'type' => 'text',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
            'disabled' => 1,
        ),
      
        array(
            'key' => 'field_6130a68d972d8',
            'label' => 'titre',
            'name' => 'titre',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        array(
            'key' => 'field_616970d4eb7da',
            'label' => 'contact_email',
            'name' => 'contact_email',
            'type' => 'email',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
        ),
        array(
            'key' => 'field_6130a68d972d9',
            'label' => 'exclusif',
            'name' => 'exclusif',
            'type' => 'text',
            'instructions' => 'exemple: saisir coup de coeur ou exclusivité',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),

        array(
            'key' => 'field_6130a6ac972d2',
            'label' => 'latitude',
            'name' => 'latitude',
            'type' => 'number',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'min' => '',
            'max' => '',
            'step' => '',
        ),
        array(
            'key' => 'field_6130a6ac972d4',
            'label' => 'longitude',
            'name' => 'longitude',
            'type' => 'number',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'min' => '',
            'max' => '',
            'step' => '',
        ),
        array(
            'key' => 'field_6130a6ac972d9',
            'label' => 'code_postal',
            'name' => 'code_postal',
            'type' => 'number',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'min' => '',
            'max' => '',
            'step' => '',
        ),
        array(
            'key' => 'field_61793a90f067d',
            'label' => 'ville',
            'name' => 'ville',
            'type' => 'text',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        array(
            'key' => 'field_6130aa77b539f',
            'label' => 'texte',
            'name' => 'texte',
            'type' => 'textarea',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        array(
            'key' => 'field_6130aa7eb53a0',
            'label' => 'surface',
            'name' => 'surface',
            'type' => 'text',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
        array(
            'key' => 'field_6130aa9cb53a1',
            'label' => 'pro_res',
            'name' => 'pro_res',
            'type' => 'select',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'professionnel' => 'professionnel',
                'résidentiel' => 'résidentiel',
            ),
            'default_value' => false,
            'allow_null' => 0,
            'multiple' => 0,
            'ui' => 0,
            'return_format' => 'value',
            'ajax' => 0,
            'placeholder' => '',
        ),
        array(
            'key' => 'field_6130abe6b53a3',
            'label' => 'bien_type',
            'name' => 'bien_type',
            'type' => 'select',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'Maison' => 'Maison',
                'Appartement' => 'Appartement',
                'Commerce' => 'Commerce ',
                'Bureaux et commerces' => 'Bureauxcommerces ',
                'Entrepôts et commerces' => 'Entrepôtscommerces',
                'Bureaux' => 'Bureaux',
            ),
            'default_value' => false,
            'allow_null' => 0,
            'multiple' => 0,
            'ui' => 0,
            'return_format' => 'value',
            'ajax' => 0,
            'placeholder' => '',
        ),
 
        array(
            'key' => 'field_6130ba14cba7b',
            'label' => 'statut',
            'name' => 'statut',
            'type' => 'select',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'encours' => 'encours',
                'terminer' => 'terminer',
            ),
            'default_value' => false,
            'allow_null' => 0,
            'multiple' => 0,
            'ui' => 0,
            'return_format' => 'value',
            'ajax' => 0,
            'placeholder' => '',
        ),
  
        array(
            'key' => 'field_61793c56aecd4',
            'label' => 'details techniques',
            'name' => 'details_techniques',
            'type' => 'textarea',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'maxlength' => '',
            'rows' => '',
            'new_lines' => 'wpautop',
        ),
        array(
            'key' => 'field_6130ae0394b90',
            'label' => 'photo',
            'name' => 'photo',
            'type' => 'image',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'return_format' => 'url',
            'preview_size' => 'medium',
            'library' => 'uploadedTo',
            'min_width' => '',
            'min_height' => '',
            'min_size' => '',
            'max_width' => '',
            'max_height' => '',
            'max_size' => '',
            'mime_types' => '',
        ),
        array(
            'key' => 'field_61793a9cf067e',
            'label' => 'photos carrousel',
            'name' => 'photos',
            'type' => 'gallery',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'return_format' => 'id',
            'preview_size' => 'full',
            'insert' => 'append',
            'library' => 'all',
            'min' => '',
            'max' => '',
            'min_width' => '',
            'min_height' => '',
            'min_size' => '',
            'max_width' => '',
            'max_height' => '',
            'max_size' => '',
            'mime_types' => '',
        ),
       
    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'programmes',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
));