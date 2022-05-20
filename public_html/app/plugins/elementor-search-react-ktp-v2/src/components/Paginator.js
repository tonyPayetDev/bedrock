import React from "react";
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { blue } from "@mui/material/colors";

const useStyles = makeStyles(() => ({

  firstStyle: {
    '& .Mui-selected': {
      backgroundColor: props => props.color,
      color: props => props.backgroundColor + "!important",
    },
    "& .MuiPaginationItem-root": {
      color: props => props.color,

    }

  }
}));
const Paginator = (props) => {
  const { firstStyle, secondStyle } = useStyles(props);
  const { data, setPage } = props;

  let nb_page = Math.ceil(data['count'] / 10)
  const [page_selected, setPageSelected] = React.useState(1);
  if (page_selected) {
    setPage(page_selected);

  }

  // défiler vers le haut de la page en cliquant sur le même numéro page
  const scrollToTop = () => {
    document.getElementById("scroll").scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChange = (event, value) => {
    setPageSelected(value);
  };

  return (
    < div class="col m-2">
      <div class="row justify-content-center">
        <Pagination page={page_selected} onChange={handleChange}
          onClick={scrollToTop}
          count={nb_page}
          className={`${firstStyle} `}
          variant="outlined" />
      </div>
    </div>
  );
};

export default Paginator;
