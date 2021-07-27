import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";

const NbResultat = (props) => {
  const { data} = props;
  return (

<div>

{data ? data['count']+" résultats" : "" }

</div>

  );
};

export default NbResultat;
