import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const DropDown = ({label,handleChange}) => {
    return (
      <div style={{marginTop:20,marginLeft:30,width:'10%',backgroundColor:'white'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Customer"
          onChange={(e) => { handleChange(e.target.value) }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </div>
    );
  };

export default DropDown;