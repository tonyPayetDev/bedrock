import React from "react";
import Icon from "../images/flags.png";
import { Animated } from "react-animated-css";
import ParticlesBg from 'particles-bg'


let cpt = 0;

const DetailAnnonce = (props) => {
  const { name, params, classes } = props;

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
    margin: "0px 25px 25px"
  };
  const styleText = {
    color: params.color ? params.color : "#ffffff",
  };
  const styleContactPro = {
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: params.color ? params.color : "white",
    color: !params.color ? params.color : "white",
    fontSize: "14px",

  };
  const styleBtnCondition = {
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: params.color ? params.color : "white",
    color: !params.color ? params.color : "white",
    fontSize: "14px",
    "text-align": "center",
    width: "40px",
    height: "40px",
    " line-height": "40px",
    "display": "block",
    "border-radius": "50px",
    "font-size": "20px",
    margin: "0px 20px 20px 20px"
  };
  const styleCondition = {
    color: "white",
    fontSize: "16px",

  };

  const style_card = {
    'position': 'absolute',
    padding: '50px 10px',
    maxWidth: "200px",
    top: "50%",
    left: "-20px",
    width: "105%",
    height: "60%",

    transform: 'translateY(-50%)',
    "-webkit-transform": "translateY(-50 %)",
    "-moz-transform": " translateY(-50 %)",
    "-o-transform": "translateY(-50 %)",
    "-ms-transform": "translateY(-50 %)",

    background: "#fff",
    color: "#fff",
    textAlign: "center",
    borderColor: "red",
    border: " 1px solid #ddd",
    borderWidth: "0px 0px 3px 0px ",
    borderRadius: "0px 0px 0px 14px",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  };

  function MouseOver(event) {
    if (event.target.type) {
      event.target.style.color = styleContactPro.backgroundColor;
      event.target.style.background = "#ffffff";
    }

  }
  function MouseOut(event) {
    if (event.target.type) {
      event.target.style.color = "#ffffff";
      event.target.style.background = styleContactPro.backgroundColor;
    }
  }
  function MouseOverHeart(event) {
    event.target.style.background = "white";
    event.target.style.color = params.color ? params.color : "#ffffff"

  }
  function MouseOutHeart(event) {
    event.target.style.background = params.color ? params.color : "#ffffff";
    event.target.style.color = "white";

  }

  function MouseOverOpacity(event) {

    event.target.style.filter = " saturate(2)";
    event.target.style.transform = "translateY(-2%) scale(1)";
    event.target.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 1, 1)';
    event.target.style.transitionDuration = '500ms'

  }
  function MouseOutOpacity(event) {
    event.target.style.filter = "saturate(1)";
    event.target.style.transform = "translateY(0%) scale(1)";
    event.target.style.transitionDuration = '500ms'

  }

  let fieldsAnnonce;
  let fieldsBtn;
  let fieldsPhotos;
  let card;
  let cardbody;
  let styleImage;

  if (params.cardimage) {
    styleImage = JSON.parse(params.cardimage);
  } else {
    styleImage = {
      width: "300px",
      height: "200px",
      boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      opacity: 1,
      color: "red",
      filter: "saturate(1)",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      borderRadius: "1px",
      backgroundRepeat: "no-repeat",
      objectFit: 'cover'
    };
  }
  if (params.cardbody) {
    cardbody = JSON.parse(params.cardbody);
  } else {
    cardbody = {

      "color": "#FAFAFA",
      "textAlign": "center",
      "borderWidth": "0px 0px 3px 0px ",
      "borderRadius": "0px 0px 0px 14px",
      borderColor: params.color,

    }
  }

  if (params.card) {
    card = JSON.parse(params.card);
  } else {
    card = {
      marginLeft: "0px",
      marginTop: "3px",
      background: "#FAFAFA",
      border: " 1px solid #ddd",
      borderRadius: "4px",
      padding: "10px",
      width: "100%",
      height: "50%",
      borderColor: params.color,
      borderWidth: "0px 0px 3px 0px ",
      borderRadius: "0px 0px 0px 14px",
      boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    }
  }
  cpt = cpt + 1;
  if (cpt > 1) {
    cpt = 0;
  }

  if (cpt === 0) {
    cardbody.right = "-20px";
    cardbody.left = "";
    card.left = "5px";
    card.borderRadius = "0px 0px 14px 0px ";


  } else {
    cardbody.right = "";
    cardbody.left = "-20px";
    card.left = "25px";
    card.borderRadius = "0px 0px 0px 14px ";

  }

  if (name) {

    fieldsBtn = name.map((annonce, index) => {
      // change la couleur sur certaine condition  todo a voir si possible facoriser
      if (annonce.post.type === "condition") {

        let col = 'btn ' + annonce.post.col;

        if (annonce.post.condition === annonce.value) {
          styleContactPro.backgroundColor = annonce.post.color;
          styleContactPro.borderRadius = "12px";
          cardbody.border = annonce.post.color;

        }
      }

      else if (annonce.post.type === "button") {
        let col = 'btn ' + annonce.post.col;

        return (
          <a type="button" style={annonce.post} class={col} style={styleContactPro} href={annonce.post.url + "?" + annonce.post.url_param + "=" + annonce.value} >
            <i aria-hidden="true" class={annonce.post.icon.value}></i>  {annonce.post.text}
          </a>

        );
      }
    });
    fieldsAnnonce = name.map((annonce, index) => {
      if (annonce.post.type === "condition" & annonce.post.type !== "button") {
        let col = annonce.post.col;

        if (annonce.post.condition === annonce.value) {

          styleCondition.color = annonce.post.color;
          return (

            <div style={annonce.post} class={col} style={styleCondition}  >
              <p class="card-text"> <i aria-hidden="true" class={annonce.post.icon.value}></i> {annonce.post.text} </p>
            </div>
          );
        }
      }

      if (annonce.post.type === "text" && annonce.value) {
        if (annonce.post.col != 0) {
          let col = ' ' + annonce.post.col;
          return (
            <div style={annonce.post} class={col}>
              <p class="card-text"> <i aria-hidden="true" class={annonce.post.icon.value}></i> {annonce.value}{annonce.post.text} </p>
            </div>
          );
        } {
          console.log(annonce);

          return (
            <p style={annonce.post}  >{" " + annonce.value}{annonce.post.text} </p>

          );
        }


      }



    });
    fieldsPhotos = name.map((annonce, index) => {

      if (annonce.post.type === "photos") {
        console.log(annonce.href);
        return (
          <a onMouseOver={MouseOverOpacity} onMouseOut={MouseOutOpacity} href={params.URL_POST + annonce.href}>
            <img
              style={styleImage}
              class="card-img-top"
              src={annonce.value}
              alt="Logo" alt="Card image cap"  ></img>
          </a>

        );
      }
    });


  }


  return (
    <div class={params.ekit_map_btn ? 'col-6' : params.col_post}  >
      <div>
        <div class='col-6' style={card} class="card"  >
          {fieldsPhotos}
          {/* todo pour plustard rajouer mouse over qui marche sur programmes et biens //onMouseOver={MouseOver} onMouseOut={MouseOut}  */}
          <div class="card-body" type="button" style={cardbody} >
            <div class="row">
              {fieldsAnnonce}
            </div>
            <div class="btn-group row">
              {/* <button type="button" onMouseOver={MouseOver} onMouseOut={MouseOut} href="#" class="stretched-link btn  mr-3" style={styleContactPro} > <i aria-hidden="true" class="far fa-envelope"></i> contactez un pro</button>
        <button type="button" onMouseOver={MouseOverHeart} onMouseOut={MouseOutHeart} className={"stretched-link btn " + params.ekit_wb_3976_icons.value} style={style} ></button> */}
              {fieldsBtn}
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};
export default DetailAnnonce

