import React from "react";
import DetailAnnonce from "./DetailAnnonce.js";

const ListeAnnonce = ({
  latitude,
  longitude,
  data,
  setSelectedSort,
  setPage,
  params,
  page,
  disable_even
}) => {
  let renderAnnonce;
  const style = {
    backgroundColor: params.color ? params.color : "#ffffff",
    color: !params.color ? params.color : "#ffffff",
    zIndex: -1

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
  React.useEffect(
    (props) => {
      // si utilisateur filtre on passe le page a 1 
      setPage(1);

    },
    [data]
  );

  if (data) {
    if (data['count'] != 0) {
      console.log(page);

      renderAnnonce = data['data'][page].map((annonce, index) => {
        if (annonce) {
          return (

            <div class={params.ekit_map_btn ? 'col-lg-6 col-md-12 col-xs-12' : params.col_post}  >


              < DetailAnnonce name={annonce} params={params} index={index} disable_even_odd={disable_even}  > </DetailAnnonce>

            </div>
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
    </div >

  );
};

export default ListeAnnonce;
