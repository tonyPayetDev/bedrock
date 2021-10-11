import React from "react";
import { Pagination } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
const Paginator = (props) => {
  const { name, data, setPage } = props;
  let nb_page = Math.ceil(data['count'] / 10)
  const [page_selected, setPageSelected] = React.useState(1);
  const [activePage, setActivePage] = React.useState(1);
  setPage(page_selected);
  const onChange = (e, pageInfo) => {
    setPageSelected(pageInfo.activePage);
    setActivePage(pageInfo.activePage);
  };

  return (
    < div class="col m-2">
      <div class="row justify-content-center">
        <Pagination inverted style={{ background: props.params.color, fontSize: "12px" }}
          onPageChange={onChange}
          activePage={activePage}
          secondary
          totalPages={nb_page} />
      </div>

    </div>
  );
};

export default Paginator;
