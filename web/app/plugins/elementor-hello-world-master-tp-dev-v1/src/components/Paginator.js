import React from "react";

const Paginator = (props) => {
  const { name, data, setPage } = props;
  let nb_page_afficher = props.nb_page_afficher;
  const nb_page = Math.round(data['count'] / nb_page_afficher + 1);
  let items = [];
  const [page_selected, setPageSelected] = React.useState(1);

  setPage(page_selected);
  console.log(nb_page);
  console.log(nb_page_afficher);
  let nbMaxPage = 10;
  if (nb_page < 10) {


    for (let numero_page = 1; numero_page <= nb_page; numero_page++) {
      // if (numero_page <= nbMaxPage) {


      let pageitem = "page-item ";

      if (page_selected == numero_page) {
        pageitem = pageitem + " active";
      }
      items.push(<li className={pageitem} ><a style={{ color: props.params.color }} onClick={(e) => setPageSelected(numero_page)} class="page-link" href="#">
        {numero_page}
      </a></li>)

    }
  }
  if (nb_page > 10) {



    items.push(<li class="page-item ">
      <a class="page-link" style={{ color: "black" }} href="#" tabindex="-1">Previous</a>
    </li>);
    for (let numero_page = 1; numero_page <= nb_page; numero_page++) {
      // if (numero_page <= nbMaxPage) {
      if (numero_page <= 10) {


        let pageitem = "page-item ";

        if (page_selected == numero_page) {
          pageitem = pageitem + " active";
        }
        items.push(<li className={pageitem} ><a style={{ color: props.params.color }} onClick={(e) => setPageSelected(numero_page)} class="page-link" href="#">
          {numero_page}
        </a></li>)

      }
    }

    items.push(<li class="page-item">
      <a class="page-link" style={{ color: "black" }} href="#">Next</a>
    </li>);
  }
  return (
    < div class="col m-2">
      <div class="row justify-content-center">

        <nav aria-label="...">
          <ul class="pagination">
            {items}
            {/* <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li> */}
          </ul>
        </nav>
      </div>

    </div>
  );
};

export default Paginator;
