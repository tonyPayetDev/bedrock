import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";

const DetailAnnonce = (props) => {
  const { name ,params} = props;
  const style = {
    backgroundColor: params.color ?  params.color : "#ffffff",
    color:"white" ,
  };
  return (


<div class="card btn-no-waves" >
      <a  href={APIConfig.SITE+name.post_name }><img class="card-img-top"   style={{ width: "100%", height: "90%" }}
              src={name.photos}
              alt="Logo" alt="Card image cap"  ></img>
 </a>
      <div class="card-body">
        <h5 class="card-title">{name.ville} </h5>
        <p class="card-text">{name.titre}</p>
  
        <div class="btn-group">
                  <button type="button" href="#" class="stretched-link btn  mr-2"  style={style} >contactez un pro</button>
                  <button type="button" class="stretched-link btn" style={style} >favoris</button>

                </div>
      </div>
  </div>    




  );
};

export default DetailAnnonce;
