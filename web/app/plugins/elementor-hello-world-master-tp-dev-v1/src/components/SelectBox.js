import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as APIConfig from "../constants/APIConfig";

const SelectBox = (props) => {
  const { options, optionsMoto, setSelectedSort, cars, state , params } = props;
  const [search, setSearch] = useState("");
  const [searchAddress, setSearchddress] = useState("");
  const [searchMoto, setSearchMoto] = useState("");
  const [optionsAdrr, setOptionsAdrr] = useState([]);
  const [tab, setTab] = useState({ "secteur":"", "prestation_type": "" ,"type":""  });

  let renderMarkers;
  var  animals = [];
  const count = animals.push(searchMoto);
 // const tab={ "secteur":"", "prestation_type": "" ,"type":""  } ;
  function test(searchMoto){
 
  }
  // filter
  useEffect(
    (props) => {
      // rechercher par type

      if (search && searchAddress == "" && searchMoto == "") {
        APIConfig.getItems({ secteur:search.value}).then((data) => setSelectedSort(data));
        //APIConfig.getItems({prestation_type:"Vente", secteur:search.value}).then((data) => setSelectedSort(data['biens']));

      } else if (search == "" && searchMoto == "" && searchAddress) {
        setSelectedSort(
          cars
            .filter((cars) => cars.id == searchAddress.value)
            .map((cars) => cars)
        );
      } else if (search && searchAddress && searchMoto == "") {
        setSelectedSort(
          cars
            .filter(
              (cars) =>
                cars.type == search.value && cars.id == searchAddress.value
            )
            .map((cars) => cars)
        );
      }
      // rechercher par motorisation
      
      else if (searchMoto && search == "" && searchAddress == "") {
        tab[searchMoto.name]=searchMoto.value;
        APIConfig.getItems(tab).then((data) => setSelectedSort(data));
        console.log(tab)
      } else if (searchMoto && search && searchAddress == "") {
        setSelectedSort(
          cars
            .filter(
              (cars) =>
                cars.type == search.value &&
                cars.motorisation == searchMoto.value
            )
            .map((cars) => cars)
        );
      } else if (searchMoto && search == "" && searchAddress) {
        setSelectedSort(
          cars
            .filter(
              (cars) =>
                cars.id == searchAddress.value &&
                cars.motorisation == searchMoto.value
            )
            .map((cars) => cars)
        );
      }
      // les 3
      else if (searchMoto && search && searchAddress) {
        setSelectedSort(
          cars
            .filter(
              (cars) =>
                cars.id == searchAddress.value &&
                cars.motorisation == searchMoto.value &&
                cars.motorisation == searchMoto.value
            )
            .map((cars) => cars)
        );
      } else {
        if (cars) {
          console.log(cars);

          const adresse = cars.map((a) => {            
            return { value: a.id, label: a.ville };
          });
          setOptionsAdrr(adresse);

        }

        //   setSelectedSort(cars);
      }
    },
    [search, searchAddress, searchMoto, cars]
  );
  renderMarkers = params.type.map((data, index) => {
    
    return data
  });

  renderMarkers = renderMarkers.map((data, index) => {

    
    return (
      <div class="col-4">
      <Select
        placeholder={data.name}
        options={data.value}
        onChange={(e) => setSearchMoto({ "name":data.name, "value": e.value })}
        // defaultValue={{ label: "Acheter", value: "Acheter" }}

      />
    </div>

    );
  });

  return (
    <div class="row justify-content-center m-4">
      {renderMarkers}
      {/* <div class="col-4">
        <Select
          placeholder={<div>Adresse</div>}
          options={optionsAdrr}
          onChange={(e) => setSearchddress(e)}
        />
      </div> */}

      {/* <div class="col-4">
        <Select
          placeholder={<div>Type</div>}
          options={optionsMoto}
          onChange={(e) => setSearchMoto(e)}
          defaultValue={{ label: "Acheter", value: "Acheter" }}

        />
      </div>
      <div class="col-4">
        <Select
          placeholder={<div>Secteur</div>}
          options={options}
          onChange={(e) => setSearch(e)}
        />
      </div>
      <div class="col-4">
        <Select
          placeholder={<div>Type de bien</div>}
          options={options}
          onChange={(e) => setSearch(e)}
        />
      </div> */}
    </div>
  );
};

export default SelectBox;
