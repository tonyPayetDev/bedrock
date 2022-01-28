<?php


/**
 * liste des noms des select
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function name_select($type)
{
    $request_p =  array(
        'post_type' => $type,
        'posts_per_page'   => -1,//-1 all
      ) ;
    $biens = new WP_query($request_p);
    foreach ($biens->posts as $key => $value) {
        $meta = get_post_meta($value->ID);
      
        foreach ($meta as $key => $value_meta) {
            $tab[]=str_replace(' ', '', $key); // probléme d'espace dans le xml
        }
    }
          
    $tab[]="details"; // ajout des champs dans la liste
    $tab[]="id";

    return array_unique($tab)  ;
}

/**
 * retourne un liste de data d'apres les parametres donnés
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function data(WP_REST_Request $request)
{
    $r=array();

    if (!$request->get_param('name_select') && !$request->get_param('id')) {
        $type=$request->get_param('type');
        $cpt_critere=0;
        foreach (name_select($type) as $key => $name) {
            if ($request->get_param($name)) {
                $meta=     array(
                'key' =>  (string)$name,
                'value' => (string)$request->get_param($name),
              );
                $cpt_critere++;
                array_push($r, $meta);
            }
            if ($request->get_param($name."-max")) {// si le parametre passé contient max
                $meta=     array(
                'key' =>  (string)$name,
                'value' =>$request->get_param($name."-max"),
                'type'    => 'numeric',
                'compare' => '<',
              );
                $cpt_critere++;

                array_push($r, $meta);
            }
            if ($request->get_param($name."-min")) {// si le parametre passé contient max
                $meta=     array(
                'key' =>  (string)$name,
                'value' =>$request->get_param($name."-min"),
                'type'    => 'numeric',
                'compare' => '>',
              );
                $cpt_critere++;

                array_push($r, $meta);
            }
        }
  
        if (count($request->get_params())==1) { // verifier qu'il ya un parametre si un parametre c'est que le type
            $request_p =  array(
                'post_type' => $type,
                'posts_per_page'   => -1,//-1 all
                'orderby' => 'date_saisie',
                'meta_type' => 'DATE',
                'order' => 'DESC'
              ) ;
        } elseif (count($request->get_params())-1==$cpt_critere) { //  verifie le nombre de critere demander dans l'url et le nombre de critere trouver si le nombre n'est pas le main ca veut dire que le critere n'existe pas
            $request_p =  array(
                'post_type' => $type,
                'posts_per_page'   => -1,//-1 all
                'meta_query' => $r,
                'orderby' => 'date_saisie',
                'meta_type' => 'DATE',
                'order' => 'DESC'
              ) ;
        }
    
        $biens = new WP_query($request_p);
        $ville ;
        $per_page=1;
        $cpt=0;

        foreach ($biens->posts as $key => $value) {
            $tab=[];
            $meta = get_post_meta($value->ID);

            if ($cpt==10) {// decoupe par paquet de 10
                $per_page++;
                $cpt=0;
            }
            $cpt++;
            foreach ($meta as $key => $value_meta) {
                $tab["id"]=$value->ID;
                $tab["post_name"]=$value->post_name;
                if (!empty($value->photo)) {
                    $url = wp_get_attachment_image_src($value->photo, array( 630, 370 ))[0];// recupere juste l'ul
                    if (!empty($url)) {// si n'est pas pas un id worpdress passé mais une url
                        $tab["photo"]= $url;
                    }
                }
         
                $tab[$key]=$value_meta[0];
            }
            
            $tab_meta['data'][$per_page][]=$tab;
        }
    
        $tab_meta["count" ]=count($biens->posts);
    } elseif ($request->get_param('id') && $request->get_param('type')) {
        $id=$request->get_param('id');
        $meta=get_post_meta($id);
        foreach ($meta as $key => $value_meta) {
            $tab[$key]=$value_meta[0];
        }
        $tab_meta['data'][1][]=$tab;
    } else {
        $type=$request->get_param('type');

        $tab_meta["name_select" ]=name_select($type); // retourne si name_select = true
    }

    return $tab_meta;
}

add_action('rest_api_init', function () {
    register_rest_route('api/v1', '/data', array(
      'methods' => 'GET',
      'callback' => 'data',
    ));
});