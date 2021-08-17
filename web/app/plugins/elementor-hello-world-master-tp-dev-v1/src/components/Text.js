import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";

const Text = (props) => {
  const { data, text } = props;
  console.log(text);
  let t = "Achat";
  if (text.prestation_type !== undefined) {
    if (text.prestation_type == "location") {
      t = "Louer";
    }
    if (text.prestation_type == "vente") {
      t = "Acheter";
    }
    if (text.secteur) {
      t = t + " secteur  " + text.secteur.toLowerCase();
    }
  }

  return (
    <span style={{ margin: "12px", fontSize: '20px', color: "#54595f" }}>
      {t}
    </span>

  );
};

export default Text;
