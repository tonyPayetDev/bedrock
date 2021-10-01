import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";
import ReactLoading from "react-loading";

const NbResultat = (props) => {
  const { data, paren, params } = props;
  let paren_odd = "(";
  let paren_even = ")";
  if (!paren) {
    paren_odd = "";
    paren_even = "";
  }
  let col = "col-4";
  let col2 = "col-8 text-nowrap";

  if (data) {
    col = "col-6 "
    col2 = "col-6 text-nowrap"

  }

  return (
    <div class="row">
      <div class={col2}>
        {params.search_text}
      </div>
      <div class={col}>
        {data ? paren_odd + data['count'] + " résultats " + paren_even : <ReactLoading type='bubbles' color="white" height={'80%'} width={'80%'} />}
      </div>

    </div>
  );
};

export default NbResultat;
