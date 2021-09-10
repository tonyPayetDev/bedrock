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
  const { setSelectedSort, cars, params, setUrlConstruct, fetchURL, critere } = props;
  const [search, setSearch] = useState("");

  const [tab, setTab] = useState({});// # todo a recupérer en params
  const [active, setActive] = useState(false);// # todo a recupérer en params
  const [value, setValue] = React.useState('');
  const [values, setValues] = React.useState({
    numberformat: ""
  });
  const [state, setState] = React.useState({});
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };
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


  useEffect(
    (props) => {

      if (search) {

        tab[search.name] = search.value;

        setUrlConstruct(tab);
        setSelectedSort("");
        APIConfig.getItems(fetchURL + new URLSearchParams(tab)).then((data) => setSelectedSort(data));

        if (search.type == "btn") {
          setActive(search.value);
        }
        if (search.type == "text") {
          setValues({
            ...values,
            [search.name]: search.value
          });
        }


        if (search.type == "checkbox") {


          if (search.active) {
            state[search.name] = false;
          } else {
            state[search.name] = true;
          }

        }
      }
    },
    [search, cars]
  );


  function filtre_facto(data, index) {
    if (data.type == "select") {
      let col = data.col + " mb-2";
      console.log(index + data.name);
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
            options={data.value}
            onChange={(e) => setSearch({ "name": data.name, "value": e.value })}
          // defaultValue={{ label: "vente", value: "Acheter" }}
          />
        </div >

      );
    }
    if (data.type == "text") {

      return (

        <div class={data.col}>
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

        // <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      );
    }
    if (data.type == "button") {
      return data.value.map((data_value, index) => {

        // on récupere la valeur active
        if (!active && data_value.ekit_tab_active) {
          data_value.ekit_tab_active = data_value.value;
        }
        else {
          // si clique on récupere value actif
          data_value.ekit_tab_active = active;
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
      let col = "btn mb-3 " + data.col;
      let value;
      let name = data.name;
      // todo a revoir xml
      // if (state[name] && data.value) {
      //   if (data.value[0]) {
      //     value = data.value[0].value
      //   }

      // } else {
      //   if (data.value[1]) {
      //     value = data.value[1].value
      //   }
      // }
      // todo revoir a genere un champs de type text pour les details technique 

      return data.value.map((data_value, index) => {


        return (
          <FormControlLabel
            control={< Checkbox
              style={{ color: params.color }}

              // checked={state[name]}
              onClick={(e) => setSearch({ "name": data.name, 'active': true, "value": data_value.value, type: 'checkbox' })}
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

  });

  let renderElementCritere = params.type.map((data, index) => {

    if (data.critere && critere) {
      return filtre_facto(data, index);
    }
  });

  return (

    <div class="row justify-content-center ">

      {renderElement}
      {renderElementCritere}

    </div>

  );
};

export default SelectBox;
