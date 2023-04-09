import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import ResetImage from '../../../assets/images/eraser-solid.svg';
import AddJobImage from '../../../assets/images/location-arrow-solid.svg';
import TruckIcon from '../../../assets/images/truckImage.jpg';

const CreateJob = ({isMobile}) => {
  const CustomerSelect = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Customer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Customer"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const TextInput = ({ label }) => {
    return (
      <div style={{ marginTop: 10 }}>
        <TextField id="outlined-basic" label={`${label}`} variant="outlined" />
      </div>
    );
  };

  const ResetIcon = () => {
    return (
        <img src={ResetImage} width={"20"} height={"20"} />
    )
  }

  const AddJobIcon = () => {
    return (
        <img src={AddJobImage} width={"20"} height={"20"} />
    )
  }

  const Buttons = () => {
    return (
      <React.Fragment>
        <div style={{marginTop:20,marginBottom:20}}>
        <Button variant="outlined" startIcon={<ResetIcon />} style={{marginRight:20,marginLeft:-20}}>
          Reset
        </Button>
        <Button variant="contained" endIcon={<AddJobIcon />} style={{marginLeft:20}}>
          Create Job
        </Button>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
        {!isMobile && <img src={TruckIcon} width={"50%"}  style={{borderRadius:8,marginTop:50,marginLeft:20}} />}
    <div style={{ position: "absolute", left: isMobile ? "10%" : "65%", top:"20%" }}>
    <h1 style={{marginLeft:20}}>CREATE A JOB!</h1>
      <CustomerSelect />
      <div style={{flexDirection:'row'}}>
      <TextInput label="Job no." />
      <TextInput label="Truck Details" />
      </div>
      <TextInput label="Driver Details" />
      <TextInput label="From" />
      <TextInput label="To" />
      <TextInput label="Pricing" />
      <TextInput label="Customizable Rates" />
      <TextInput label="Tax on Rate" />
      <Buttons />
    </div>
    </React.Fragment>
  );
};

export default CreateJob;
