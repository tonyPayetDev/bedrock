import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { InlineShareButtons } from 'sharethis-reactjs';

const BasicPopover = (props) => {
  const { name, value, params, url, annonce, col, styleContactPro } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const direction = annonce.direction_element.split('-'); //séparer en deux parties "top","bottom" et "left","right"

  const styleShare = {
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    color: params.color ? params.color : "white",
    backgroundColor: !params.color ? params.color : "white",
    fontSize: "14px",
    opacity: 0.8,
    zIndex: 1,
    position: "absolute"

  };
  if (direction[0] == "bottom") {
    styleShare[direction[0]] = 120;
  }
  styleShare[direction[1]] = 17;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <a type="button" class={col} style={styleShare} onClick={handleClick} >
        <i aria-hidden="true" class={annonce.icon.value}></i>  {annonce.text}
      </a>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >

        <Typography style={{ fontFamily: params.ekit_wb_3976_font, fontSize: 16 }} sx={{ p: 2 }}>Partager notre annonce.</Typography>

        <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'white',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 12,        // font size for the buttons
            labels: 'null',        // button labels (cta, counts, null)
            language: 'fr',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'linkedin',
              'facebook',
              'twitter'
            ],
            padding: 10,          // padding within buttons (INTEGER)
            radius: 6,            // the corner radius on each button (INTEGER)
            show_total: false,
            size: 40,             // the size of each button (INTEGER)

            // OPTIONAL PARAMETERS
            url: params.URL_POST + url, // (defaults to current url)
            image: value,  // (defaults to og:image or twitter:image)
            description: 'custom text',       // (defaults to og:description or twitter:description)
            title: value,            // (defaults to og:title or twitter:title)
            message: 'custom email text',     // (only for email sharing)
            subject: 'custom email subject',  // (only for email sharing)
            username: 'koytchaimmo' // (only for twitter sharing)
          }}
        />
        <div class="mb-2"> </div>

      </Popover>
    </div >
  );
};

export default BasicPopover;
