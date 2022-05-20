import React, { useState, useRef } from "react";
import DetailAnnonce from "./DetailAnnonce.js";
import Slider from "react-slick";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    InfoWindow
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import Icon1 from "../images/maps-koytcha-zoom.png";
import Icon2 from "../images/maps-koytcha.png";
import MarkerCarrierIcon from "./under-component/MarkerCarrierIcon";

function SampleNextArrow(props) {
    const { className, style, onClick, color } = props;
    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "block", color: color, zIndex: 1, fontSize: "24px", float: "right", marginTop: "36px" }}><i aria-hidden="true" class="fas fa-arrow-circle-right"></i>  </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick, color } = props;
    return (

        <div className={className} onClick={onClick} style={{ ...style, display: "block", color: color, float: "left", zIndex: 1, fontSize: "24px", transform: "translateY(50%)", }}
        ><i aria-hidden="true" class="fas fa-arrow-circle-left"></i>  </div>

    );
}
const Map = withScriptjs(
    withGoogleMap((props) => {
        const { params, defaultOptions, highlightSpot, selectedSort } = props;


        var settings = {
            dots: false,
            lazyLoad: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2500,
            pauseOnHover: true,
            nextArrow: <SampleNextArrow color={params.color} />,
            prevArrow: <SamplePrevArrow color={params.color} />,
        };

        const mapRef = useRef(null);
        const [zoom, setZoom] = useState(10);
        const [marker, setMarker] = useState({ hasMarker: false, position: {} });
        const [center, setCenter] = useState({ lat: -21.1, lng: 55.5 });
        const [tab_infoWindow, setTabInfoWindow] = useState({});
        const [state, setState] = React.useState({
            isOpen: false,
            position: 0,
            tab_infoWindow: ""
        });

        let tab = [];
        var url = new URL(document.location.href);
        let url_icon2 = url.origin + "/app/plugins/elementor-search-react-ktp-v2/build/" + Icon1
        let url_icon3 = url.origin + "/app/plugins/elementor-search-react-ktp-v2/build/" + Icon2


        if (selectedSort) {
            if (selectedSort['count'] != 0) {
                const select = selectedSort['data'];
                Object.values(select).map((value, index) => {
                    Object.values(value).map((value2, index) => {
                        tab.push(value2)
                    });
                });
            }
        }

        let renderInfo
        const onMarkerClustererClick = (markerClusterer) => {
            const m = markerClusterer.getMarkers();
            setState({
                isOpen: false,
                position: 0,
                tab_infoWindow: "",
            });

            if (m.length) {
                for (let i in m) {

                    let data = JSON.parse(m[i].icon.data);
                    tab_infoWindow[i] = data;

                    setState({
                        isOpen: true,
                        position: m[i].position,

                        tab_infoWindow: tab_infoWindow,
                    });

                }
            }

        };
        let nb_annonce = "";
        if (state.tab_infoWindow) {
            const annonce = Object.values(state.tab_infoWindow);
            nb_annonce = annonce.length;
            renderInfo = annonce.map((annonce, index) => {
                return <div class={params.ekit_map_btn ? 'col-lg-12 col-md-12 col-xs-12  ' : params.col_post}  >
                    < DetailAnnonce name={annonce} params={params} index={index} disable_even_odd > </DetailAnnonce>
                </div>
            })
        }
        const swiper = <Slider  {...settings}>
            {renderInfo}

        </Slider >
        const handleToggleClose = (event) => {
            setState({
                isOpen: false,
                position: 0,
                tab_infoWindow: "",
            });
            setTabInfoWindow({});
        }
        const color_img = "#54595f";

        return (
            <GoogleMap

                options={{
                    minZoom: 5,
                    maxZoom: 11.5,
                }}
                zoom={zoom}
                ref={mapRef}
                center={center}
                defaultOptions={defaultOptions}
                onDragEnd={() => setCenter(mapRef.current.getCenter())}
                onZoomChanged={() => setZoom(mapRef.current.getZoom())}
            >

                < MarkerClusterer
                    averageCenter
                    calculator={markerClustererCalculator}
                    gridSize={30}
                    maxZoom={15} // maxZoom set when clustering will stop
                    // minimumClusterSize={8}
                    onClick={onMarkerClustererClick}

                    styles={[
                        {

                            url: url_icon3,
                            height: 40,
                            width: 40,
                            fontFamily: params.fontFamily,
                            textColor: color_img,
                        },
                        {
                            url: url_icon2,
                            height: 60,
                            width: 60,
                            fontFamily: params.fontFamily,
                            textColor: color_img,
                        }
                    ]}

                >
                    {
                        tab.map((lac, index) => (
                            < MarkerCarrierIcon
                                highlightSpot={highlightSpot}
                                key={index}
                                lac={lac}
                                url_icon={url_icon3}
                                url_icon2={url_icon2}

                                params={params}
                            />
                        ))
                    }
                    {
                        state.isOpen &&
                        <InfoWindow
                            options={{
                                maxWidth: 460,
                                disableAutoPan: false,

                            }} pixelOffset={"0"} position={state.position} visible={state.isOpen}
                        >
                            {swiper ?
                                <div
                                >
                                    <a style={{ fontSize: "20px", color: params.color, position: "absolute", marginLeft: "-12px" }} onClick={handleToggleClose} draggable="false" aria-label="Fermer" title="Fermer" type="button" class="gm-ui-hover-effect text-right col-12" >
                                        <i class="fas fa-window-close"></i>

                                    </a>
                                    <div class="col-12  text-center" > <span style={{ color: params.color, fontSize: "17px" }}><span class="font-weight-bold"> {nb_annonce}</span> </span> annonces </div>

                                    <div class=" row justify-content-center">

                                        <div class="col-10 d-none d-lg-block ">
                                            <div class="text-center ">
                                                {swiper}
                                            </div>
                                        </div>
                                        <div class="col-12 d-lg-none  ">
                                            <div class="text-center ">
                                                {swiper}
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                : <div > </div>}
                        </InfoWindow>
                    }
                </MarkerClusterer >

            </GoogleMap >
        );
    })
);

export default Map;

// https://nooshu.github.io/blog/2012/10/03/marker-cluster-calculator-for-google-maps-v3/
const markerClustererCalculator = (markers, numStyles) => {

    const index = markers.find((marker) => marker.icon.condition) ? 2 : 1;
    return {
        index: index,
        text: markers.length
    };
};
