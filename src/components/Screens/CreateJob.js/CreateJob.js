import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ResetImage from '../../../assets/images/eraser-solid.svg';
import AddJobImage from '../../../assets/images/location-arrow-solid.svg';
import TruckIcon from '../../../assets/images/truckImage.jpg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextInput from "../../TextInput/TextInput";
import DropDown from "../../DropDown/DropDown";
import PopUp from "../../PopUp/PopUp";
import ContainedButton from "../../ContainedButton/ContainedButton";
import RadioButtons from "../../RadioButtons/RadioButtons";

const CreateJob = ({isMobile}) => {

  const [customerList,setCustomerList] = useState([]);
  const [customer,setCustomer] = useState('');
  const [jobNumber , setJobNumber] = useState('');
  const [jobTypeList,setJobTypeList] = useState([]);
  const [jobType , setJobType] = useState('');
  const [referenceList,setReferenceList] = useState([]);
  const [reference , setReference] = useState('');
  const [remarks , setRemarks] = useState('');
  const [container , setContainer] = useState('');
  const [containerStatus , setContainerStatus] = useState('');
  const [from , setFrom] = useState('');
  const [to , setTo] = useState('');
  const [rate , setRate] = useState('');
  const [token , setToken] = useState('');
  const [inspection , setInspection] = useState('');
  const [mecrec , setMecrec] = useState('');
  const [detention , setDetention] = useState('');
  const [driverList , setDriverList] = useState([]);
  const [vehicleList , setVehicleList] = useState([]);
  const [vehicleIn , setVehicleIn] = useState('');
  const [vehicleOut , setVehicleOut] = useState('');
  const [driverIn , setDriverIn] = useState('');
  const [driverOut , setDriverOut] = useState('');
  const [transportList , setTransportList] = useState([]);
  const [transport , setTransport] = useState('');
  const [doValue , setDoValue] = useState('');
  const [storage , setStorage] = useState('');
  const [containerSize , setContainerSize] = useState('');
  const [VAT , setVAT] = useState('5');
  const [registerForStatus,setRegisterForStatus] = useState(false);
  const [showPopUp , setShowPopUp] = useState(false);
  const [popUpType,setPopUpType] = useState('');

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

  const OutlinedButton = ({label,Icon}) => {
    return (
      <Button variant="outlined" startIcon={Icon ? <Icon style={{color:'white'}}/> : null} style={{marginLeft:10,marginTop:10,height:40,color:'white'}}>
          {label}
      </Button>
    )
  }

  const Buttons = () => {
    return (
      <React.Fragment>
        <div style={{marginBottom:20}}>
        <OutlinedButton label="Reset" Icon={ResetIcon} />
        <ContainedButton label="Create Job" Icon={AddJobIcon} />
        </div>
      </React.Fragment>
    );
  };

  const CalenderSelect = ({label,handleChange}) => {
    return (
      <div style={{ marginTop: 10 , marginLeft : 30,backgroundColor:'white'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} onChange={e => {handleChange(e.$d)}} />
      </DemoContainer>
    </LocalizationProvider>
    </div>
    )
  }

  console.log("VAT ",registerForStatus)

  return (
    <React.Fragment>
      {showPopUp && <PopUp popUpType={popUpType} handleClick={() => setShowPopUp(false)}  />}
      <img src={TruckIcon}  style={{width: '100%',height:'100%',opacity:0.9}} />
    <div style={{position:'absolute',left:40,top:'21%'}}>
    <h1 style={{marginLeft:20,color:'white'}}>CREATE A JOB!</h1>
    <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <DropDown label="Customer" handleChange={setCustomer} />
      <div style={{marginTop:20}}>
      <ContainedButton label="New Customer" handleClick={() => {setShowPopUp(true);setPopUpType('Customer')}} />
      </div>
      <TextInput label="Job no." handleChange={setJobNumber}  />
      <DropDown label="Job Type" handleChange={setJobType} />
      <div style={{marginTop:20}}>
      <ContainedButton label="New Job Type" handleClick={() => {setShowPopUp(true);setPopUpType('JobType')}} />
      </div>
      <DropDown label="Reference" handleChange={setReference} />
      <div style={{marginTop:20}}>
      <ContainedButton label="New Reference" handleClick={() => {setShowPopUp(true);setPopUpType('Reference')}} />
      </div>
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <TextInput label="Remarks" handleChange={setRemarks} />
      <TextInput label="Container" handleChange={setContainer} />
      <DropDown label="Container Status" handleChange={setContainerStatus} />
      <TextInput label="From" handleChange={setFrom} />
      <TextInput label="To" handleChange={setTo} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <TextInput label="Rate" handleChange={setRate} />
      <TextInput label="Token" handleChange={setToken} />
      <TextInput label="Inspection" handleChange={setInspection} />
      <TextInput label="Mecrec" handleChange={setMecrec} />
      <TextInput label="Detention" handleChange={setDetention} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex',marginLeft:20}}>
      <ContainedButton label="New Driver" handleClick={() => {setShowPopUp(true);setPopUpType('Driver')}} />
      <ContainedButton label="New Vehicle" handleClick={() => {setShowPopUp(true);setPopUpType('Vehicle')}} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <DropDown label="Driver IN" handleChange={setDriverIn} />
      <DropDown label="Vehicle IN" handleChange={setVehicleIn} />
      <DropDown label="Driver OUT" handleChange={setDriverOut} />
      <DropDown label="Vehicle OUT" handleChange={setVehicleOut} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <DropDown label="Transport" handleChange={setTransport} />
      <div style={{marginTop:20}}>
      <ContainedButton label="New Transport" handleClick={() => {setShowPopUp(true);setPopUpType('Transport')}} />
      </div>
      <CalenderSelect label="DO Val" handleChange={setDoValue} />
      <CalenderSelect label="Storage" handleChange={setStorage} />
      <DropDown label="Container Size" handleChange={setContainerSize} />
      </div>
      <div style={{display:'flex' , flexDirection : 'column' , marginLeft:20,marginTop:10}}>
      <RadioButtons setVAT={setVAT} />
      <FormControlLabel onChange={() => {setRegisterForStatus(!registerForStatus)}} style={{color:'white'}} control={<Checkbox style={{color:'white'}}/>} label="Register for Container Status" />
      </div>
      <Buttons />
    </div>
    </React.Fragment>
  );
};

export default CreateJob;
