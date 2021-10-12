import React from "react";
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({
  firstStyle: {
    "& .MuiPaginationItem-root": {
      color: props => props.color,
      backgroundColor: props => props.backgroundColor,

    },
    '&MuiPaginationItem-page.Mui-selected:hover': {
      backgroundColor: 'transparent',
    },

  }
}));
const Paginator = (props) => {
  const { firstStyle, secondStyle } = useStyles(props);
  const { data, setPage } = props;

  let nb_page = Math.ceil(data['count'] / 10)
  const [page_selected, setPageSelected] = React.useState(1);
  setPage(page_selected);

  const handleChange = (event, value) => {
    setPageSelected(value);
  };

  return (
    < div class="col m-2">
      <div class="row justify-content-center">
        <Pagination page={page_selected} onChange={handleChange} count={nb_page} className={`${firstStyle} `} variant="outlined" />
      </div>
    </div>
  );
};

export default Paginator;
