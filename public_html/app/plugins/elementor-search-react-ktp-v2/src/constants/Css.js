

export const style_button = (params) => {

  return {
    backgroundColor: params.color ? params.color : "#ffffff",
    display: params.ekit_search_btn ? "" : "none",
    borderRadius: "4px",
    color: "white",
    fontSize: "14px",
    boxShadow: "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px"
  }
}

export function style_invers(params) {
  const style_invers = {
    backgroundColor: "white",
    borderRadius: "4px",
    color: params.color ? params.color : "#ffffff",
    fontSize: "15px"
  };
  return style_invers;
}
export function style_critere(params) {
  const stylecriteres = {
    borderRadius: "20px 20px 20px 20px",
    color: !params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "black",
  };
  return stylecriteres;
}
export function stylemenu(params) {

  const stylemenu = {
    display: params.ekit_alerte_btn ? "" : "none",
    borderRadius: "20px 20px 20px 20px",
    color: params.ekit_menu_button_color_alerte ? params.ekit_menu_button_color_alerte : "#ffffff",

  };
  return stylemenu;

}


