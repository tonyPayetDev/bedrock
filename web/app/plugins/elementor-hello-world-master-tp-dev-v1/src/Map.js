import React, { useState, useRef } from "react";
import {
    Marker,
    GoogleMap,
    withScriptjs,
    withGoogleMap
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import Icon from "./images/logo.png";

// import SearchBox from "./components/SearchBox";
import MarkerCarrierIcon from "./components/MarkerCarrierIcon";
//import list from "./list";

const Map = withScriptjs(
    withGoogleMap((props) => {
        const mapRef = useRef(null);
        const [zoom, setZoom] = useState(10.3);
        const [marker, setMarker] = useState({ hasMarker: false, position: {} });
        const [center, setCenter] = useState({ lat: -21.1, lng: 55.5 });
        let tab = [];
        var url = new URL(document.location.href);

        let url_icon = url.origin + "/app/plugins/elementor-hello-world-master-tp-dev-v1/build/" + Icon

        console.log(url.origin);
        if (props.selectedSort) {
            console.log(props.selectedSort['map']);
            Object.values(props.selectedSort['map']).map((value, index) => {
                Object.values(value).map((value2, index) => {
                    tab.push(value2)
                });
            });

        }
        const handlePlacesChanged = (place) => {
            setZoom(16);
            setCenter({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
            setMarker({
                hasMarker: true,
                position: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
            });
        };

        return (
            <GoogleMap
                zoom={zoom}
                ref={mapRef}
                center={center}
                defaultOptions={props.defaultOptions}
                onDragEnd={() => setCenter(mapRef.current.getCenter())}
                onZoomChanged={() => setZoom(mapRef.current.getZoom())}
            >
                {/* <SearchBox onPlacesChanged={handlePlacesChanged} />
        {marker.hasMarker && <Marker position={marker.position} />} */}

                <MarkerClusterer
                    averageCenter
                    calculator={markerClustererCalculator}
                    gridSize={30}
                // icon={{// todo changer imagr cluster
                //     url: url_icon
                // }}
                >
                    {tab.map((lac, index) => (

                        <MarkerCarrierIcon key={index} lac={lac} url_icon={url_icon} />
                    ))}
                </MarkerClusterer>
            </GoogleMap>
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
