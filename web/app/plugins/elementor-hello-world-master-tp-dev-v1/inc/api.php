<?php


/**
 * liste des noms des selects
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function name_select()
{
    $request_p =  array(
        'post_type' => "programmes",
        'posts_per_page'   => -1,//-1 all
      ) ;
    $biens = new WP_query($request_p);
    foreach ($biens->posts as $key => $value) {
        $meta = get_post_meta($value->ID);
      
        foreach ($meta as $key => $value_meta) {
            $tab[]=$key;
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
function params(WP_REST_Request $request)
{
    $value = get_field('heading_text', $request->get_param('page_id'));
    $color = get_field('ekit_wb_1860_color', $request->get_param('page_id'));
    //$value=false; // enlever quand passe sur bedrock
    return  array("visible"=>    ($value === 'true')    ,"color"=>$color)  ;
}
/**
 * retourne la liste des biens
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function biens(WP_REST_Request $request)
{
    $paged = ($request->get_param('paged')) ? $request->get_param('paged') : 1;
    
    $r=array();
    
    foreach (name_select() as $key => $name) {
        if ($request->get_param($name)) {
            $meta=     array(
                'key' =>  $name,
                'value' =>(string)$request->get_param($name),
              );
            array_push($r, $meta);
        }
    }

    // if ($request->get_param('secteur')) {
    //     $meta=   array(
    //         'key' => 'secteur',
    //         'value' =>(string)$request->get_param('secteur'),
    //     );
    //     array_push($r, $meta);
    // }
    // todo ajouter d'autre filtrer
    $request_p =  array(
      'post_type' => "programmes",
      'posts_per_page'   => 10,//-1 all

      'meta_query' => $r,
      'paged' => $paged,
      'orderby' => 'date_saisie',
      'meta_type' => 'DATE',
      'order' => 'DESC'
    ) ;

    $biens = new WP_query($request_p);

    $request_nb =  array(
        'post_type' => "programmes",
        'posts_per_page'   => -1 ,
        'meta_query' => $r,
  
      ) ;
  
    $count_biens = new WP_query($request_nb);
    $tab_meta["biens" ][]="";
    foreach ($biens->posts as $key => $value) {
        $meta = get_post_meta($value->ID);
       
        
        foreach ($meta as $key => $value_meta) {
            $tab["id"]=$value->ID;
            $tab["post_name"]=$value->post_name;

            $tab[$key]=$value_meta[0];
        }
        $tab_meta["biens" ][]=$tab;
    }

    $tab_meta["count" ]=count($count_biens->posts);
    
    return $tab_meta;
}
add_action('rest_api_init', function () {
    register_rest_route('api/v1', '/params', array(
      'methods' => 'GET',
      'callback' => 'params',
    ));
});
add_action('rest_api_init', function () {
    register_rest_route('api/v1', '/biens', array(
      'methods' => 'GET',
      'callback' => 'biens',
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('api/v1', '/secteurs', array(
      'methods' => 'GET',
      'callback' => 'secteur',
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('api/v1', '/types', array(
      'methods' => 'GET',
      'callback' => 'type',
    ));
});
