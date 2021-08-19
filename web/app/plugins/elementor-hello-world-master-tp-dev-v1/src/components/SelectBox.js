import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as APIConfig from "../constants/APIConfig";
import { Animated } from "react-animated-css";
import ReactLoading from "react-loading";

const SelectBox = (props) => {
  const { setSelectedSort, cars, state, params, setUrlConstruct, setText, style, fetchURL } = props;
  const [search, setSearch] = useState("");

  const [tab, setTab] = useState({});// # todo a recupérer en params
  const [active, setActive] = useState(false);// # todo a recupérer en params

  const styletabactive = {
    // display: params.ekit_alerte_btn ? "" : "none",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    color: !params.color ? params.color : "white",
    backgroundColor: params.color ? params.color : "white",
    margin: ".25rem"

  };
  const styletab = {
    // display: params.ekit_alerte_btn ? "" : "none",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    color: params.color ? params.color : "white",
    margin: ".25rem"
  };
  useEffect(
    (props) => {

      if (search) {
        tab[search.name] = search.value;
        setUrlConstruct(tab);
        setSelectedSort("");
        APIConfig.getItems(fetchURL + new URLSearchParams(tab)).then((data) => setSelectedSort(data));

        //APIConfig.getItems(tab).then((data) => setSelectedSort(data));
        if (search.type == "btn") {
          setActive(search.value);

        }

      }
    },
    [search, cars]
  );
  let col = "col-" + 12 / params.type.length;// calcul le nombre de col d'apres le nombre de select
  let renderElement = params.type.map((data, index) => {
    if (data.type == "select") {
      return (
        <div class={col}>
          <Select
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

      // on récupere la valeur active
      if (!active && data_value.ekit_tab_active) {
        data_value.ekit_tab_active = data_value.value;
      }
      else {
        // si clique on récupere value actif
        data_value.ekit_tab_active = active;
      }
      let col = "col-" + 10 / data.value.length;// calcul le nombre de col d'apres le nombre de select

      col = "btn " + col;
      return (
        <button class={col} style={data_value.ekit_tab_active == data_value.value ? styletabactive : styletab} onClick={(e) => setSearch({ "name": data.name, "value": data_value.value, 'active': data_value.ekit_tab_active, type: 'btn' })}>
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
