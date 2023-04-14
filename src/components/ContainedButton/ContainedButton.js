import { Button } from "@mui/material";
import React from "react";

const ContainedButton = ({label,Icon,handleClick}) => {
    return (
      <Button onClick={handleClick} variant="contained" endIcon={Icon ? <Icon /> : null} style={{marginLeft:10,marginTop:10,height:40}}>
          {label}
      </Button>
    )
  }

export default ContainedButton;