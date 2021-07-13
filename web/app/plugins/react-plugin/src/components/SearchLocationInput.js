import React from "react";
import { perimetre_long, perimetre_lat } from "../constants/APIConfig";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function SearchLocationInput({
  state,
  updateState,
  cars,
  setSelectedSort,
}) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };
  React.useEffect(
    (props) => {
      // rechercher par type

      if (cars) {
        const filtre_perimetre = cars
          .filter(
            (cars) =>
              state.lat + perimetre_lat >= cars.latitude &&
              state.lat - perimetre_lat <= cars.latitude
          )
          .filter(
            (cars) =>
              state.lng + perimetre_long >= cars.longitude &&
              state.lng - perimetre_long <= cars.longitude
          )
          .map((cars) => cars);

        // // setCarsPerimetre(filtre_perimetre);
        setSelectedSort(filtre_perimetre);
      }
    },
    [state]
  );
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div class="row justify-content-center m-4 fontsize-p">
              <div class="col-8 arrondie_g">
                <label for="formGroupExampleInput" class="fontsize-p">
                  Lieux de prise en charge
                </label>

                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  {...getInputProps({ placeholder: "Saisissez une adresse" })}
                />
              </div>
              <div class="col-4">
                <button
                  class="btn btn-success"
                  onClick={() =>
                    updateState({
                      lat: coordinates.lat,
                      lng: coordinates.lng,
                    })
                  }
                >
                  Rechercher
                </button>
              </div>
            </div>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#32B298" : "#fff",
                  color: "#252525",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <hr
        style={{ margin: "0px 0px 0px 26px ", width: "95.5%", color: "grey" }}
      ></hr>
    </div>
  );
}
