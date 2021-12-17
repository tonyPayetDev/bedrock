import React, { useState, useEffect, Suspense } from "react";

import ListeAnnonce from "./components/ListeAnnonce";
import NbResultat from "./components/NbResultat";
import Text from "./components/Text";
import SelectBox from "./components/SelectBox";
import Map from './components/Map'
import Paginator from './components/Paginator';
import * as APIConfig from "./constants/APIConfig";
import { Animated } from "react-animated-css";
import ReactLoading from "react-loading";
// import ModelComponent from "./components/ModelComponent";

const App = (props) => {
  const { id } = props; // charge les paremetres au premier rechargement
  const [state, updateState] = React.useState({
    lat: -21,
    lng: 55.5,
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {},
    visible: false,

  });
  const [tab, setTab] = useState({});// # stock les filtre d'apres les type récupérer 
  let [tabDefault, setTabDefault] = useState({});// # stock les filtre d'apres les type récupérer 
  const [params, setParams] = useState(APIConfig.param(id)[0]);
  const fetchURL = `${params.API_URI}&`;
  //  todo data a renormer en data
  const [data, setData] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [url_construct, setUrlConstruct] = useState({});
  const [hidecontent, setHideContent] = useState("");
  let [page, setPage] = useState(1);
  let [valueMapLeft, setvalueMapLeft] = useState('49%');
  const [hidecontent_mobile, setHideContentMobile] = useState(true);


  params.type.map((data, index) => {
    var value = APIConfig.url_const.searchParams.get(data.name);
    if (value) { // on récupére si fais partie des filtres elementor
      tab[data.name] = value;
    }
    tabDefault[data.name] = { name: data.name, label: value, value: value, active: true } // tableau qui remplis les valeurs par defaut lors de la rdirection vers page recherche recupere 

  });
  const style = {
    backgroundColor: params.color ? params.color : "#ffffff",
    display: params.ekit_search_btn ? "" : "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "14px",
    boxShadow: "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px"
  };
  const style_invers = {
    backgroundColor: "white",
    borderRadius: "4px",
    color: params.color ? params.color : "#ffffff",
    fontSize: "15px"
  };

  const stylecriteres = {
    borderRadius: "20px 20px 20px 20px",
    color: !params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "black",

  };

  const stylemenu = {
    display: params.ekit_alerte_btn ? "" : "none",
    borderRadius: "20px 20px 20px 20px",
    color: params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "#ffffff",

  };

  function MouseOverOpacity(event) {
    event.target.style.filter = " saturate(1.2)";
  }
  function MouseOutOpacity(event) {
    event.target.style.filter = "saturate(1)";
  }
  const StyleMapOverflow = { "overflow": "auto", height: '70vh' }
  const StyleMapOverflowhidden = { "overflow": "hidden" }// active overflow si map activer ou pas

  useEffect((event) => {
    if (hidecontent == "liste_mobile") {
      console.log(hidecontent_mobile);

      setHideContentMobile(true)
    }
    if (hidecontent == "carte_mobile") {
      console.log(hidecontent_mobile);
      setHideContentMobile(false)

    }
    if (hidecontent == "carte") {
      params.ekit_map_btn = 'yes';
      setParams(params);
      APIConfig.getItems(fetchURL + new URLSearchParams(tab)).then((data) => setSelectedSort(data));

    }
    if (hidecontent == "galerie") {
      params.ekit_map_btn = '';
      setParams(params);
      APIConfig.getItems(fetchURL + new URLSearchParams(tab)).then((data) => setSelectedSort(data));

    }
    if (params.first_load) {
      APIConfig.getItems(fetchURL + new URLSearchParams(tab)).then((data) => setSelectedSort(data));
    }

  }, [hidecontent]);
  // affiche ou cache la maps
  let col = "col-" + params.col_heading_text;
  return (
    <div style={{ fontFamily: params.ekit_wb_3976_font, fontSize: 14 }} >
      <h3>
        <div className="row  justify-content-center ">
          <Text
            data={selectedSort} text={url_construct} params={params} style={style}
          ></Text>
          {params.ekit_menu_active && (

            <div className={col} style={{ fontSize: params.fontSize }}>
              <div className="row justify-content-end">
                {/* desactive la maps sous format mobile <a type="button" className="btn d-lg-none  " onClick={(e) => setHideContent('liste_mobile')} style={!hidecontent_mobile ? stylecriteres : stylemenu}>Liste </a> */}
                {/* desactive car manque de visibilité sur telephone infowindow */}
                {/* <a type="button" className="btn d-lg-none  mr-2 " onClick={(e) => setHideContent('carte_mobile')} style={hidecontent_mobile ? stylecriteres : stylemenu}>Carte </a> */}

                <a type="button" className="btn d-none d-lg-block   " onClick={(e) => setHideContent('carte')} style={params.ekit_map_btn ? stylemenu : stylecriteres}>Carte </a>
                <a type="button" className="btn  d-none d-lg-block  mr-2 " onClick={(e) => setHideContent('galerie')} style={params.ekit_map_btn ? stylecriteres : stylemenu}>Galerie </a>
              </div>

            </div>
          )}

        </div>
      </h3 >


      <div className="row  justify-content-center ">
        <div className="col-12  ">
          <SelectBox
            id="1"
            setSelectedSort={setSelectedSort}
            setUrlConstruct={setUrlConstruct}
            url_construct={url_construct}
            data={data}
            state={state}
            params={params}
            fetchURL={fetchURL}
            style_invers={style_invers}
            stylecriteres={stylecriteres}
            tabDefault={tabDefault}
            setTabDefault={setTabDefault}
          ></SelectBox>
        </div>

      </div>
      {
        !params.search_text ?
          <NbResultat
            style={{
              color: params.color, fontSize: '13px', marginLeft: '1.5rem'
            }}
            params={params}
            loading={false}
            options="1"
            data={selectedSort}
          ></NbResultat> : ""
      }
      <div className="row justify-content-center">

        <div className="col-md-5   mt-3 ">
          <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={2000} animationOutDuration={2000} >
            <a type="button" href={params.url + '?' + new URLSearchParams(url_construct)} onMouseOver={MouseOverOpacity} onMouseOut={MouseOutOpacity} className="btn btn-block  btn-lg " style={style}>
              <NbResultat paren
                params={params}
                data={selectedSort}

              ></NbResultat>
            </a>
          </Animated>
        </div>

      </div>

      {
        params.visible ?
          <div className="row " style={params.ekit_map_btn ? StyleMapOverflow : StyleMapOverflowhidden}>

            <div className={params.ekit_map_btn ? ' d-none d-lg-block col-lg-6 col-md-12 col-xs-12 ' : '  d-none d-lg-block col-lg-12 col-md-12 col-xs-12 sticky-top'} >
              {selectedSort ? "" : <div className="col-12 d-flex justify-content-center" >  <ReactLoading type='bubbles' color={params.color} /></div >}

              <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} animationOutDuration={1000} >
                < ListeAnnonce
                  params={params}
                  latitude={state.lat}
                  longitude={state.lng}
                  setSelectedSort={setSelectedSort}
                  data={selectedSort}
                  page={page}
                  setPage={setPage}
                  disable_even={false}
                ></ListeAnnonce>

              </Animated>
            </div>
            {/* desactive even odd sur format mobile */}
            <div className={params.ekit_map_btn ? ' d-lg-none col-12 col-lg-12 col-md-12 col-xs-12 ' : ' d-lg-none col-lg-12 col-md-12 col-xs-12 sticky-top'} >
              {selectedSort ? "" : <div className="col-12 d-flex justify-content-center" >  <ReactLoading type='bubbles' color={params.color} /></div >}

              <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} animationOutDuration={1000} >
                < ListeAnnonce
                  disable_even_odd
                  params={params}
                  latitude={state.lat}
                  longitude={state.lng}
                  setSelectedSort={setSelectedSort}
                  data={selectedSort}
                  page={page}
                  setPage={setPage}
                  disable_even={true}

                ></ListeAnnonce>

              </Animated>
            </div>
            <div className="col-md-6   d-none d-lg-block " style={{ position: "absolute", left: valueMapLeft }}>
              {params.ekit_map_btn ?

                < Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0&libraries=visualization,drawing,geometry,places`}
                  loadingElement={<div style={{ height: '100%' }}> Loading... </div>}
                  containerElement={<div style={{ height: '70vh' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                  defaultOptions={{
                    scaleControl: true
                  }}

                  params={params}
                  fetchURL={fetchURL}
                  params={params}

                  setSelectedSort={setSelectedSort}
                  selectedSort={selectedSort}
                />
                : ""}
            </div>
            {hidecontent == "carte_mobile" ?
              <div className="col-md-6   " style={{ position: "absolute", zIndex: '2', margin: "auto", width: '122%', left: '-10%', right: '-10%' }}>
                < Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0&libraries=visualization,drawing,geometry,places`}
                  loadingElement={<div style={{ height: '100%' }}> Loading... </div>}
                  containerElement={<div style={{ height: '70vh' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                  defaultOptions={{
                    scaleControl: true
                  }}

                  params={params}
                  fetchURL={fetchURL}
                  params={params}

                  setSelectedSort={setSelectedSort}
                  selectedSort={selectedSort}
                />
              </div >
              : ""}
          </div >
          : ""
      }
      {
        selectedSort && params.visible && params.paginator && hidecontent !== "carte_mobile" ?

          < Paginator
            color={params.color} backgroundColor="white"
            params={params}
            data={selectedSort}
            nb_page_afficher={10}
            setPage={setPage}

          />

          : ""
      }
    </div >

  );
};

export default App;