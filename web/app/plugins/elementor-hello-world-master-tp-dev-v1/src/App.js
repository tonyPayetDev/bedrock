import { GoogleApiWrapper } from "google-maps-react";
import GoogleMaps from "./components/GoogleMaps";
import ListeAnnonce from "./components/ListeAnnonce";

import SearchLocationInput from "./components/SearchLocationInput";
import SelectBox from "./components/SelectBox";
import NbResultat from "./components/NbResultat";

import React, { useState, useEffect } from "react";
import * as APIConfig from "./constants/APIConfig";
//import 'bootstrap/dist/css/bootstrap.min.css';

var page_id = APIConfig.url_const.searchParams.get("page_id");

const App = () => {
  const [state, updateState] = React.useState({
    lat: -21,
    lng: 55.5,
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {},
    visible: false,

  });
  const [tab, setTab] = useState({  });// # stock les filtre d'apres les type récupérer 

  const params=APIConfig.params;
  console.log(  tab);

 params.type.map((data, index) => {
    var secteur = APIConfig.url_const.searchParams.get( data.name);
    if(secteur){ // on récuper si l'info et présente
      tab[data.name]=secteur;
    }
  });

  const style = {
    backgroundColor: params.color ?  params.color : "#ffffff",
    display: params.ekit_search_btn ?  "" : "none",
    "border-radius":"0px",
    color:"white",

  };
  const divStyle = {
    display: "none",
  };
  const [cars, setCars] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [optionsMoto, setOptionsMoto] = useState([]);
  const [options, setOptions] = useState([]);
  const [url_construct, setUrlConstruct] = useState({prestation_type:"",secteur:""});

  useEffect(() => {
    APIConfig.getItems(tab).then((data) => setSelectedSort(data));
   
  }, []);

  useEffect(() => {
    setOptionsMoto(params.secteur)
  }, []);

  return (
    <div class="container"> 
      <h3 style={{ margin: "0px 0px 0px 0px " }}>     
        {params.heading_text}
      </h3>

      <div class="row">
        <div class="col-12 m-2">

        <SelectBox
          options={options}
          optionsMoto={optionsMoto}
          setSelectedSort={setSelectedSort}
          setUrlConstruct={setUrlConstruct}
          cars={cars}
          state={state}
          params={params}

        ></SelectBox>
        </div>

      </div>

      <div class="row">
      <div class="col-12  justify-content-center ">

         <a type="button" href={params.url +'?'+  new URLSearchParams(url_construct)} class="btn " style={style}> {params.search_text}</a>
         </div>

      </div>
      <NbResultat
        data={selectedSort} 
      ></NbResultat>
      <SearchLocationInput
       
       state={state}
       updateState={updateState}
       cars={cars}
       setSelectedSort={setSelectedSort}
       params={params}
     ></SearchLocationInput>


    <div    class="row" style={params.visible ?null  :  divStyle} >
          
    <div class="col-md-6" >
      <ListeAnnonce 
        params={params}
        options={options}
        motorisation={optionsMoto}
        latitude={state.lat}
        longitude={state.lng}
        setSelectedSort={setSelectedSort}
        cars={selectedSort}
      ></ListeAnnonce>

      </div>
      {/* <div class="col-md-6">
 
      <GoogleMaps
        options={options}
        motorisation={optionsMoto}
        latitude={state.lat}
        longitude={state.lng}
        setSelectedSort={setSelectedSort}
        cars={selectedSort}
      ></GoogleMaps>
      </div> */}

      </div>
    </div>

  );
};

export default GoogleApiWrapper({
  apiKey: APIConfig.KEY_MAP,
})(App);
