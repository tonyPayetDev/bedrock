export const HEADERS = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer VotreCléAPI",
});
export const SITE = "http://localhost/wordpress-labo/programmes/";

export const API_URI = "http://localhost/wordpress-labo/wp-json/api/v1";
export const KEY_MAP = "AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0";
export const Zoom = 12;
export const perimetre_long = 0.2;
export const perimetre_lat = 0.05;

const fetchURL = `${API_URI}/biens?`;


export const getItems = ($filter) =>
  fetch(fetchURL +  new URLSearchParams($filter), {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());


// export const API_URI = "http://api.tonypayet.com/api";
// export const KEY_MAP = "AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0";
// export const Zoom = 12;
// export const perimetre_long = 0.2;
// export const perimetre_lat = 0.05;

// const fetchURL = `${API_URI}/cars`;
// export const getItems = () =>porp
//   fetch(fetchURL, {
//     method: "GET",
//     headers: HEADERS,
//   }).then((res) => res.json());

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
