import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";

const NbResultat = (props) => {
  const { data} = props;
  return (

<span>

{data ? "("+data['count']+" résultats )" : "" }

</span>

  );
};

export default NbResultat;
