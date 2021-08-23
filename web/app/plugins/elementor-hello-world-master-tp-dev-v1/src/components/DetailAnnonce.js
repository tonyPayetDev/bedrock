import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";
import { Animated } from "react-animated-css";
import ParticlesBg from 'particles-bg'

const DetailAnnonce = (props) => {
  const { name, params } = props;
  const style = {
    backgroundColor: params.color ? params.color : "#ffffff",
    color: "white",
    fontSize: "15px",
    width: "36px",
    height: "36px",
    borderRadius: "60px",
    fontSize: "17px",
    lineHeight: " 1.33",
    padding: "0px 7px",
    margin: "0px 0px 0px 60px"


  };
  const styleText = {
    color: params.color ? params.color : "#ffffff",
  };
  const styleContactPro = {
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: !params.color ? params.color : "white",
    color: params.color ? params.color : "white",
    fontSize: "14px",

  };
  const styleImage = {
    width: "108%", height: "80%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    opacity: 1,
    color: "red",
    filter: "saturate(1)"

  };
  function MouseOver(event) {
    event.target.style.background = params.color ? params.color : "#ffffff";
    event.target.style.color = "white";

  }
  function MouseOverHeart(event) {
    event.target.style.background = "white";
    event.target.style.color = params.color ? params.color : "#ffffff"

  }
  function MouseOutHeart(event) {
    event.target.style.background = params.color ? params.color : "#ffffff";
    event.target.style.color = "white";

  }
  function MouseOut(event) {
    event.target.style.background = "";
    event.target.style.color = params.color ? params.color : "#ffffff";

  }
  function MouseOverOpacity(event) {

    event.target.style.filter = " saturate(2)";


    event.target.style.transform = "translateY(-2%) scale(1)";
    event.target.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 1, 1)';
    event.target.style.transitionDuration = '500ms',
      event.target.style.objectFit = 'cover'


  }
  function MouseOutOpacity(event) {
    event.target.style.filter = "saturate(1)";
    event.target.style.transform = "translateY(0%) scale(1)";

    event.target.style.transitionDuration = '500ms',
      event.target.style.objectFit = 'cover'

  }


  //console.log(params.post);


  return (
    <div class={params.ekit_map_btn ? 'col-6' : params.col_post
    }  >
      <div >

        <div class='col-6' style={{
          margin: "10px  10px 10px 10px  ",
          background: "#FAFAFA",
          border: " 1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          width: "105%", height: "60%",
          borderColor: params.color,
          borderWidth: "0px 0px 3px 0px ",
          borderRadius: "0px 0px 0px 14px",
          boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }} class="card btn-no-waves m-2 " >
          <a onMouseOver={MouseOverOpacity} onMouseOut={MouseOutOpacity} href={params.URL_POST + name.post_name}>
            <img
              style={styleImage}
              class="card-img-top"
              src={name.photos}
              alt="Logo" alt="Card image cap"  ></img>
          </a>
          <div class="card-body" type="button" >
            <div class="row">
              <div class="col-8 " style={{ color: "#7A7A7A", fontSize: "14px " }}>
                <p class="card-text">{name.bien_type} - {name.surface} m²</p>

              </div>
              <div class="col-4 " style={styleText}>
                {name.prestation_type == "Location" ?
                  <p class="card-text">{name.tarif}/mois </p> :
                  <p class="card-text">{name.prix} € </p>
                }
              </div>

            </div>

            <p class="card-text ">{name.ville}</p>

            <div class="btn-group">
              <button type="button" onMouseOver={MouseOver} onMouseOut={MouseOut} href="#" class="stretched-link btn  mr-3" style={styleContactPro} > <i aria-hidden="true" class="far fa-envelope"></i> contactez un pro</button>
              <button type="button" onMouseOver={MouseOverHeart} onMouseOut={MouseOutHeart} className={"stretched-link btn " + params.ekit_wb_3976_icons.value} style={style} ></button>

            </div>
          </div>
        </div>

      </div>
    </div >




  );
};

export default DetailAnnonce;
