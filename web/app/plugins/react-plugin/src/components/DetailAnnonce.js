import React from "react";
import Icon from "../images/flags.png";

const DetailAnnonce = (props) => {
  const { name } = props;
  console.log(name);
  return (

    
<div class="album py-5 bg-light">
      <div class="row">
      <div class="col-md-12">
          <div class="card mb-4 shadow-sm">
            <img
              style={{ width: "100%", height: "90%" }}
              src={name.photo}
              alt="Logo"
            />
            <div class="card-body">
              <p class="card-text">{name.marque} </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">contactez un pro</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">favoris</button>
                </div>
                <small class="text-muted">{name.model}</small>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>

  );
};

export default DetailAnnonce;
