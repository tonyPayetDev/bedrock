import React from "react";

import { Map, InfoWindow, Marker } from "google-maps-react";
import InfoContent from "./InfoContent.js";
import DetailAnnonce from "./DetailAnnonce.js";

import * as APIConfig from "../constants/APIConfig";
import Icon from "../images/house.png" ;

const ListeAnnonce = ({
  latitude,
  longitude,
  cars,
  options,
  motorisation,
  setSelectedSort,
}) => {
  let renderMarkers;

  const [state, setState] = React.useState({
    lat: -21,
    lng: 55.5,
    stores: [],
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: { marque: "", motorisation: "", model: "" },
  });
  const onMarkerClick = (props, marker, e) =>
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  const onClose = (props) => {
    if (state.showingInfoWindow) {
      setState({
        selectedPlace: "",
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  if (cars) {
    console.log(  cars);

    renderMarkers = cars.map((data, index) => {
      console.log(  data);

      // const type = options
      //   .filter((options) => options.value == data.type)
      //   .map((options) => options.label)[0];
      // const moto = motorisation
      //   .filter((motorisation) => motorisation.value == data.motorisation)
      //   .map((motorisation) => motorisation.label)[0];
      return (
      
        <DetailAnnonce data={data}  name= {data}  > </DetailAnnonce>

      );
    });
  }

  return (
    <div> 
    
     {renderMarkers}

     </div>    

  );
};

export default ListeAnnonce;
