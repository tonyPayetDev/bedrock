import React from "react";
import DetailAnnonce from "./DetailAnnonce.js";
import { styled } from '@mui/material/styles';
const ListeAnnonce = ({
  data,
  setPage,
  params,
  page,
  disable_even,
  setHighlightSpot

}) => {
  let renderAnnonce;

  React.useEffect(
    (props) => {
      // si utilisateur filtre on passe le page a 1 
      setPage(1);

    },
    [data]
  );
  const handleOver = (id) => {
    setHighlightSpot(id);
  }
  const handleOut = (id) => {
    setHighlightSpot(null);
  }


  if (data) {
    if (data['count'] != 0) {

      renderAnnonce = data['data'][page].map((annonce, index) => {
        if (annonce) {
          return (

            <div onMouseOver={() => handleOver(annonce.id)} onMouseOut={() => handleOut()}
              id={annonce.id} class={params.ekit_map_btn ? 'col-lg-6 col-md-12 col-xs-12' : params.col_post}  >

              < DetailAnnonce name={annonce} params={params} index={index} disable_even_odd={disable_even}  > </DetailAnnonce>

            </div >
          );
        }
      });
    } else {
      const ButtonCustom = styled("a")(({ theme }) => ({
        textTransform: 'none',
        fontSize: 16,
        margin: ' 10px,',
        padding: '6px 20px',
        border: '0px solid',
        color: "#FFFFFF",
        boxShadow: "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
        backgroundColor: params.color,
        borderRadius: '0.25rem',
        '&:hover': {
          backgroundColor: "#FFFFFF",
          color: params.color,
          borderColor: params.color,
          boxShadow: "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
        },
      }));
      renderAnnonce = <div class="row "><div class="col-6">
        Désolés, nous n'avons aucune annonce qui correspond à votre recherche.
      </div>
        <ButtonCustom class="col-6" href={params.redirect_contact} >
          Prendre RDV avec un commercial
        </ButtonCustom>

      </div >
    }
  }
  return (

    <div>
      <div class="row">
        {renderAnnonce}
      </div>
    </div >

  );
};

export default ListeAnnonce;
