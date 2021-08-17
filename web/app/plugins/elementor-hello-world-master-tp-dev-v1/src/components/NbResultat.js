import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";

const NbResultat = (props) => {
  const { data, paren } = props;
  let paren_odd = "(";
  let paren_even = ")";
  if (!paren) {
    paren_odd = "";
    paren_even = "";
  }
  return (

    <span style={{ margin: "10px" }}>
      {data ? paren_odd + data['count'] + " résultats " + paren_even : ""}
    </span>

  );
};

export default NbResultat;
