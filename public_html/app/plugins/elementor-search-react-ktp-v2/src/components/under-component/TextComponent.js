import React from "react";
import { withStyles, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import NumberFormat from "react-number-format";
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

const TextComponent = (props) => {
  const { data, params, setSearch } = props;

  let col = data.col + " " + data.col_mobile + " mt-1";

  return (

    <div className={col}>
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

};

export default TextComponent;
