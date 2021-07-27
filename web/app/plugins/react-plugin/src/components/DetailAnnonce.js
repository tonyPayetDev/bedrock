import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";

const DetailAnnonce = (props) => {
  const { name } = props;
  return (

<div class="card" >
  <div class="card-body">
    {/* <h5 class="card-title">Card with stretched link</h5> */}
    <div class="card mb-4 shadow-sm">
            <img
              style={{ width: "100%", height: "90%" }}
              src={name.photos}
              alt="Logo"
            />
            <div class="card-body">
              <p class="card-text">{name.ville} </p>
              <p class="card-text">{name.titre} </p>

              <div class="d-flex justify-content-between align-items-center">
     
                <small class="text-muted">{name.code_postal}</small>
              </div>
            </div>
            <div class="btn-group">
                  <button type="button" href="#" class="btn btn-sm btn-outline-secondary  "  >contactez un pro</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">favoris</button>

                </div>
          </div>   
        
           <a href={APIConfig.SITE+name.post_name } class=" stretched-link"></a>
  </div>


</div>


  );
};

export default DetailAnnonce;
