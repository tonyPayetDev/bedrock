import React, { useState, useEffect } from "react";
import Select from "react-select";

const SelectBox = (props) => {
  const { options, optionsMoto, setSelectedSort, cars, state } = props;
  const [search, setSearch] = useState("");
  const [searchAddress, setSearchddress] = useState("");
  const [searchMoto, setSearchMoto] = useState("");
  const [optionsAdrr, setOptionsAdrr] = useState([]);

  // filter
  useEffect(
    (props) => {
      // rechercher par type

      if (search && searchAddress == "" && searchMoto == "") {
        setSelectedSort(
          cars.filter((cars) => cars.type == search.value).map((cars) => cars)
        );
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
        setSelectedSort(
          cars
            .filter((cars) => cars.motorisation == searchMoto.value)
            .map((cars) => cars)
        );
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

  return (
    <div class="row justify-content-center m-4">
  
      <div class="col-4">
        <Select
          placeholder={<div>Type de voiture</div>}
          options={options}
          onChange={(e) => setSearch(e)}
        />
      </div>
      <div class="col-4">
        <Select
          placeholder={<div>Adresse</div>}
          options={optionsAdrr}
          onChange={(e) => setSearchddress(e)}
        />
      </div>
      <div class="col-4">
        <Select
          placeholder={<div>Motorisation</div>}
          options={optionsMoto}
          onChange={(e) => setSearchMoto(e)}
        />
      </div>
    </div>
  );
};

export default SelectBox;
