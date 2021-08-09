import React from "react";
import Icon from "../images/flags.png";
import * as APIConfig from "../constants/APIConfig";
import {Animated} from "react-animated-css";
import ParticlesBg from 'particles-bg'

const DetailAnnonce = (props) => {
  const { name ,params} = props;
  const style = {
    backgroundColor: params.color ?  params.color : "#ffffff",
    color:"white" ,
  };
  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [.1, 0.4],
    position: "all",
    color: ["#E2038C", "#E2038C"],
    cross: "dead",
    // emitter: "follow",
    random: 15
  };

  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      }
    });
  }
  return (

<Animated  isVisible={true}  animationIn="fadeIn" animationOut="fadeout" animationInDuration={2000} animationOutDuration={2000} >

<div  style={{ width: "60%", height: "90%",borderColor:params.color ,borderWidth: "0px 0px 2px 0px "}} class="card btn-no-waves m-1" >
      <a  href={APIConfig.URL_POST+name.post_name }><img class="card-img-top"   
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
  </Animated>




  );
};

export default DetailAnnonce;
