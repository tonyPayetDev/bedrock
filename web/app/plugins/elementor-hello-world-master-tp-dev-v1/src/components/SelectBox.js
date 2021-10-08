import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as APIConfig from "../constants/APIConfig";
import { Animated } from "react-animated-css";
import ReactLoading from "react-loading";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import NumberFormat from "react-number-format";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  alpha,
  ThemeProvider,
  withStyles,
  makeStyles,
  createTheme,
} from '@material-ui/core/styles';
import { TextShort, Zigbee } from "mdi-material-ui";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      isNumericString
    />
  );
}
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "grey"
    },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "grey"
    // },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey"
      },
      "&:hover fieldset": {
        borderColor: "grey"
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey"
      }
    }
  }
})(TextField);

const SelectBox = (props) => {
  const { setSelectedSort, cars, params, setUrlConstruct, fetchURL, critere, stylecriteres, style_invers, tabDefault, setTabDefault, url_construct } = props;
  const [search, setSearch] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  const [tab, setTab] = useState(url_construct);// # todo a recupérer en params
  const [active, setActive] = useState(false);// # todo a recupérer en params
  const [desactive, setDesactive] = useState(true);// # todo a recupérer en params
  let [tabDefault2, settabDefault2] = useState({});// # todo a recupérer en params
  let [firstload, setFirstload] = useState(true);// # todo a recupérer en params

  const [values, setValues] = React.useState({
    numberformat: ""
  });
  const [state, setState] = React.useState({});
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const styletabactive = {
    // display: params.ekit_alerte_btn ? "" : "none",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    color: !params.color ? params.color : "white",
    backgroundColor: params.color ? params.color : "white",
    margin: ".25rem"

  };
  const styletab = {
    // display: params.ekit_alerte_btn ? "" : "none",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    color: params.color ? params.color : "white",
    margin: ".25rem"
  };

  // recupere les valeurs pars defauts au premier rechargement , la valeur sera mise a false a chaque filtre
  if (firstload) {
    Object.values(tabDefault).map((value, index) => {
      console.log(value);
      if (value.value) {
        tab[value.name] = value.value

      }
    });

  }

  useEffect(
    (props) => {

      if (search) {

        tab[search.name] = search.value;
        if (search.value === "" || search.value === null) {// je supprime la clé si checkbox a false enleve la valeur dans l'url
          delete tab[search.name];
        }

        if (search.type == "select" && search.value) {
          tab[search.name] = search.value.value;
        }

        if (search.type == "btn") {

          setActive(search.value);
          setDesactive(false);

        }
        if (search.type == "text") {
          setValues({
            ...values,
            [search.name]: search.value
          });
        }

        if (search.type == "checkbox") {
          if (state[search.name]) {
            state[search.name] = false;
          } else {
            state[search.name] = true;
          }
        }

        setUrlConstruct(tab);
        setSelectedSort("");
        APIConfig.getItems(fetchURL + new URLSearchParams(tab)).then((data) => setSelectedSort(data));
        history.pushState({}, '', "?" + new URLSearchParams(tab)); // rempli l'url du navigateur
        setFirstload(false);// mis a false pour ne plus etre appler qui est utile au premier chargement de page
      }
    },
    [search, cars]
  );

  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }

  function filtre_facto(data, index) {
    if (data.type == "select") {
      let col = data.col + " mt-1";
      let defaultValue = null;
      if (tabDefault[data.name].value) {
        defaultValue = tabDefault[data.name];
      }
      return (
        <div class={col}>

          <Select
            theme={theme => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                neutral80: params.color,
                primary25: '#FAFAFA',
                primary: params.color,
              },
            })}
            placeholder={data.label}
            // isMulti
            isClearable
            options={data.value}
            onChange={(e) => setSearch({ "name": data.name, "value": e, type: "select" })}

            defaultValue={defaultValue}
          />
        </div >

      );
    }
    if (data.type == "text") {
      let col = data.col + " mt-1";

      return (

        <div class={col}>
          <CssTextField
            style={{ marginTop: "0px", zIndex: 0, background: "white", color: params.color }}


            label={data.label}
            onChange={(e) => setSearch({ "name": data.name, "value": e.target.value, type: 'text' })}
            name="numberformat"
            id={data.label}
            InputProps={{
              style: { color: params.color },
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end" >{data.symbole}</InputAdornment>,

            }}
            margin="dense"
            variant="outlined"
            color="secondary"
          />
        </div >

      );
    }
    if (data.type == "button") {
      return data.value.map((data_value, index) => {

        if (desactive && tabDefault[data.name].value) {

          data_value.ekit_tab_active = tabDefault[data.name].value;
        } else {
          if (!active && data_value.ekit_tab_active) {
            data_value.ekit_tab_active = data_value.value;
          }
          else {
            // si clique on récupere value actif
            data_value.ekit_tab_active = active;
          }
        }


        let col = "btn mb-3 " + data.col;
        return (
          <button class={col}
            style={data_value.ekit_tab_active == data_value.value ? styletabactive : styletab}
            onClick={(e) => setSearch({ "name": data.name, "value": data_value.value, 'active': data_value.ekit_tab_active, type: 'btn' })}>
            {data_value.label}
          </button >
        );
      })
    }

    if (data.type == "checkbox") {
      let col = "mb-3 " + data.col;

      // todo util pour le multi select
      return data.value.map((data_value, index) => {
        let value;

        if (!state[data_value.value]) {
          value = { "name": data_value.value, "value": 1, type: 'checkbox' };
        } else {
          value = { "name": data_value.value, "value": '', type: 'checkbox' };

        }
        return (
          <FormControlLabel class={col}
            control={< Checkbox
              style={{ color: params.color }}
              onClick={(e) => setSearch(value)}
              name={data_value.name} />}
            label={data_value.label}
          />
        );
      })

    }

  }
  let renderElement = params.type.map((data, index) => {
    if (!data.critere && !critere) {

      return filtre_facto(data, index);
    }
    if (isOpened) {

      return filtre_facto(data, index);
    }

  });

  return (

    <div class="row justify-content-center ">

      {renderElement}

      {params.ekit_critere_btn && (
        <div class="col-12">

          <div class="row justify-content-center">

            <a type="button" onClick={toggle} class="btn "
              style={stylecriteres}>
              <i aria-hidden="true"
                style={style_invers} className={isOpened ? "icon    icon-chevron-up" : "icon    icon-chevron-down"} >

              </i>
              {isOpened ? " - de critéres" : " + de critéres"}

            </a>
          </div >
        </div >
      )
      }

    </div >

  );
};

export default SelectBox;
