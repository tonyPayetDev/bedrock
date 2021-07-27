import { GoogleApiWrapper } from "google-maps-react";
import GoogleMaps from "./components/GoogleMaps";
import ListeAnnonce from "./components/ListeAnnonce";

import SearchLocationInput from "./components/SearchLocationInput";
import SelectBox from "./components/SelectBox";
import NbResultat from "./components/NbResultat";

import React, { useState, useEffect } from "react";
import * as APIConfig from "./constants/APIConfig";
//import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [state, updateState] = React.useState({
    lat: -21,
    lng: 55.5,
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {},
    visible: false,

  });
  const divStyle = {
    visibility:"hidden",
  };
  const [cars, setCars] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [optionsMoto, setOptionsMoto] = useState([]);
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState([]);


  useEffect(() => {
    APIConfig.getItems({ prestation_type:"Vente"}).then((data) => setSelectedSort(data));
   
  }, []);

  useEffect(() => {
    APIConfig.getItemsType().then((data) => setOptions(data));
  }, []);

  useEffect(() => {
    APIConfig.getItemsMoto().then((data) => setOptionsMoto(data));
  }, []);

  useEffect(() => {
    APIConfig.getItemsParams().then((data) => setParams(data));
  }, []);

  return (
    <div class="container">
      <h3 style={{ margin: "0px 0px 0px 29px " }}>    
        Recherche une location a proximité  
      </h3>
      <SearchLocationInput
        state={state}
        updateState={updateState}
        cars={cars}
        setSelectedSort={setSelectedSort}
      ></SearchLocationInput>
      
      <SelectBox
        options={options}
        optionsMoto={optionsMoto}
        setSelectedSort={setSelectedSort}
        cars={cars}
        state={state}
      ></SelectBox>

      <NbResultat
        data={selectedSort} 
      ></NbResultat>
            

    <div    class="row" style=  {params.visible ?null  :  divStyle} >
          
    <div class="col-md-6">
      <ListeAnnonce 
       
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
