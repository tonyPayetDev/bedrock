<?php


/**
 * liste des noms des selects
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
          

    return array_unique($tab)  ;
}
/**
 * liste des secteurs
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function secteur(WP_REST_Request $request)
{
    $secteur =array(
                array("value"=>"Nord","label"=>"Nord"),
                array("value"=>"Sud","label"=>"Sud"),
                array("value"=>"Est","label"=>"Est"),
                array("value"=>"Ouest","label"=>"Ouest")
            
            );

    return $secteur  ;
}
/**
 * liste des select pour un critére donner
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function critere(WP_REST_Request $request)
{
    $criteres= $request->get_param('criteres');
    $request_p =  array(
      'post_type' => "programmes",
      'posts_per_page'   => -1,//-1 all
    ) ;
    $biens = new WP_query($request_p);
    foreach ($biens->posts as $key => $value) {
        $meta = get_post_meta($value->ID);
    
        foreach ($meta as $key => $value_meta) {
            if ($key==$criteres) {
                $tab[]=$value_meta[0];
            }
        }
    }
    
    return array_unique($tab)  ;
}
/**
 * liste des type de prestations
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function type(WP_REST_Request $request)
{
    $type =array(
                array("value"=>"Vente","label"=>"Acheter"),
                array("value"=>"Location","label"=>"Louer"),
            
            );

    return  $type  ;
}


/**
 * liste des type de prestations
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function url(WP_REST_Request $request)
{
    $url="url_api";

    $meta=     array(
        'key' =>  'api',
      );
    $request_p =  array(
        'post_type' => "page",

        'meta_query' => $meta,
        'meta_type' => 'DATE',
        
      ) ;
  
    $biens = new WP_query($request_p);
    $tab_meta["biens" ][]="";
    foreach ($biens->posts as $key => $value) {
        $meta = get_post_meta($value->ID);
        foreach ($meta as $key => $value_meta) {
            $tab["id"]=$value->ID;
            $tab["api"]=$value->api;
            $tab["post_name"]=$value->post_name;
        }
        $tab_meta["biens" ][]=$tab;
    }

    return   $tab_meta   ;
}
/**
 * liste des type de prestations
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function params(WP_REST_Request $request)
{
    $file = dirname(__DIR__)."/inc/jsonFile.json";
    $data = file_get_contents($file);
    $obj = json_decode($data);
    //$value=false; // enlever quand passe sur bedrock
    return $obj ;
}
/**
 * retourne la liste des biens
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */

function title_filter($where, &$wp_query)
{
    global $wpdb;
    // 2. pull the custom query in here:
    if ($search_term = $wp_query->get('search_prod_title')) {
        $where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql(like_escape($search_term)) . '%\'';
    }
    return $where;
}

function biens(WP_REST_Request $request)
{
    if (!$request->get_param('name_select')) {
        $paged = ($request->get_param('paged')) ? $request->get_param('paged') : 1;
        $r=array();
        $type=$request->get_param('type');
        foreach (name_select($type) as $key => $name) {
            if ($request->get_param($name)) {
                $meta=     array(
                'key' =>  (string)$name,
                'value' => (string)$request->get_param($name),
              );
                array_push($r, $meta);
            }
            if ($request->get_param($name."-max")) {// si le parametre passé contient max
                $meta=     array(
                'key' =>  (string)$name,
                'value' =>$request->get_param($name."-max"),
                'type'    => 'numeric',
                'compare' => '<',
              );
                array_push($r, $meta);
            }
            if ($request->get_param($name."-min")) {// si le parametre passé contient max
                $meta=     array(
                'key' =>  (string)$name,
                'value' =>$request->get_param($name."-min"),
                'type'    => 'numeric',
                'compare' => '>',
              );
                array_push($r, $meta);
            }
        }
    
        $request_p =  array(
        'post_type' => $type,
        'posts_per_page'   => -1,//-1 all
        'meta_query' => $r,
        'paged' => $paged,
        'orderby' => 'date_saisie',
        'meta_type' => 'DATE',
        'order' => 'DESC'
      ) ;
        $biens = new WP_query($request_p);
        $ville ;
        $per_page=1;
        $tab=[];
        $cpt=0;
        
        foreach ($biens->posts as $key => $value) {
            $meta = get_post_meta($value->ID);

            if ($cpt==10) {// decoupe par paquer de 10
                $per_page++;
                $cpt=0;
            }
            $cpt++;
            foreach ($meta as $key => $value_meta) {
                $tab["id"]=$value->ID;
                $tab["post_name"]=$value->post_name;
                $url = wp_get_attachment_image_src($value->photo, 'thumbnail')[0];// recupere juste l'ul
            
                $tab["photo"]= $url;
                $tab[$key]=$value_meta[0];
            }
        
            $tab_meta['data'][$per_page][]=$tab;
        }
        $request_nb =  array(
        'post_type' => $type,
        'posts_per_page'   => -1 ,
        'meta_query' => $r,
      
      ) ;

        $count_biens = new WP_query($request_nb);
        $tab_meta["count" ]=count($count_biens->posts);
    } else {
        $tab_meta["name_select" ]=name_select($type); // retourne si name_select = true
    }

    return $tab_meta;
}
// add_action('rest_api_init', function () {
//     register_rest_route('api/v1', '/params', array(
//       'methods' => 'GET',
//       'callback' => 'params',
//     ));
// });
add_action('rest_api_init', function () {
    register_rest_route('api/v1', '/data', array(
      'methods' => 'GET',
      'callback' => 'biens',
    ));
});

// add_action('rest_api_init', function () {
//     register_rest_route('api/v1', '/secteurs', array(
//       'methods' => 'GET',
//       'callback' => 'secteur',
//     ));
// });

// add_action('rest_api_init', function () {
//     register_rest_route('api/v1', '/types', array(
//       'methods' => 'GET',
//       'callback' => 'type',
//     ));
// });
// add_action('rest_api_init', function () {
//     register_rest_route('api/', '/url', array(
//       'methods' => 'GET',
//       'callback' => 'url',
//     ));
// });