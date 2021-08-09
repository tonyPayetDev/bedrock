import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as APIConfig from "../constants/APIConfig";
import {Animated} from "react-animated-css";

const SelectBox = (props) => {
  const { options, optionsMoto, setSelectedSort, cars, state , params ,setUrlConstruct} = props;
  const [search, setSearch] = useState("");
  const [searchAddress, setSearchddress] = useState("");
  const [searchMoto, setSearchMoto] = useState("");
  const [optionsAdrr, setOptionsAdrr] = useState([]);
  const [tab, setTab] = useState({  });// # todo a recupérer en params

  let renderSelect ;

  useEffect(
    (props) => {
      // rechercher par type
      if (search ) {
        tab[search.name]=search.value;
        setUrlConstruct(tab);
        APIConfig.getItems(tab).then((data) => setSelectedSort(data));
      }  
    },
    [search, searchAddress, searchMoto, cars]
  );

  let col ="col-"+ 12/params.type.length;// calcul le nombre de col d'apres le nombre de select
  renderSelect =  params.type.map((data, index) => {
    
    return (
      <div class={col}>
      <Select
        placeholder={data.label}
        // isMulti
        options={data.value}
        onChange={(e) => setSearch({ "name":data.name, "value": e.value })}
        // defaultValue={{ label: "vente", value: "Acheter" }}

      />
    </div>

    );
  });
  let text="";
  if(tab.prestation_type  ){
      text="Je cherche une " +tab.prestation_type 
      if(text && tab.secteur){
        text=text +" secteur " +  tab.secteur

      }
  }
  

  return (
    <div class="row justify-content-center ">
      {renderSelect}

      {text}
      
    </div>
  );
};

export default SelectBox;
