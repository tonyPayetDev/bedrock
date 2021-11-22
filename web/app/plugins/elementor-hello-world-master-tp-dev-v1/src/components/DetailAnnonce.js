import React from "react";
import { Animated } from "react-animated-css";
import * as Utils from "../constants/Utils";
import BasicPopover from './BasicPopover';

const DetailAnnonce = (props) => {
  const { name, params, classes, index, disable_even_odd } = props;

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
    fontSize: "13px",

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
  let fieldsShare;

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
  // modulo de l'index pour avoir 1 ou 0 // even odd 
  if (!disable_even_odd) {

    if (index % 2 === 1) {
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
  }
  if (name) {
    fieldsShare = Object.values(params.post).map(value => {
      let row = Object.values(value).map((annonce, index) => {
        let url = name[annonce.url];
        let value = name[annonce.field];
        let col = 'btn m-2' + annonce.col;
        if (annonce.type === "share") {
          return (<BasicPopover value={value} params={params} url={url} annonce={annonce} col={col} styleContactPro={styleContactPro} />)

        }
      });
      return <div class="row justify-content-end">{row} </div>;

    });

    fieldsAnnonce = Object.values(params.post).map(value => {
      let row = Object.values(value).map((annonce, index) => {
        let value = name[annonce.field];
        let url = name[annonce.url];
        let col = annonce.col;

        if (annonce.type === "condition" & annonce.type !== "button") {

          if (annonce.condition === value) {

            styleCondition.color = annonce.color;
            return (

              <div style={annonce} class={col} style={styleCondition}  >
                <p class="card-text"> <i aria-hidden="true" class={annonce.icon.value}></i> {annonce.text} </p>
              </div>
            );
          }
        }
        if (annonce.type === "text" && value) {
          return <div style={annonce} class={col} >
            <i aria-hidden="true" class={annonce.icon.value}></i> {value}{annonce.text}
          </div >;
        }
        if (annonce.type === "millier" && value) {

          value = Utils.formatMillier(value);

          return <div style={annonce} class={col} >
            <i aria-hidden="true" class={annonce.icon.value}></i> {value}{annonce.text}
          </div >;
        }
      });
      return <div class="row">{row} </div>;

    });

    fieldsPhotos = Object.values(params.post).map(value => {
      let row = Object.values(value).map((annonce, index) => {
        let value = name[annonce.field];
        let url = name[annonce.url];
        if (annonce.type === "photos") {

          return (
            <a onMouseOver={MouseOverOpacity} onMouseOut={MouseOutOpacity} href={params.URL_POST + url}>
              <img
                style={styleImage}

                class="img-responsive"
                src={value}
                alt="Logo" alt="Card image cap"  ></img>
            </a>

          );
        }
      });
      return <div class="text-center">{row} </div>;
    });

    fieldsBtn = Object.values(params.post).map(value => {
      let row = Object.values(value).map((annonce, index) => {
        let value = name[annonce.field];
        let url = name[annonce.url];
        let col = 'btn m-2' + annonce.col;

        if (annonce.type === "condition") {

          if (annonce.condition === value) {
            styleContactPro.backgroundColor = annonce.color;
            styleContactPro.borderRadius = "12px";
            cardbody.border = annonce.color;
          }
        }

        else if (annonce.type === "button") {
          let url = name[annonce.url];
          styleContactPro.fontSize = annonce['font-size'];
          return (
            <a type="button" style={annonce.post} class={col} style={styleContactPro} href={params.URL_POST + url} >
              <i aria-hidden="true" class={annonce.icon.value}></i>  {annonce.text}
            </a>
          );
        }
        else if (annonce.type === "button_param") {
          styleContactPro.fontSize = annonce['font-size'];
          console.log(annonce);
          return (
            <span>

              <a type="button" style={annonce.post} class={col} style={styleContactPro} href={annonce.url + "&" + annonce.url_param + "=" + value} >
                <i aria-hidden="true" class={annonce.icon.value}></i>  {annonce.text}
              </a>

            </span>


          );
        }
      });
      return <div class="">{row} </div>;
    });
  }


  return (

    <Animated isVisible={true} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={2500} animationOutDuration={2500} >
      <div class='col-6 col-lg-6 col-md-12 col-xs-12' style={card} class="card"  >
        {fieldsShare}

        {fieldsPhotos}
        <div class="card-body  " type="button" style={cardbody} >

          {fieldsAnnonce}

          <div class="btn-group row">


            {fieldsBtn}

          </div>
        </div>
      </div>
    </Animated>

  );
};
export default DetailAnnonce

