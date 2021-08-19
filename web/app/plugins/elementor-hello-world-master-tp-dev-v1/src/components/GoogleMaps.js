import React from "react";

import { Map, InfoWindow, Marker } from "google-maps-react";
import InfoContent from "./InfoContent.js";
import Icon from "../images/house.png";
import * as APIConfig from "../constants/APIConfig";

const GoogleMaps = ({
  latitude,
  longitude,
  cars,
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
  console.log(cars);
  if (cars) {
    renderMarkers = cars['data'].map((data, index) => {

      //    console.log("app/plugins/react-plugin/build"+Icon);
      return (
        <Marker
          icon={{
            width: "10%",
            url: "app/plugins/react-plugin/build/" + Icon,
            anchor: window.google.maps.Point(16, 16),
            scaledSize: window.google.maps.Size(32, 32),
          }}
          key={index}
          id={index}
          position={{
            lat: data.latitude,
            lng: data.longitude,
          }}
          title={data.ville + " " + data.code_postal}
          name={{
            marque: data.ville,
            // type: data.type,
            model: data.ville,
            img: data.photo,
            adresse: data.code_postal,
          }}
          color="red"
          onClick={onMarkerClick}
        />
      );
    });
  }

  return (
    <Map
      style={{ margin: "0px 0px 0px 29px ", width: "81%", height: "65%" }}
      google={window.google}
      zoom={APIConfig.Zoom}
      center={{ lat: latitude, lng: longitude }}
    >
      {renderMarkers}

      <InfoWindow
        marker={state.activeMarker}
        visible={state.showingInfoWindow}
        onClose={onClose}
      >
        <InfoContent name={state.selectedPlace.name}> </InfoContent>
      </InfoWindow>
    </Map>
  );
};

export default GoogleMaps;
