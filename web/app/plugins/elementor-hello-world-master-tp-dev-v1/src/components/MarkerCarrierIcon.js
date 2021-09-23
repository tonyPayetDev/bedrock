/* global google */
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Marker } from 'react-google-maps'
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox'
import Icon from "../images/logo.png";

import {
    Alert as AlertOutlineIcon,
    CloseCircle as CloseOutlineIcon,
} from 'mdi-material-ui'

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
const MarkerCarrierIcon = ({ lac, handleClick, url_icon }) => {
    const classes = useStyles()
    let decalage = getRandomIntInclusive(0, 20) / 10000;

    let latitude = parseFloat(lac.longitude) + decalage;// inverser quand modif dina 
    let longitude = parseFloat(lac.latitude) + decalage;


    // console.log(latitude);
    // console.log(longitude);

    return (

        <Marker
            icon={{
                width: "10%",
                url: url_icon,//`/images/${lac.carrier.toLowerCase()}_bw.png`,
                anchor: window.google.maps.Point(16, 16),
                scaledSize: window.google.maps.Size(32, 32),
                condition: lac.condition,
            }}
            defaultPosition={{ lat: latitude, lng: longitude }}
            onClick={() => handleClick(lac)}
        />

    )
}

// const mapDispatchToProps = dispatch => ({
//   handleClick: lac => dispatch(ActionCreators.setPerimeterSelectedLac(lac))
// })

export default MarkerCarrierIcon
