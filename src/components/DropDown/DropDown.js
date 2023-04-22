import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const DropDown = ({label,handleChange = () => {},value=null,data=[],noCustomWidth = false}) => {
    return (
      <div style={{marginTop:20,marginLeft:30,width:noCustomWidth ? null : '10%' ,backgroundColor:'white'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Customer"
          value={value}
          onChange={(e) => { handleChange(e.target.value) }}
        >
          {
            data.map((item,index) => {
              return (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      </div>
    );
  };

export default DropDown;