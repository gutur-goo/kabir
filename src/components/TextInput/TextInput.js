import { TextField } from "@mui/material";
import React from "react";

const TextInput = ({ label , handleChange = () => {},value = null}) => {
    return (
      <div style={{ marginTop: 20 , marginLeft : 30,backgroundColor:'white'}}>
        <TextField value={value} onChange={e => {handleChange(e.target.value)}} id="outlined-basic" label={`${label}`} variant="outlined" />
      </div>
    );
  };

export default TextInput;