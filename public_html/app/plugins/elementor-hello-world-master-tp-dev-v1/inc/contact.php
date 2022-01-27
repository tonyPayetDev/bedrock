<?php


// function to grab all possible meta values of the chosen meta key.
function get_meta_values($meta_key, $post_type = 'post', $ref)
{
    $posts = get_posts(
        array(
            'post_type' => $post_type,
            'meta_key' => $meta_key,
            'meta_value' => $ref,

            'posts_per_page' => -1,
        )
    );

    $meta_values = array();
    foreach ($posts as $post) {
        $meta = get_post_meta($post->ID);
        foreach ($meta as $key => $value_meta) {
            $tab[$key]=str_replace(' ', '', $value_meta); // probléme d'espace dans le xml
        }
    }

    return $tab;
}


class Email
{
    public static function send_mail_secteur_pro_res($contact_form, $current_mail_array, $secteur, $pro_res)
    {
        if ($secteur &&  $pro_res) {
            error_log("secteur ".   $secteur);
            error_log("pro_res ". $pro_res);
   
            //we use the meta_query argument to load a set of rules
            $args = array(
          'meta_query' => array(
          'relation' => 'AND', // Could be OR, default is AND
              array(
                  'key'     => 'secteur',
                  'value'   => $secteur,
                   'compare' => 'LIKE'
              ),
              array(
                  'key'     => 'pro_res',
                  'value'   =>   $pro_res,
                   'compare' => '='
              )
              )
          );
   
            $user_query = new WP_User_Query($args);
            if ($user_query->get_results()) {
                foreach ($user_query->get_results() as $user) {
                    error_log("email envoyé à test ". $user->user_email);
                    $current_mail_array['recipient'] = $user->user_email;
                }
            } else {
                $current_mail_array['recipient'] =null;
            }
            error_log("email envoyé à current_mail_array  ". $user->user_email);
            $contact_form->set_properties(array('mail'=>$current_mail_array));
        }
    }
    public static function send_mail_role($contact_form, $current_mail_array, $role)
    {
        if ($role) {
            error_log("role ".    $role);

            $user_query = new WP_User_Query(array( 'role' =>   $role ));

            if ($user_query->get_results()) {
                foreach ($user_query->get_results() as $user) {
                    error_log("email envoyé à test ". $user->user_email);
                    $current_mail_array['recipient'] = $user->user_email;
                }
            } else {
                $current_mail_array['recipient'] =null;
            }
            error_log("email envoyé à current_mail_array  ". $user->user_email);
            $contact_form->set_properties(array('mail'=>$current_mail_array));
        }
    }

    public static function send_mail_type_reference($contact_form, $current_mail_array, $posted_data)
    {
        if ($posted_data) {
            error_log("reference ". $posted_data['reference']);
            error_log("type ".$posted_data['type']);
            
            $meta_values = get_meta_values('reference', $posted_data['type'], $posted_data['reference']);
            // recupererer les infos sur le bien .
            if ($meta_values['contact_email'][0]) {
                error_log("email envoyé a ".$meta_values['contact_email'][0]);
                $current_mail_array['recipient'] = $meta_values['contact_email'][0]; // commenter en local / decommenter pour la prod;
            } else {
                $current_mail_array['recipient'] =null;
            }
            error_log("email envoyé à   ".  $current_mail_array['recipient']);
            $contact_form->set_properties(array('mail'=>$current_mail_array));

            // enregistrer sur ki seulement si c'est un biens et non un programme
            if ($posted_data['type']=='biens') {
                Email::add_prospect_on_ki($posted_data, $meta_values);
            }
        }
    }
    
