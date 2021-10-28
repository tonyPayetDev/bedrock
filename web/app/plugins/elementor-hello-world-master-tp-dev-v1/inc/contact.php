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
                   'compare' => '='
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

    public static function send_mail_type_reference($contact_form, $current_mail_array, $type, $reference)
    {
        if ($reference &&  $type) {
            error_log("reference ".$reference);
            error_log("type ".$type);
            
            $meta_values = get_meta_values('reference', $type, $reference);
      
            if ($meta_values['contact_email'][0]) {
                error_log("email envoyé a ".$meta_values['contact_email'][0]);
                $current_mail_array['recipient'] =$meta_values['contact_email'][0]; // decommenter pour la prod;
            } else {
                $current_mail_array['recipient'] =null;
            }
            error_log("email envoyé à   ".  $current_mail_array['recipient']);
            $contact_form->set_properties(array('mail'=>$current_mail_array));
        }
    }
}
  

add_action("wpcf7_before_send_mail", "kodex_wpcf7_before_send_mail");


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
         Email::send_mail_type_reference($contact_form, $current_mail_array, $posted_data['type'], $posted_data['reference']);
     }
 
     if (isset($posted_data['role'])) {
         Email::send_mail_role($contact_form, $current_mail_array, $posted_data['role']);
     }

     if (isset($posted_data['your-request'][0])) {
         error_log("email envoyé à  ". $posted_data['your-request'][0]);

         Email::send_mail_role($contact_form, $current_mail_array, $posted_data['your-request'][0]);
     }
 }