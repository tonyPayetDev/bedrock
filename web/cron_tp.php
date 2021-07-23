

<?php
// $curl = curl_init();

// $opts = [
//     CURLOPT_URL => 'http://localhost/wordpress-labo/wp-json/wp/v2',
//     CURLOPT_RETURNTRANSFER => true,
// ];

// curl_setopt_array($curl, $opts);

// $response = curl_exec($curl);
// curl_close($curl);
// var_dump($response);
// die();

global $wpdb;

var_dump($wpdb);
// $wpdb->insert("wp_submitted_form", array(
//    "name" => $name,
//    "email" => $email,
//    "phone" => $phone,
//    "country" => $country,
//    "course" => $course,
//    "message" => $message,
//    "datesent" => $now ,
// ));

die();
$client = new \GuzzleHttp\Client();
$response = $client->request('GET', 'http://localhost/wordpress-labo/wp-json/wp/v2');
echo $response->getBody();
die();
$client = new \GuzzleHttp\Client();
$response = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle');

echo $response->getStatusCode(); // 200
echo $response->getHeaderLine('content-type'); // 'application/json; charset=utf8'
echo $response->getBody(); // '{"id": 1420053, "name": "guzzle", ...}'
die();
die();
//on récupère toutes les villes
$url											= 'https://ki.koytchaimmo.re/annonces-xml/list/user/website/pass/9ab9d5561f7c61ac8bb9b2bbb7baf539/force/1';
#$url											= 'list.xml';
if(!$xml = simplexml_load_file($url))
   exit('Failed to open '.$url);

$json 										= json_encode($xml);
$data 										= json_decode($json,TRUE);
$data										= $data['annonce'];
$count										= count($data);

for ($i = 0; $i < $count; $i++) 
{
	$d										= &$data[$i];
	
	if(!empty($d))
	{
		$rp['ref']							= $d['reference'];
		
		if(!empty($d['titre']))
		$rp['titre']						= $d['titre'];
		
		if(!empty($d['texte']))
      if(!empty($d['prix']))
         var_dump($d['prix']);
                  

   }

}



die('FIN');
