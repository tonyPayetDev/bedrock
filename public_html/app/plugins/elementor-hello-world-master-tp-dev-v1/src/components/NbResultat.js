import React from "react";
import ReactLoading from "react-loading";

const NbResultat = (props) => {
  const { data, paren, params, options, style } = props;
  let { loading } = props;

  let paren_odd = "(";
  let paren_even = ")";
  if (!paren) {
    paren_odd = "";
    paren_even = "";
  }
  let col = "col-4";
  let col2 = "col-12 ";

  let load = "";
  if (data == "") {
    col2 = "col-8 ";

    load = <div class="col-4">
      <ReactLoading type='bubbles' color="white" height={'30%'} width={'30%'} />  </div>;
  }


  return (
    <div class="row" style={style}
    >
      {params.search_text ? <div class={col2}>
        {params.search_text}        {data ? paren_odd + data['count'] + " résultats " + paren_even : ""}

      </div> : ""}

      {load}

      {data && options == "1" ? paren_odd + data['count'] + " résultats " + paren_even : ""}
    </div>
  );
};

export default NbResultat;
