import React from "react";

import { Map, InfoWindow, Marker } from "google-maps-react";
import InfoContent from "./InfoContent.js";
import DetailAnnonce from "./DetailAnnonce.js";

import * as APIConfig from "../constants/APIConfig";
import Icon from "../images/house.png";
import { Animated } from "react-animated-css";
import ReactLoading from "react-loading";

const ListeAnnonce = ({
  latitude,
  longitude,
  cars,
  setSelectedSort,
  params,
}) => {
  let renderAnnonce;
  const style = {
    backgroundColor: params.color ? params.color : "#ffffff",
    color: params.color ? params.color : "#ffffff",

  };
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
    renderAnnonce = cars['data'].map((annonce, index) => {
      if (annonce) {
        // check si il apparait dans les params
        annonce = params.post.map((post, index2) => {
          if (post.field) {
            return annonce = { "value": cars['data'][index][post.field], 'post': post, 'href': cars['data'][index][post.url] };
          }
        });
        return (
          < DetailAnnonce name={annonce} params={params} > </DetailAnnonce>
        );
      }
    });
  }
  return (

    <div>
      <div class="row">
        {renderAnnonce}
      </div>

    </div>

  );
};

export default ListeAnnonce;
