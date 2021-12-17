import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export default function ColorToggleButton(props) {
  const { data, setSearch, index2, styletoggle } = props;
  const [alignment, setAlignment] = React.useState('left');


  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const ToggleButtonCustom = styled(ToggleButton)(({ theme }) => (styletoggle));

  let coldnone;
  if (index2 != 0) {
    coldnone = "col-12 d-none "
  } else {
    coldnone = "col-12";
  }
  let col = "btn mb-3 mr-1 p-2 " + data.col + " " + data.col_mobile;

  let render = data.value.map((data_value, index) => {
    return (<ToggleButtonCustom className={col}
      onClick={(e) => setSearch({
        "name": data.name,
        "step": data.step,
        "value": data_value.value,
        'active': data_value.ekit_tab_active,
        type: 'step'
      })}
      value={data_value.label}   >
      <i aria-hidden="true"
        style={{ fontSize: 16 }}
        className={data_value.icon.value + " mb-1 mr-1"} >

      </i>
      {data_value.label}</ToggleButtonCustom>
    )
  });

  return (
    <ToggleButtonGroup
      class={coldnone}
      value={alignment}
      name={data.step}
      exclusive
      onChange={handleAlignment}
    >
      {render}
    </ToggleButtonGroup>
  );
}