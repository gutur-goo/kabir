import { TextField } from "@mui/material";
import React from "react";

const TextInput = ({ label , handleChange = () => {}}) => {
    return (
      <div style={{ marginTop: 20 , marginLeft : 30,backgroundColor:'white'}}>
        <TextField onChange={e => {handleChange(e.target.value)}} id="outlined-basic" label={`${label}`} variant="outlined" />
      </div>
    );
  };

export default TextInput;