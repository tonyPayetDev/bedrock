import { GoogleApiWrapper } from "google-maps-react";
import GoogleMaps from "./components/GoogleMaps";
import ListeAnnonce from "./components/ListeAnnonce";

import SearchLocationInput from "./components/SearchLocationInput";
import SelectBox from "./components/SelectBox";
import NbResultat from "./components/NbResultat";
import Text from "./components/Text";

import { Animated } from "react-animated-css";

import React, { useState, useEffect } from "react";
import * as APIConfig from "./constants/APIConfig";
import ReactLoading from "react-loading";

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
  let text;
  const [tab, setTab] = useState({});// # stock les filtre d'apres les type récupérer 

  const [params, setParams] = useState(APIConfig.params);

  params.type.map((data, index) => {
    var secteur = APIConfig.url_const.searchParams.get(data.name);
    if (secteur) { // on récuper si l'info et présente
      tab[data.name] = secteur;
    }
  });

  const style = {
    backgroundColor: params.color ? params.color : "#ffffff",
    display: params.ekit_search_btn ? "" : "none",
    "border-radius": "1px 1px 1px 1px",
    color: "white",

  };

  const stylecriteres = {
    display: params.ekit_alerte_btn ? "" : "none",
    "border-radius": "20px 20px 20px 20px",
    color: !params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "black",

  };

  const stylealerte = {
    backgroundColor: params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "#ffffff",
    display: params.ekit_alerte_btn ? "" : "none",
    "border-radius": "20px 20px 20px 20px",
    color: "white",


  };
  const stylemenu = {
    display: params.ekit_alerte_btn ? "" : "none",
    "border-radius": "20px 20px 20px 20px",
    color: params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "#ffffff",

  };
  const styleContactPro = {
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: !params.color ? params.color : "white",
    color: params.color ? params.color : "white",
    fontSize: "14px",

  };
  const divStyle = {
    display: "none",
  };
  const [cars, setCars] = useState();
  const [selectedSort, setSelectedSort] = useState();

  const [optionsMoto, setOptionsMoto] = useState([]);
  const [options, setOptions] = useState([]);
  const [url_construct, setUrlConstruct] = useState({ prestation_type: "", secteur: "" });
  const [text2, setText] = useState([]);
  const [hidecontent, setHideContent] = useState("");

  console.log(params);
  useEffect((event) => {
    console.log(hidecontent);
    if (hidecontent == "carte") {
      params.ekit_map_btn = 'yes';
      setParams(params);

    }
    if (hidecontent == "galerie") {
      params.ekit_map_btn = '';

      setParams(params);

    }

    APIConfig.getItems(tab).then((data) => setSelectedSort(data));

  }, [hidecontent]);


  // affiche ou cache la maps

  return (
    <div style={{ fontFamily: params.ekit_wb_3976_font, fontSize: 14 }}  >

      <h3>

        <div class="row">
          <div class="col-6">

            <Text
              data={selectedSort} text={url_construct}
            ></Text>

          </div>
          <div class="col-6 " style={{ fontSize: params.fontSize }}>
            <div class="row justify-content-end">

              <a type="button" class="btn   " onClick={(e) => setHideContent('carte')} style={params.ekit_map_btn ? stylemenu : stylecriteres}>Carte </a>
              <a type="button" class="btn  mr-2 " onClick={(e) => setHideContent('galerie')} style={params.ekit_map_btn ? stylecriteres : stylemenu}>Galerie </a>
            </div>

          </div>
        </div>

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

      <div class="row  m-1">
        <div class="col-6">
          <div class="row justify-content-end">

            <a type="button" href={params.url + '?' + new URLSearchParams(url_construct)} class="btn " style={stylecriteres}><i aria-hidden="true" class="icon icon-chevron-down"></i> + de criteres
            </a>
          </div >

        </div >
        <div class="col-6">
          <div class="row justify-content-end">

            <a type="button" href={params.url + '?' + new URLSearchParams(url_construct)} class="btn " style={stylealerte}><i aria-hidden="true" class="icon icon-alarm"></i> Créer une alerte
            </a>
          </div>

        </div>
      </div >

      <NbResultat
        data={selectedSort}
      ></NbResultat>
      <div class="row">

        <div class="col-12  justify-content-center ">
          <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={2000} animationOutDuration={2000} >
            <a type="button" href={params.url + '?' + new URLSearchParams(url_construct)} class="btn " style={style}> {params.search_text}
              <NbResultat paren
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
      <div class="row" style={params.visible ? null : divStyle} >
        {selectedSort ?
          <div class={params.ekit_map_btn ? 'col-6' : 'col-12'} >
            <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} animationOutDuration={1000} >

              < ListeAnnonce
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
          : <div class="col-6 d-flex justify-content-center" >  <ReactLoading type='bubbles' color={params.color} /></div >
        }
        <div class="col-md-6" style={params.ekit_map_btn ? null : divStyle} >
          <GoogleMaps
            style={{ margin: "400px" }}
            options={options}
            motorisation={optionsMoto}
            latitude={state.lat}
            longitude={state.lng}
            setSelectedSort={setSelectedSort}
            cars={selectedSort}
          ></GoogleMaps>
        </div>

      </div>

    </div >

  );
};

export default GoogleApiWrapper({
  apiKey: APIConfig.KEY_MAP,
})(App);
