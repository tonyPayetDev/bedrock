import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as APIConfig from "../constants/APIConfig";
import { Animated } from "react-animated-css";
import ReactLoading from "react-loading";
import * as App from "../App";

const SelectBox = (props) => {
  const { options, optionsMoto, setSelectedSort, cars, state, params, setUrlConstruct, setText } = props;
  const [search, setSearch] = useState("");
  const [searchAddress, setSearchddress] = useState("");
  const [searchMoto, setSearchMoto] = useState("");
  const [optionsAdrr, setOptionsAdrr] = useState([]);
  const [tab, setTab] = useState({});// # todo a recupérer en params

  let renderSelect;
  let renderButton;

  useEffect(
    (props) => {
      // rechercher par type
      if (search) {
        tab[search.name] = search.value;
        setUrlConstruct(tab);
        setSelectedSort("");
        App.getItems(tab).then((data) => setSelectedSort(data));

      }
    },
    [search, searchAddress, searchMoto, cars]
  );
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: 'red',
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }
  let col = "col-" + 12 / params.type.length;// calcul le nombre de col d'apres le nombre de select
  let renderElement = params.type.map((data, index) => {
    if (data.type == "select") {
      return (
        <div class={col}>
          <Select
            style={customStyles}
            theme={theme => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                neutral80: params.color,
                primary25: '#FAFAFA',
                primary: params.color,
              },
            })}

            placeholder={data.label}
            // isMulti
            options={data.value}
            onChange={(e) => setSearch({ "name": data.name, "value": e.value })}
          // defaultValue={{ label: "vente", value: "Acheter" }}
          />
        </div>

      );
    }
    return data.value.map((data_value, index) => {
      console.log(data_value);

      return (
        <button class="btn" onClick={(e) => setSearch({ "name": data.name, "value": data_value.value })}>
          {data_value.label}
        </button >
      );
    }).filter(params => params.type === "button");

  });

  return (

    <div class="row justify-content-center ">

      {renderElement}

    </div>
  );
};

export default SelectBox;
