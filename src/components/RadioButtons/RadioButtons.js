import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const RadioButtons = ({setVAT,value=null}) => {
    return (
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">VAT</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel onChange={() => {setVAT('5')}} value="female" control={<Radio/>} label="Include 5% VAT" />
    <FormControlLabel onChange={() => {setVAT('0')}} value="male" control={<Radio/>} label="Don't include VAT" />
  </RadioGroup>
</FormControl>
    )
}

export default RadioButtons;