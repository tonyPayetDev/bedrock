import React, { useState, useRef } from "react";
// import Swiper core and required modules
// Import Swiper React components
import { Animated } from "react-animated-css";

import DetailAnnonce from "./DetailAnnonce.js";
import Slider from "react-slick";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

// Import Swiper styles
import "swiper/components/pagination"
import "swiper/components/navigation"

// import "./styles.css";



// import Swiper core and required modules
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

import {
    Marker,
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    InfoWindow
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import Icon from "../images/logo.png";
import InfoContent from "./InfoContent.js";

// import SearchBox from "./components/SearchBox";
import MarkerCarrierIcon from "./MarkerCarrierIcon";
function SampleNextArrow(props) {
    const { className, style, onClick, color } = props;
    console.log(color);
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
//import list from "./list";
const Map = withScriptjs(
    withGoogleMap((props) => {

        let params = props.params;
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
        const [zoom, setZoom] = useState(10.3);
        const [marker, setMarker] = useState({ hasMarker: false, position: {} });
        const [center, setCenter] = useState({ lat: -21.1, lng: 55.5 });
        const [tab_infoWindow, setTabInfoWindow] = useState({});
        const [state, setState] = React.useState({
            isOpen: false,
            position: 0,
            tab_infoWindow: ""
        });
        const [selectedSortMap, setSelectedSortMap] = useState({ "data": "" });

        let tab = [];
        var url = new URL(document.location.href);
        let url_icon = url.origin + "/app/plugins/elementor-hello-world-master-tp-dev-v1/build/" + Icon
        if (props.selectedSortMap) {
            Object.values(props.selectedSortMap['data']).map((value, index) => {
                Object.values(value).map((value2, index) => {
                    tab.push(value2)
                });
            });
        }
        if (props.selectedSort) {
            const select = props.selectedSort['data'];
            Object.values(select).map((value, index) => {
                Object.values(value).map((value2, index) => {
                    tab.push(value2)
                });
            });

        }


        // const handlePlacesChanged = (place) => {
        //     setZoom(16);
        //     setCenter({
        //         lat: place.geometry.location.lat(),
        //         lng: place.geometry.location.lng()
        //     });
        //     setMarker({
        //         hasMarker: true,
        //         position: {
        //             lat: place.geometry.location.lat(),
        //             lng: place.geometry.location.lng()
        //         }
        //     });
        // };
        const OPTIONS = {
            minZoom: 8,
            maxZoom: 13,
        }

        let renderInfo;

        const onMarkerClustererClick = (markerClusterer) => {
            const m = markerClusterer.getMarkers();
            setState({
                isOpen: false,
                position: 0,
                tab_infoWindow: "",
            });

            if (m.length) {
                for (let i in m) {
                    let data = JSON.parse(m[i].getTitle());
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
        // const swiper = <Swiper
        //     centeredSlides={true}
        //     roundLengths={true}
        //     loop={true}
        //     lazy={true}
        //     preloadImages={true}
        //     loopAdditionalSlides={30}
        //     navigation={{
        //         nextEl: ".swiper-button-next",
        //         prevEl: ".swiper-button-prev"
        //     }

        //     }
        //     autoplay={{
        //         "delay": 3000,
        //         "disableOnInteraction": true
        //     }
        //     } pagination={{
        //         "clickable": false
        //     }} navigation={true} className="mySwiper" >
        //     {renderInfo}
        // </Swiper >;
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


        return (
            <GoogleMap

                options={OPTIONS}
                zoom={zoom}
                ref={mapRef}
                center={center}
                defaultOptions={props.defaultOptions}
                onDragEnd={() => setCenter(mapRef.current.getCenter())}
                onZoomChanged={() => setZoom(mapRef.current.getZoom())}
            >
                {/* <SearchBox onPlacesChanged={handlePlacesChanged} />
                {marker.hasMarker && <Marker position={marker.position} />} */}

                < MarkerClusterer
                    averageCenter
                    calculator={markerClustererCalculator}
                    gridSize={30}
                    maxZoom={15} // maxZoom set when clustering will stop
                    // minimumClusterSize={8}
                    onClick={onMarkerClustererClick}

                // styles={[
                //     {
                //         url: "/img/map-cluster/m1.png",
                //         height: 26,
                //         width: 26,
                //         fontFamily: "Lato",
                //         textColor: "#FFF",
                //     },
                //     {
                //         url: "/img/map-cluster/m2.png",
                //         height: 29,
                //         width: 29,
                //         fontFamily: "Lato",
                //         textColor: "#FFF",
                //     },
                //     {
                //         url: "/img/map-cluster/m3.png",
                //         height: 34,
                //         width: 34,
                //         fontFamily: "Lato",
                //         textColor: "#FFF",
                //     },
                //     {
                //         url: "/img/map-cluster/m4.png",
                //         height: 40,
                //         width: 40,
                //         fontFamily: "Lato",
                //         textColor: "#FFF",
                //     },
                //     {
                //         url: "/img/map-cluster/m5.png",
                //         height: 46,
                //         width: 46,
                //         fontFamily: "Lato",
                //         textColor: "#FFF",
                //     }
                // ]}
                // icon={{// todo changer imagr cluster
                //     url: url_icon
                // }}
                >
                    {
                        tab.map((lac, index) => (
                            < MarkerCarrierIcon key={index} lac={lac} url_icon={url_icon} params={params}
                            />
                        ))
                    }
                    {
                        state.isOpen &&
                        <InfoWindow

                            options={{
                                maxWidth: 460,
                            }} pixelOffset={"0"} position={state.position} visible={state.isOpen}
                        >
                            {swiper ?
                                <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={4000} animationOutDuration={2500} >
                                    <div >

                                        {/* <InfoContent name={state.selectedPlace.name}> </InfoContent> */}
                                        <a style={{ fontSize: "20px", color: params.color }} onClick={handleToggleClose} draggable="false" aria-label="Fermer" title="Fermer" type="button" class="gm-ui-hover-effect text-right col-12" >
                                            <i class="fas fa-window-close"></i>

                                        </a>
                                        <div class=" row justify-content-center">

                                            <div class="col-10 ">
                                                <div class="text-center ">

                                                    {swiper}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 m-2 text-center" > <span style={{ color: params.color, fontSize: "17px" }}><span class="font-weight-bold"> {nb_annonce}</span> </span> annonces </div>
                                    </div>

                                </Animated>
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
    const index = markers.find((marker) => marker.icon.condition === "anormal")
        ? 3
        : markers.find((marker) => marker.icon.condition === "alerta")
            ? 2
            : markers.find((marker) => marker.icon.condition === "normal")
                ? 1
                : 4;

    return {
        index: index,
        text: markers.length
    };
};
