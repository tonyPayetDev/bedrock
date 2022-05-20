import React from "react";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
const Model = (props) => {
  const { name, stylebutton, label, onClick, tabDefault, desactive, data_value, data } = props;
  console.log(name);

  // const ButtonCustom = styled(Button)(({ theme }) => (stylebutton));

  if (desactive && tabDefault[data.name].value) {

    data_value.ekit_tab_active = tabDefault[data.name].value;
  } else {
    if (!active && data_value.ekit_tab_active) {
      data_value.ekit_tab_active = data_value.value;
    }
    else {
      // si clique on récupere value actif
      data_value.ekit_tab_active = active;
    }
  }
  const ButtonCustom = styled(Button)(({ theme }) => (data_value.ekit_tab_active == data_value.value ? styletab : styletabactive));


  let col = "btn mb-3 " + data.col + " " + data.col_mobile;
  return (
    <button //className={col}
      //  stylebutton={data_value.ekit_tab_active == data_value.value ? styletab : styletabactive}
      style={data_value.ekit_tab_active == data_value.value ? styletabactive : styletab}
      onClick={(e) => setSearch({ "name": data.name, "value": data_value.value, 'active': data_value.ekit_tab_active, type: 'btn' })}
      label={data_value.label}

    >
    </button>
  );
};

export default Model;