    public static function add_prospect_on_ki($posted_data, $meta_values)
    {
        // informations donné du mail de dina pour pourvoir enregistrer un prospect
        // todo a voir si ne pas creer une interface wordpress par la suite pour enresgistrer ces informations
        $url = 'https://ki.koytchaimmo.re/prospect-api/';
        $auth= "e4f45fb0-17a772a5-36366108-ffc95038";// token generer via l'url https://ki.koytchaimmo.re/prospect-api/

        error_log("add_prospect_on_ki");

        $types_bien=array(
        "ProfessionnelBureaux"=>1,
        "ProfessionnelEntrepôt"=>2,
        "ProfessionnelLocalcommercial" =>3,
        "ProfessionnelTerrain"=>4,
        "ProfessionnelImmeuble" =>10,
        "ProfessionnelFondsdecommerce" =>11,
        "RésidentielAppartement" =>6,
        "RésidentielMaison/Villa" =>7,
        "RésidentielTerrain" =>8,
        );
        
        $commercial=array(
        "YvonKASZOWSKI"=>4,
        "BorisClausse"=>12,
        "AurélieCaïlasson" =>13,
        "PatriceVALSIN"=>16,
        "JulienGRONDIN" =>19,
        "HugoLALOS" =>20,
        "PierretteGAUDON" =>26
        );
        
        error_log(strtolower($meta_values['secteur'][0]));
        error_log($meta_values['bien_type']);
        error_log($meta_values['pro_res']);
        error_log($meta_values['contact_nom']);

        $key_bien=$meta_values['pro_res'][0].$meta_values['bien_type'][0];
        $key_commercial=$meta_values['contact_nom'][0];

        error_log('clé récuperer');
        error_log($key_bien);
        error_log($key_commercial);
        
        $data = [
        'nom' =>$posted_data['your-name'],
        'prenom' =>$posted_data['your-firstname'],
        'tel' => $posted_data['your-tel'],
        'mail' => $posted_data['your-email'],
        "commercial_id"=> $commercial[$key_commercial],
        'types_bien' => [$types_bien[$key_bien]],
        'secteurs' => [strtolower($meta_values['secteur'][0])],
        'commentaire' => $posted_data['your-message'].' <br><strong> Prospect venant du site koytchaimmo.re </strong>',
        ];
        
        $header = array(
          "Content-Type: application/x-www-form-urlencoded",
          "Token: ". $auth
         );
         
        $result = file_get_contents(
            $url,
            false,
            stream_context_create([
                'http' => [
                  'content' => json_encode($data),
                  'header' => $header ,
                  'ignore_errors' => 1,
                  'method' => 'POST',
                  'timeout' => 10,
                  'Content-Type'=> 'application/x-www-form-urlencoded',
                ]
              ])
        );
        
        if (json_decode($result)->success) {
            error_log("Enregistrement sur ki.koytchaimmo.re ok ");
            error_log("result ".$result);
        } else {
            error_log("Erreur d'Enregistrement sur ki.koytchaimmo.re ");
            error_log("result ".$result);
        }
    }
}
  

add_action("wpcf7_before_send_mail", "kodex_wpcf7_before_send_mail");


// Ajout un prospect su ki.koytchaimmo.re

function kodex_wpcf7_before_send_mail($contact_form)
{ // On récupère les propriétés du formulaire (réglages)
    $current_mail_array=$contact_form->prop('mail');
    error_log("id form  ".$contact_form->id);
    
    $submission = WPCF7_Submission::get_instance();
    $posted_data = $submission->get_posted_data();
    if (isset($posted_data['secteur'][0]) && isset($posted_data['pro_res'][0])) {
        Email::send_mail_secteur_pro_res($contact_form, $current_mail_array, $posted_data['secteur'][0], $posted_data['pro_res'][0]);
    }
    if (isset($posted_data['type']) && isset($posted_data['reference'])) {
        Email::send_mail_type_reference($contact_form, $current_mail_array, $posted_data);
    }
 
    if (isset($posted_data['role'])) {
        Email::send_mail_role($contact_form, $current_mail_array, $posted_data['role']);
    }

    if (isset($posted_data['your-request'][0])) {
        error_log("email envoyé à  ". $posted_data['your-request'][0]);

        Email::send_mail_role($contact_form, $current_mail_array, $posted_data['your-request'][0]);
    }
}