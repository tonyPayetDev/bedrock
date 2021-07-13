import { GoogleApiWrapper } from "google-maps-react";
import GoogleMaps from "./components/GoogleMaps";
import SearchLocationInput from "./components/SearchLocationInput";
import SelectBox from "./components/SelectBox";
import React, { useState, useEffect } from "react";
import * as APIConfig from "./constants/APIConfig";

const App = () => {
  const [state, updateState] = React.useState({
    lat: -21,
    lng: 55.5,
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {},
  });

  const [cars, setCars] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [optionsMoto, setOptionsMoto] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    APIConfig.getItems().then((data) => setCars(data));
  }, []);

  useEffect(() => {
    APIConfig.getItemsType().then((data) => setOptions(data));
  }, []);

  useEffect(() => {
    APIConfig.getItemsMoto().then((data) => setOptionsMoto(data));
  }, []);

  return (
    <div class="container">
      <h3 style={{ margin: "0px 0px 0px 29px " }}>
        Recherche une voiture a proximité
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

      <GoogleMaps
        options={options}
        motorisation={optionsMoto}
        latitude={state.lat}
        longitude={state.lng}
        setSelectedSort={setSelectedSort}
        cars={selectedSort}
      ></GoogleMaps>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: APIConfig.KEY_MAP,
})(App);
