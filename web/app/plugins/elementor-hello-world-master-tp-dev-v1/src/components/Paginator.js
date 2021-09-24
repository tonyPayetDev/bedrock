import React from "react";

const Paginator = (props) => {
  const { name, data } = props;
  let nb_page_afficher = props.nb_page_afficher;
  let nb_page = Math.round(data['count'] / nb_page_afficher) + 1;
  let items = [];
  const [page_selected, setPageSelected] = React.useState(1);
  console.log(page_selected);

  for (let numero_page = 1; numero_page <= nb_page; numero_page++) {
    if (numero_page <= nb_page_afficher) {
      items.push(<li class="page-item"><a style={{ color: props.params.color }} onClick={(e) => setPageSelected(numero_page)} class="page-link" href="#">{numero_page}</a></li>)
    }
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
