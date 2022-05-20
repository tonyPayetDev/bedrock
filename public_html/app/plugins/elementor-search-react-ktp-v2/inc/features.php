<?php

add_action("wbp_hook_js_footer_captcha", "wbp_hook_js_footer_captcha", 10, 3);

add_filter("login_redirect", "gkp_subscriber_login_redirect", 10, 3);
function gkp_subscriber_login_redirect($redirect_to, $request, $user)
{
    if (is_array($user->roles)) {
        return site_url('/wp-admin/index.php');
    }

    return home_url();
}
// Clé d'API (au début du fichier, important)
define('CAPITAINE_GMAP_API_KEY', 'AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0');

// Clé Google Maps pour le champ ACF (à la suite de votre code existant)
function capitaine_acf_google_map_api($api)
{
    $api['key'] = CAPITAINE_GMAP_API_KEY;
    return $api;
}

// acf condition afffiche la valeur plus label si valeur éxiste
function acfif($atts = [], $content = null)
{
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
    if (get_field($atts['field'])) {
        $content =get_field($atts['field']).' '.$atts['label'];
        if ($atts['type']==='valueless') {
            $content = $atts['label']."</br>";
        } elseif ($atts['type']==='reverse') {
            $content =$atts['label'].'  '.get_field($atts['field'])."</br>";
        }
    } else {
        $content = '';
    }
 
    return $content;
}
add_shortcode('acf-if', 'acfif');

// acf condition afffiche la valeur plus label si valeur éxiste
function acfprice($atts = [], $content = null)
{
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
 
    if (get_field($atts['field'])) {
        $content =get_field($atts['field']).' '.$atts['label'];
        $nombre_format_francais = number_format($content, 0, ',', ' ');
    } else {
        $nombre_format_francais  = '';
    }
 
    return $nombre_format_francais ;
}
add_shortcode('acf-price', 'acfprice');
/**
 * Charger dynamiquement les choix d'un menu déroulant
 * Filtre : acf/load_field
 */
function reference_key($post_id)
{
    $today = $post_id.'-'.date("md");
    return   $today;
}

function msk_acf_populate_year_field($field)
{
    $field['disabled'] = 1;
    $field['value'] = reference_key(get_the_ID());

    return $field;
}
add_filter('acf/load_field/name=reference', 'msk_acf_populate_year_field');


function capitaine_set_category_on_new_post($post_id, $post, $update)
{
    if (!$update && $post->post_status=="auto-draft" && $post->post_type=="programmes") {
        global $wpdb;

        $content='[elementor-template id="15941"]';// a modifier si migration ou a mettre en parametre de la cron
        $resultat = $wpdb->insert(
            $wpdb->prefix . 'postmeta',
            array(
                    'meta_key' => 'reference',// a mettre par la suite dans annonce
                    'meta_value' =>reference_key($post_id),
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


add_filter('acf/fields/google_map/api', 'capitaine_acf_google_map_api');
// define the elementor/editor/after_save callback