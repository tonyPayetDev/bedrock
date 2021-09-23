import React from "react";

import DetailAnnonce from "./DetailAnnonce.js";

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
    color: !params.color ? params.color : "#ffffff",

  };
  const [state, setState] = React.useState({
    lat: -21,
    lng: 55.5,
    stores: [],
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: { marque: "", motorisation: "", model: "" },
  });
  let [cpt, setCpt] = React.useState(0);

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
    if (cars['count'] != 0) {
      renderAnnonce = cars['data'].map((annonce, index) => {
        if (annonce) {
          return (
            < DetailAnnonce name={annonce} params={params} index={index}  > </DetailAnnonce>
          );
        }
      });
    } else {
      // todo a voir si mettre dans component nbresultat
      renderAnnonce = <div class="row"><span class="col-6"> Desolé, nous avons aucune annonce qui correspond a votre recherche
      </span> <a class="col-6 btn " type="button" href="" style={style}> Prendre RDV avec un commercial
        </a></div>


    }
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
