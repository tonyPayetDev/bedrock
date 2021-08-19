// import params_json from '../jsonFile.json';

import { decode as base64_decode, encode as base64_encode } from 'base-64';
// import * as App from "../App";

export const HEADERS = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer VotreCléAPI",
});

export const KEY_MAP = "AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0";
export const Zoom = 12;
export const perimetre_long = 0.2;
export const perimetre_lat = 0.05;
export let fetchURL = "";

var url = new URL(document.location.href);

export const url_const = url;
//const attributID = document.getElementsByClassName("app").getAttribute("params");

// document.getElementsByClassName("app").map((params, index) => {

//   console.log(params);
// });




var page_id = url.searchParams.get("page_id");// pour la pagination

export let params_json = [];

export function param(id) {
  let tab = []
  for (var i = 0; i < document.getElementsByClassName("app").length; i++) {
    let decoded = base64_decode(document.getElementsByClassName("app")[i].getAttribute("params"));
    params_json = JSON.parse(decoded);
    params_json = params_json.filter(single => single.id === id);
    console.log(params_json);
  }
  return params_json;

}

export const getItems = ($filter) =>
  fetch($filter, {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());



// export const getItems = ($filter) =>
//   fetch(fetchURL + new URLSearchParams($filter), {
//     method: "GET",
//     headers: HEADERS,
//   }).then((res) => res.json());

// const fetchURLType = `${API_URI}/secteurs`;
// export const getItemsType = () =>
//   fetch(fetchURLType, {
//     method: "GET",
//     headers: HEADERS,
//   }).then((res) => res.json());

// const fetchURLMoto = `${API_URI}/types`;
// export const getItemsMoto = () =>
//   fetch(fetchURLMoto, {
//     method: "GET",
//     headers: HEADERS,
//   }).then((res) => res.json());



