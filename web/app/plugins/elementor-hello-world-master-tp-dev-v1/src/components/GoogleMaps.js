import React from "react";

import { Map, InfoWindow, Marker, Circle } from "google-maps-react";
import InfoContent from "./InfoContent.js";
import Icon from "../images/logo.png";
import * as APIConfig from "../constants/APIConfig";

const GoogleMaps = ({
  latitude,
  longitude,
  data,
}) => {
  let renderMarkers;
  let renderCircle;

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
  let nb_ville

  if (data) {
    if (data['count'] != 0) {


      const places = {
        id: 1,
        name: "Park Slope",
        latitude: "40.6710729",
        longitude: "-73.9988001",
        circle: {
          radius: 2000,
          options: {
            strokeColor: "#E6007E"
          }
        }
      }
      renderCircle = Object.values(data['map']).map((data_by_ville, index) => {

        return data_by_ville.map((data, index) => {
          let latitude = data.latitude;
          let longitude = data.longitude;
          if (index == 0) {

            return (
              <Circle
                strokeColor='#E6007E'
                strokeOpacity="0.8"
                onMouseover={() => console.log('mouseover')}
                onClick={() => console.log('click')}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                name='Test'
                fillColor='#E6007F'
                fillOpacity='0.3'
                center={{
                  lat: parseFloat(longitude),
                  lng: parseFloat(latitude)
                }
                }
                radius={2000}
              />
            )
          }
        });
      });

      renderMarkers = Object.values(data['map']).map((data_by_ville, index) => {
        nb_ville = data_by_ville.length;
        return data_by_ville.map((data, index) => {
          let latitude = data.latitude; //Math.round(data.latitude * 100) / 100;
          let longitude = data.longitude;//Math.round(data.longitude * 100) / 100;

          if (index == 0) {


            return (

              <Marker
                icon={{
                  width: "10%",
                  url: " ", //"http://localhost:8000/app/plugins/elementor-hello-world-master-tp-dev-v1/build/" + Icon,
                  anchor: window.google.maps.Point(16, 16),
                  scaledSize: window.google.maps.Size(32, 32),
                }}
                key={index}
                id={index}
                position={{
                  lng: latitude,
                  lat: longitude,

                }}


                // color="red"
                title={data.reference + " " + data.ville + " " + data.code_postal}
                name={{
                  marque: data.bien_type,
                  // type: data.type,
                  model: data.ville,
                  img: data.photos,
                  adresse: data.code_postal,
                }}
                onClick={onMarkerClick}
                label={{
                  color: '#000', fontSize: '12px', fontWeight: '600',
                  text: nb_ville + ""
                }}
              />
              // <Marker
              //   icon={{
              //     width: "10%",
              //     // url: "",//"app/plugins/react-plugin/build/" + Icon,
              //     url: "http://localhost:8000/app/plugins/elementor-hello-world-master-tp-dev-v1/build/" + Icon,
              //     anchor: window.google.maps.Point(16, 16),
              //     scaledSize: window.google.maps.Size(32, 32),
              //   }}
              //   key={index}
              //   id={index}
              //   position={{
              //     lat: data.latitude,
              //     lng: data.longitude,
              //   }}
              // // title={data.ville + " " + data.code_postal}
              // // name={{
              // //   marque: data.ville,
              // //   // type: data.type,
              // //   model: data.ville,
              // //   img: data.photo,
              // //   adresse: data.code_postal,
              // // }}
              // // color="red"
              // onClick={onMarkerClick}
              // />
            );
          }
        });
      });
    }
  }


  return (
    <div>
      {
        < Map
          style={{ margin: "0px 0px 0px 29px ", width: "81%", height: "85%" }}
          google={window.google}
          zoom={APIConfig.Zoom}
          center={{ lat: latitude, lng: longitude }}
        >
          {renderMarkers}
          {renderCircle}

          {/* <Circle
            strokeColor='#E6007E'
            strokeOpacity="0.8"
            text='Test'
            center={{
              lat: parseFloat(latitude),
              lng: parseFloat(longitude)
            }}
            radius={places.circle.radius}
          /> */}
          {/* <Marker
            icon={{
              width: "10%",
              url: "http://localhost:8000/app/plugins/elementor-hello-world-master-tp-dev-v1/build/" + Icon,
              // url: "https://w7.pngwing.com/pngs/316/295/png-transparent-google-map-icon-computer-icons-google-maps-google-map-maker-center-angle-heart-desktop-wallpaper.png",
              anchor: window.google.maps.Point(16, 16),
              scaledSize: window.google.maps.Size(32, 32),
            }}
            position={{
              lat: -21,
              lng: 55.5,
            }}
            text="My Marker"
          /> */}

          < InfoWindow
            pixelOffset={"0"}
            marker={state.activeMarker}
            visible={state.showingInfoWindow}
            onClose={onClose}

          >

            <InfoContent name={state.selectedPlace.name}> </InfoContent>
          </InfoWindow >
        </Map >

      }


    </div >
  );
};

export default GoogleMaps;
