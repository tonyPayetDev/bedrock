
import { decode as base64_decode, encode as base64_encode } from 'base-64';

export const url_const = new URL(document.location.href);
export let params_json = "";

export const param = (id) => {
  for (var i = 0; i < document.getElementsByClassName("app").length; i++) {
    let decoded = base64_decode(document.getElementsByClassName("app")[i].getAttribute("params"));// decode la valeur encoder en base 64 coter php
    params_json = JSON.parse(decoded);
    params_json = params_json.filter(single => single.id === id);
    return params_json;
  }
}

// fais l'api en recuperant le filtre et le HEADER 
export const getItems = ($filter, HEADERS) =>
  fetch($filter, {
    method: "GET",
    headers: HEADERS,
  }).then((res) => res.json());


