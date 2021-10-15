<?php



function capitaine_set_category_on_new_post($post_id, $post, $update)
{
    if (!$update && $post->post_status=="auto-draft" && $post->post_type=="programmes") {
        global $wpdb;

        $content='[elementor-template id="15941"]';// a modifier si migration ou a mettre en parametre de la cron
     

        $resultat = $wpdb->insert(
            $wpdb->prefix . 'postmeta',
            array(
                    'meta_key' => '_wp_page_template',// a mettre par la suite dans annonce
                    'meta_value' =>'elementor_canvas',
                    'post_id' =>$post_id,
                    
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
                    'post_id' =>$post_id,
                    
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
                    'post_id' =>$post_id,
                    
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
                    'meta_value' =>'[{"id":"493cd8e0","elType":"section","settings":[],"elements":[{"id":"401b0549","elType":"column","settings":{"_column_size":100},"elements":[{"id":"1c4def59","elType":"widget","settings":{"editor":'.json_encode($content).'},"elements":[],"widgetType":"text-editor"}],"isInner":false}],"isInner":false}]',
                    'post_id' =>$post_id,
                    
                ),
            array(
                    '%s',
                    '%s',
                    '%s',
                )
        );
        $post = get_post($post_id);
        wp_update_post($post);
    }
}
add_action('save_post', 'capitaine_set_category_on_new_post', 10, 3);


function afterPostUpdated($meta_id, $post_ID, $meta_key='', $meta_value='')
{
    if ($meta_key=='_edit_lock') {
        $meta = get_post_meta($post_ID);
        if ($meta["pro_res"][0]=="résidentiel") {
            update_post_meta($post_ID, '_elementor_data', '[{"id":"493cd8e0","elType":"section","settings":[],"elements":[{"id":"401b0549","elType":"column","settings":{"_column_size":100},"elements":[{"id":"1c4def59","elType":"widget","settings":{"editor":"[elementor-template id=17361]"},"elements":[],"widgetType":"text-editor"}],"isInner":false}],"isInner":false}]');
        }
        if ($meta["pro_res"][0]=="professionnel") {
            update_post_meta($post_ID, '_elementor_data', '[{"id":"493cd8e0","elType":"section","settings":[],"elements":[{"id":"401b0549","elType":"column","settings":{"_column_size":100},"elements":[{"id":"1c4def59","elType":"widget","settings":{"editor":"[elementor-template id=15941 ]"},"elements":[],"widgetType":"text-editor"}],"isInner":false}],"isInner":false}]');
        }
    }
}
add_action('updated_post_meta', 'afterPostUpdated', 10, 4);


add_action("wpcf7_before_send_mail", "kodex_wpcf7_before_send_mail");
function kodex_wpcf7_before_send_mail($contact_form)
{
    // On récupère les propriétés du formulaire (réglages)
    $current_mail_array = $contact_form->prop('mail');
 
    // On récupère les données du formulaire posté
    $submission = WPCF7_Submission::get_instance();
    $posted_data = $submission->get_posted_data();
    if ($posted_data['contact_email']) {
        $current_mail_array['recipient'] = $posted_data['contact_email'];
        error_log("email envoyé à ".$posted_data['contact_email']);
    }
    
    // On réattribue les nouvelles propriétés au formulaire
    $contact_form->set_properties(array('mail'=>$current_mail_array));
}


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
function custom_elementor_editor_after_save($post_ID, $editor_data)
{
    // execute la commande pour regenere le code js si se trouve dans builder
   // exec(dirname(__DIR__).'\build.sh ', $output, $return_var);
}
 
add_action('koytcha_delete_annonce', 'delete_post');
function delete_post()
{
    // supprimer tous les posts et meta todo mettre dans fonction
    $biens = new WP_query(array('post_type' => 'biens' ,'posts_per_page'   => -1));
    
    foreach ($biens->posts as $key => $value) {
        wp_delete_post($value->ID);
        $meta = get_post_meta($value->ID);

        foreach ($meta as $key => $value) {
            var_dump($key);
        
            $bool = delete_post_meta($value->ID, $key, '');
        }
    }
    return bool ;
}
add_action('koytcha_update_annonce', 'my_function');
function my_function()
{
    //  delete_post();

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
    // $site=home_url($wp->request);
    for ($i = 0; $i < $count; $i++) {
        $d= &$data[$i];
        if (!empty($d)) {
            $content='[elementor-template id="15472"]';// a modifier si migration ou a mettre en parametre de la cron
            $dt = DateTime::createFromFormat('d/m/Y', $d['date_saisie'])->format('Y-m-d H:i:s');
            
            $resultat = $wpdb->insert(
                $wpdb->prefix . 'posts',
                array(
                        'post_type' => 'biens',// a mettre par la suite dans annonce
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
                if ($meta!='photos' & $meta!='details_techniques' & $meta!='contact') {
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
            
            foreach ($d['contact'] as $meta => $contact) {
                $resultat = $wpdb->insert(
                    $wpdb->prefix . 'postmeta',
                    array(
                            'meta_key' => "contact_".$meta,// ajout meta contact
                            'meta_value' =>$contact,
                            'post_id' =>$id_post,
                            
                        ),
                    array(
                            '%s',
                            '%s',
                            '%s',
                        )
                );
            }
            
            $tab_details_techniques				= explode(',', $d['details_techniques']);
                                
            for ($j = 0; $j < count($tab_details_techniques); $j++) {
                $value=str_replace(' ', '', $tab_details_techniques[$j]);
                $value=explode(':', $value);
                if ($value) {
                    if ($value[1]) {
                        $resultat = $wpdb->insert(
                            $wpdb->prefix . 'postmeta',
                            array(
                                    'meta_key' =>$value[0],// certaine data avec  :
                                    'meta_value' =>$value[1],
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
                                    'meta_key' => $value[0],// // certaine data sans  :
                                    'meta_value' =>1,
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
            }
                
            $resultat = $wpdb->insert(
                $wpdb->prefix . 'postmeta',
                array(
                        'meta_key' => '_wp_page_template',// a mettre par la suite dans annonce
                        'meta_value' =>'elementor_canvas',
                        'post_id' =>$id_post,
                        
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
                        'post_id' =>$id_post,
                        
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
                        'post_id' =>$id_post,
                        
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