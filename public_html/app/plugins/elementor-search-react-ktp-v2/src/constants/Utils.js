
function Arrondir(nomber, nbApVirg) {
  return (parseInt(nomber * Math.pow(10, nbApVirg) + 0.5)) / Math.pow(10, nbApVirg);
}

export function formatMillier(nombre) {
  var nbrArrnd = Arrondir(nombre, 2);
  return new Intl.NumberFormat().format(nbrArrnd);
}
