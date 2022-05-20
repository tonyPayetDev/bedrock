import React, { useState, useEffect } from "react";
import ListeAnnonce from "./components/ListeAnnonce";
import Filter from "./components/Filter";
import Map from './components/Map'
import Paginator from './components/Paginator';

import NbResultat from "./components/NbResultat";
import Text from "./components/Text";
import * as APIConfig from "./constants/APIConfig";
import { style_button, style_critere, stylemenu } from "./constants/Css";

import { Animated } from "react-animated-css";
import ReactLoading from "react-loading";

const App = (props) => {
  const [params, setParams] = useState(APIConfig.param(props.id)[0]);

  const fetchURL = `${params.API_URI}&`;
  const HEADERS = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: params.Authorization,
  });
  const [tab, setTab] = useState({});// # stock les filtre d'apres les type récupérer 
  const [selectedSort, setSelectedSort] = useState();
  const [url_construct, setUrlConstruct] = useState({});
  const [hidecontent, setHideContent] = useState(true);
  let [page, setPage] = useState(1);
  let [valueMapLeft, setvalueMapLeft] = useState('49%');
  let [tabDefault, setTabDefault] = useState({});// # stock les filtre d'apres les type récupérer 
  let [highlightSpot, setHighlightSpot] = useState();

  params.type.map((data, index) => {
    var value = APIConfig.url_const.searchParams.get(data.name);
    if (value) { // on récupére si fais partie des filtres elementor
      tab[data.name] = value;
    }
    tabDefault[data.name] = { name: data.name, label: value, value: value, active: true } // tableau qui remplis les valeurs par defaut lors de la rdirection vers page recherche recupere 
  });

  function MouseOverOpacity(event) {
    event.target.style.filter = " saturate(1.2)";
  }
  function MouseOutOpacity(event) {
    event.target.style.filter = "saturate(1)";
  }

  useEffect((event) => {
    if (hidecontent == "liste_mobile") {
      setHideContent(true)
    }
    if (hidecontent == "carte_mobile") {
      setHideContent(false)
    }
    if (hidecontent == "carte") {
      params.ekit_map_btn = 'yes';
      setParams(params);
      APIConfig.getItems(fetchURL + new URLSearchParams(tab), HEADERS).then((data) => setSelectedSort(data));

    }
    if (hidecontent == "galerie") {
      params.ekit_map_btn = '';
      setParams(params);
      APIConfig.getItems(fetchURL + new URLSearchParams(tab), HEADERS).then((data) => setSelectedSort(data));

    }
    if (params.first_load) {
      APIConfig.getItems(fetchURL + new URLSearchParams(tab), HEADERS).then((data) => setSelectedSort(data));
    }

  }, [hidecontent]);

  return (
    <div style={{ fontFamily: params.ekit_wb_3976_font, fontSize: 14 }} >
      <h3>
        <div className="row  justify-content-center ">
          <Text
            data={selectedSort} text={url_construct} params={params} style={style_button(params)}
          ></Text>
          {params.ekit_menu_active && (

            <div className={"col-" + params.col_heading_text} style={{ fontSize: params.fontSize }}>
              <div className="row justify-content-end">
                <a type="button" className="btn d-none d-lg-block   "
                  onClick={(e) => setHideContent('carte')}
                  style={params.ekit_map_btn ? stylemenu(params) : style_critere(params)}>
                  Carte
                </a>
                <a type="button" className="btn  d-none d-lg-block  mr-2 "
                  onClick={(e) => setHideContent('galerie')}
                  style={params.ekit_map_btn ? style_critere(params) : stylemenu(params)}>
                  Galerie </a>
              </div>

            </div>
          )}

        </div>
      </h3 >


      <div className="row  justify-content-center ">
        <div className="col-12  ">
          <Filter
            HEADERS={HEADERS}
            id="1"
            setSelectedSort={setSelectedSort}
            setUrlConstruct={setUrlConstruct}
            url_construct={url_construct}
            params={params}
            fetchURL={fetchURL}
            tabDefault={tabDefault}
          ></Filter>
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
            <a type="button"
              href={params.url + '?' + new URLSearchParams(url_construct)} onMouseOver={MouseOverOpacity} onMouseOut={MouseOutOpacity}
              className="btn btn-block  btn-lg "
              style={style_button(params)}>

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
          <div className="row " id="scroll" style={params.ekit_map_btn ? { "overflow": "auto", height: '70vh' } : { "overflow": "hidden" }}>

            <div className={params.ekit_map_btn ? ' d-none d-lg-block col-lg-6 col-md-12 col-xs-12 ' : '  d-none d-lg-block col-lg-12 col-md-12 col-xs-12 sticky-top'} >
              {selectedSort ? "" : <div className="col-12 d-flex justify-content-center" >  <ReactLoading type='bubbles' color={params.color} /></div >}

              <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={1000} animationOutDuration={1000} >
                < ListeAnnonce
                  setHighlightSpot={setHighlightSpot}
                  params={params}

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
                  setHighlightSpot={setHighlightSpot}
                  disable_even_odd
                  params={params}
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
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=` + params.key_map + `&libraries=visualization,drawing,geometry,places`}
                  loadingElement={<div style={{ height: '100%' }}> Loading... </div>}
                  containerElement={<div style={{ height: '70vh' }} />}
                  mapElement={<div style={{ height: '100%' }} />}

                  highlightSpot={highlightSpot}
                  defaultOptions={{
                    scaleControl: true
                  }}
                  params={params}
                  selectedSort={selectedSort}
                />
                : ""}
            </div>
            {hidecontent == "carte_mobile" ?
              <div className="col-md-6   " style={{ position: "absolute", zIndex: '2', margin: "auto", width: '122%', left: '-10%', right: '-10%' }}>
                < Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=` + params.key_map + `&libraries=visualization,drawing,geometry,places`}
                  loadingElement={<div style={{ height: '100%' }}> Loading... </div>}
                  containerElement={<div style={{ height: '70vh' }} />}
                  mapElement={<div style={{ height: '100%' }} />}

                  highlightSpot={highlightSpot}
                  defaultOptions={{
                    scaleControl: true
                  }}
                  params={params}
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
            color={params.color}
            backgroundColor="white"
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