<?php
add_filter( 'query_vars', 'my_query_vars' ); 
function my_query_vars( $query_vars ) {     
    $query_vars[] = 'post';
    return $query_vars;
}

//my_function();

// Clé d'API (au début du fichier, important)
define('CAPITAINE_GMAP_API_KEY', 'AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0');


// Clé Google Maps pour le champ ACF (à la suite de votre code existant)
function capitaine_acf_google_map_api($api)
{
    $api['key'] = CAPITAINE_GMAP_API_KEY;
    return $api;
}
add_filter('acf/fields/google_map/api', 'capitaine_acf_google_map_api');
// define the elementor/editor/after_save callback 
add_action('elementor/editor/after_save', 'custom_elementor_editor_after_save', 10, 2);
// execute npm run builder pour regenerer code 
function custom_elementor_editor_after_save( $post_ID,$editor_data ){ 
    // execute la commande pour regenere le code js si se trouve dans builder
   // exec(dirname(__DIR__).'\build.sh ', $output, $return_var);

 } 
 
 //add the action 
add_action('koytcha_update_annonce', 'my_function');
function my_function()
{
    delete_post();

    // recuperation des biens
    global $wpdb;
    $url											= 'https://ki.koytchaimmo.re/annonces-xml/list/user/website/pass/9ab9d5561f7c61ac8bb9b2bbb7baf539/force/1'; // a decomenter en prod ou test
   // $url											= 'C:\wamp64\www\wordpress-labo\wp-content\themes\starter-theme\liste.xml';
    
    if (!$xml = simplexml_load_file($url)) {
        exit('Failed to open '.$url);
    }

    $json 										= json_encode($xml);
    $data 										= json_decode($json, true);
    $data										= $data['annonce'];
    $count										= count($data);
    $site=home_url( $wp->request );
    for ($i = 0; $i < $count; $i++) {
        $d= &$data[$i];
        if (!empty($d)) {
            $content='[elementor-template id="189"]';// a modifier si migration ou a mettre en parametre de la cron
            $dt = DateTime::createFromFormat('d/m/Y', $d['date_saisie'])->format('Y-m-d H:i:s');
            
            $resultat = $wpdb->insert(
                $wpdb->prefix . 'posts',
                array(
                        'post_type' => 'programmes',// a mettre par la suite dans annonce
                        'post_content' =>$content,
                        'post_title' => $d['titre'],
                        'post_name' =>  $d['titre'],
                        'post_author' => "2",
                        'post_status' => "publish"   ,
                        'post_date' =>  $dt // a voir pour filter par date

                    ),
                array(
                        '%s',
                        '%s',
                        '%s',
                        '%s',
                        '%s',
                    )
            );
            
            $id_post=$wpdb->insert_id;

                
            if (!empty($d['photos']['photo'])) {
                if (is_array($d['photos']['photo'])) {
                    $resultat = $wpdb->insert(
                        $wpdb->prefix . 'postmeta',
                        array(
                                'meta_key' => "photos",
                                'meta_value' => $d['photos']['photo'][0],	// recupere premier image
                                'post_id' =>$id_post,
                                
                            ),
                        array(
                                '%s',
                                '%s',
                                '%s',
                            )
                    );
                } else {
                    $resultat = $wpdb->insert(
                        $wpdb->prefix . 'postmeta',
                        array(
                                'meta_key' => "photos",
                                'meta_value' => $d['photos']['photo'],	// recupere premier image
                                'post_id' =>$id_post,
                                
                            ),
                        array(
                                '%s',
                                '%s',
                                '%s',
                            )
                    );
                }
            }
        
            foreach ($d as $meta => $value2) {
                if ($meta!='photos') {
                    $resultat = $wpdb->insert(
                        $wpdb->prefix . 'postmeta',
                        array(
                                'meta_key' => $meta,// a mettre par la suite dans annonce
                                'meta_value' => $value2,
                                'post_id' =>$id_post,
                                
                            ),
                        array(
                                '%s',
                                '%s',
                                '%s',
                            )
                    );
                }
            }

            $resultat = $wpdb->insert(
                $wpdb->prefix . 'postmeta',
                array(
                        'meta_key' => '_wp_page_template',// a mettre par la suite dans annonce
                        'meta_value' =>'elementor_canvas',
                        'post_id' => $id_post,
                        
                    ),
                array(
                        '%s',
                        '%s',
                        '%s',
                    )
            );
            $resultat = $wpdb->insert(
                $wpdb->prefix . 'postmeta',
                array(
                        'meta_key' => '_elementor_template_type',
                        'meta_value' =>'wp-post',
                        'post_id' => $id_post,
                        
                    ),
                array(
                        '%s',
                        '%s',
                        '%s',
                    )
            );

            $resultat = $wpdb->insert(
                $wpdb->prefix . 'postmeta',
                array(
                        'meta_key' => '_elementor_edit_mode',
                        'meta_value' =>'builder',
                        'post_id' => $id_post,
                        
                    ),
                array(
                        '%s',
                        '%s',
                        '%s',
                    )
            );
            $resultat = $wpdb->insert(
                $wpdb->prefix . 'postmeta',
                array(
                        'meta_key' => '_elementor_data',
                        'meta_value' =>'[{"id":"493cd8e0","elType":"section","settings":[],"elements":[{"id":"401b0549","elType":"column","settings":{"_column_size":100},"elements":[{"id":"1c4def59","elType":"widget","settings":{"editor":'.json_encode($content).'},"elements":[],"widgetType":"text-editor"}],"isInner":false}],"isInner":false}]',// pour que le champs acf soi visible
                        'post_id' => $id_post,
                        
                    ),
                array(
                        '%s',
                        '%s',
                        '%s',
                    )
            );
                
            wp_publish_post($id_post);

            $post = get_post($id_post);
            wp_update_post($post);
        }
    }
    
}
function delete_post(){
    // supprimer tous les posts et meta todo mettre dans fonction
    $programmes = new WP_query(array('post_type' => 'programmes' ,'posts_per_page'   => -1));
    
    foreach ($programmes->posts as $key => $value) {
        wp_delete_post($value->ID);
        $meta = get_post_meta($value->ID);

        foreach ($meta as $key => $value) {
            var_dump($key);
        
            $bool =delete_post_meta($value->ID, $key, '');
        }
    }

}
