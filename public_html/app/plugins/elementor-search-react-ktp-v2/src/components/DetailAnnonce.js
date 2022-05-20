import React from "react";
import { Animated } from "react-animated-css";
import * as Utils from "../constants/Utils";
import BasicPopover from './under-component/BasicPopover';

const DetailAnnonce = (props) => {
  const { name, params, index, disable_even_odd } = props;

  const styleContactPro = {
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: params.color ? params.color : "white",
    color: !params.color ? params.color : "white",
    fontSize: "13px",

  };

  const styleCondition = {
    color: "white",
    fontSize: "16px",
  };

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
      width: "350px",
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
      cardbody.right = "-10px";
      cardbody.left = "";
      card.left = "5px";
      card.borderRadius = "0px 0px 14px 0px ";


    } else {
      cardbody.right = "";
      cardbody.left = "-10px";
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
        let col = annonce.col;


        if (annonce.type === "condition" && annonce.type !== "button" && annonce.in_the_photo !== "yes") {

          if (annonce.condition === value) {

            styleCondition.color = annonce.color;
            return (

              <div class={col} style={styleCondition}  >
                <p class="card-text"> <i aria-hidden="true" class={annonce.icon.value}></i> {annonce.text} </p>
              </div>
            );
          }
        }
        if (annonce.type === "text" && value && annonce.in_the_photo !== "yes") {
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


    let fieldsInThePhotos = Object.values(params.post).map(value => {
      let row = Object.values(value).map((annonce, index) => {
        // todo a rajouter pour les types millier , button ou autre si besoin car ne prend en charge que condition et text
        let value = name[annonce.field]; //récupère la valeur du type du champ
        const imgDownload = {
          position: "absolute",
          padding: "2px"

        };
        const direction = annonce.direction_element.split('-'); //sépare en deux parties "top","bottom" et "left","right"

        if (annonce.in_the_photo == "yes") {
          if (annonce.type === "text" && value) {

            if (!disable_even_odd) {
              imgDownload[direction[0]] = -76;

            } else {
              imgDownload[direction[0]] = 10;
            }
            imgDownload[direction[1]] = 17;

            return (
              <div
                class="text-color"
                style={imgDownload} >
                {value} <i class={annonce.icon.value}></i>
              </div>

            );
          }

          if (annonce.type === "condition" && annonce.type !== "button") {

            if (annonce.condition === value) {

              imgDownload[direction[0]] = -76;
              imgDownload[direction[1]] = -5;
              imgDownload['background'] = " rgb(230, 0, 126)";
              imgDownload['padding'] = "0px 3px 0px 3px";

              console.log(annonce.text);
              return (

                <div class="text-color" style={imgDownload}  >
                  <p class="card-text"> <i aria-hidden="true" class={annonce.icon.value}></i> {annonce.text} </p>
                </div>
              );
            }

          }
        }
      });
      return row;
    });

    fieldsPhotos = Object.values(params.post).map(value => {
      let row = Object.values(value).map((annonce, index) => {
        let value = name[annonce.field];
        let url = name[annonce.url];
        if (annonce.type === "photos") {
          // console.log(annonce

          return (
            <a class="img-download" href={params.URL_POST + url}>

              <img id="imageContainer"
                style={styleImage}
                class="img-responsive"
                src={value}
                alt="Logo"   >
              </img>

              {fieldsInThePhotos}

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
            //styleContactPro.borderRadius = "12px";
            cardbody.border = annonce.color;
          }
        }

        else if (annonce.type === "button") {
          let url = name[annonce.url];
          styleContactPro.fontSize = annonce['font-size'];
          return (
            <a type="button" class={col} style={styleContactPro} href={params.URL_POST + url} >
              <i aria-hidden="true" class={annonce.icon.value}></i>  {annonce.text}
            </a>
          );
        }
        else if (annonce.type === "button_param") {
          styleContactPro.fontSize = annonce['font-size'];
          return (
            <span>

              <a type="button" class={col} style={styleContactPro} href={annonce.url + "&" + annonce.url_param + "=" + value} >
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
      <div class='card' style={card}   >
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

