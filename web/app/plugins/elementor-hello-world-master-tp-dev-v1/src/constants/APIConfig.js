
import { decode as base64_decode, encode as base64_encode } from 'base-64';

export const HEADERS = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  // "Access-Control-Allow-Origin": "*"
  // Authorization: "Bearer VotreCléAPI",
});

export const KEY_MAP = "AIzaSyAhjz-cs3ZBPDRp19uRtpMPchvs9yQIyM0";// mettre en param elementor
export const Zoom = 10;
export const perimetre_long = 0.2;
export const perimetre_lat = 0.05;
export let fetchURL = "";
export const url_const = new URL(document.location.href);
export let params_json = "";

export function param(id) {
  for (var i = 0; i < document.getElementsByClassName("app").length; i++) {
    let decoded = base64_decode(document.getElementsByClassName("app")[i].getAttribute("params"));
    params_json = JSON.parse(decoded);
    params_json = params_json.filter(single => single.id === id);
    return params_json;
  }
}

export const getItems = ($filter) =>
  fetch($filter, {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());




