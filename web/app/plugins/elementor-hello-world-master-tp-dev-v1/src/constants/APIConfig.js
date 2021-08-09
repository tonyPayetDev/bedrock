import params_json from '../jsonFile.json';


export const HEADERS = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer VotreCléAPI",
});

export const KEY_MAP = "AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0";
export const Zoom = 12;
export const perimetre_long = 0.2;
export const perimetre_lat = 0.05;
var url = new URL(document.location.href);
export const url_const =url;
console.log(params_json);

export const params=params_json.filter(single => single.id_active ===url.origin+url.pathname)[0];
export const URL_POST = params.URL_POST;

export const API_URI = params.API_URI;
var page_id = url.searchParams.get("page_id");// pour la pagination

const fetchURLParams = `${API_URI}/params?page_id=`+page_id;
export const getItemsParams = () =>
  fetch(fetchURLParams, {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());

const fetchURL = `${API_URI}/biens?`;

export const getItems = ($filter) =>
  fetch(fetchURL +  new URLSearchParams($filter), {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());

const fetchURLType = `${API_URI}/secteurs`;
export const getItemsType = () =>
  fetch(fetchURLType, {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());

const fetchURLMoto = `${API_URI}/types`;
export const getItemsMoto = () =>
  fetch(fetchURLMoto, {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());



