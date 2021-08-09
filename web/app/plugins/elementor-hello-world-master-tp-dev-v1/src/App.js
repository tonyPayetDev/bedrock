import { GoogleApiWrapper } from "google-maps-react";
import GoogleMaps from "./components/GoogleMaps";
import ListeAnnonce from "./components/ListeAnnonce";

import SearchLocationInput from "./components/SearchLocationInput";
import SelectBox from "./components/SelectBox";
import NbResultat from "./components/NbResultat";
import {Animated} from "react-animated-css";

import React, { useState, useEffect } from "react";
import * as APIConfig from "./constants/APIConfig";
//import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesBg from 'particles-bg'

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
  console.log(params.ekit_wb_3976_font );
  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [.1, 0.4],
    position: "all",
    color: ["#E2038C", "#FFFFFF","#3f51b5"],
    cross: "dead",
    // emitter: "follow",
    random: 15
  };

  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      }
    });
  }

  return (
    <div class="container"  style={{fontFamily:params.ekit_wb_3976_font,fontSize:14 }}  > 
<h3>     
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
      <Animated  isVisible={true}  animationIn="fadeIn" animationOut="fadeout" animationInDuration={4000} animationOutDuration={4000} >

         <a type="button" href={params.url +'?'+  new URLSearchParams(url_construct)} class="btn " style={style}> {params.search_text}    
            <NbResultat
              data={selectedSort} 
            ></NbResultat>
         </a>
         </Animated>

         </div>

      </div>

      <SearchLocationInput
       
       state={state}
       updateState={updateState}
       cars={cars}
       setSelectedSort={setSelectedSort}
       params={params}
     ></SearchLocationInput>


    <div    class="row" style={params.visible ?null  :  divStyle} >
          
    <div class="col-md-6" >

    <Animated  isVisible={true}  animationIn="pulse" animationOut="fadeout" animationInDuration={2000} animationOutDuration={2000} >
    <ListeAnnonce 
        params={params}
        options={options}
        motorisation={optionsMoto}
        latitude={state.lat}
        longitude={state.lng}
        setSelectedSort={setSelectedSort}
        cars={selectedSort}
      ></ListeAnnonce>
</Animated>


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
      <ParticlesBg type="custom" config={config} bg={true} />

      </div>

    </div>

  );
};

export default GoogleApiWrapper({
  apiKey: APIConfig.KEY_MAP,
})(App);
