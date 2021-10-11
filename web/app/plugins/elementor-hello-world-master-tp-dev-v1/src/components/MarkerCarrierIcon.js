/* global google */
import React from 'react'
import DetailAnnonce from "./DetailAnnonce.js";

import { makeStyles } from '@material-ui/styles'
import { Marker, InfoWindow } from 'react-google-maps'

const useStyles = makeStyles({
    alertIcon: {
        color: '#ff7800',
    },
    defectiveIcon: {
        color: 'red',
    },
})
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const MarkerCarrierIcon = ({ lac, onMarkerClick, url_icon, params }) => {
    const classes = useStyles()
    const [selectedPoint, setselectedPoint] = React.useState(null);
    const [state, setState] = React.useState({
        isOpen: false
    });
    const handleToggleOpen = () => {

        setState({
            isOpen: true
        });
    }

    const handleToggleClose = () => {
        setState({
            isOpen: false
        });
    }

    let decalage = getRandomIntInclusive(0, 20) / 1000;
    let latitude = parseFloat(lac.longitude)// + decalage;// inverser quand modif dina 
    let longitude = parseFloat(lac.latitude) //+ decalage;
    let index = String(lac.id);
    return (

        <Marker
            // label={label}
            onClick={() => handleToggleOpen()}
            // title={JSON.stringify(lac)}
            position={{ lat: latitude, lng: longitude }}
            icon={{
                width: "10%",
                url: url_icon,//`/images/${lac.carrier.toLowerCase()}_bw.png`,
                data: JSON.stringify(lac),// passe les data ici car pas d'autre moyen avant passer dans title
                anchor: window.google.maps.Point(16, 16),
                scaledSize: window.google.maps.Size(32, 32),
            }}
            name={{
                marque: lac.bien_type,
                // type: data.type,
                model: lac.ville,
                img: lac.photos,
                adresse: lac.code_postal,
            }}
            defaultPosition={{ lat: latitude, lng: longitude }}
        // onClick={() => handleClick(lac)}
        >

            {
                state.isOpen &&
                <InfoWindow options={{
                    maxWidth: 460,

                }} pixelOffset={"0"} position={state.position} visible={state.isOpen} >
                    <div class="row text-right">
                        <div class="col-lg-12 col-md-12 col-xs-12">

                            <a style={{ fontSize: "20px", color: params.color }} onClick={handleToggleClose} draggable="false" aria-label="Fermer" title="Fermer" type="button" class="gm-ui-hover-effect  " >
                                <i class="fas fa-window-close"></i>

                            </a>
                        </div>
                        <div class={params.ekit_map_btn ? 'col-lg-12 col-md-12 col-xs-12 ' : params.col_post}  >
                            < DetailAnnonce name={lac} params={params} index={index} disable_even_odd > </DetailAnnonce>
                        </div>

                    </div>

                </InfoWindow>
            }

        </Marker >

    )
}


export default MarkerCarrierIcon
