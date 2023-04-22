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

const dummyCustomers = [
  {
    name: "VCL LLC",
  },
  { name: "DXB PPC" },
  { name: "ABU DHABI LOGISTICS" },
];

const dummyJobTypes = [
  {
    name: "FLAT",
  },
  { name: "CONTAINER" },
];

const dummyReferences = [
  {
    name: "BROTHER",
  },
  { name: "AMIT" },
];

const dummyContainerStatus = [
  {
    name: "LANDED",
  },
  { name: "PULLED" },
  { name: "COMPLETED" },
];

const dummyDrivers = [
  {
    name: "AMAN",
  },
  { name: "ANKIT" },
  { name: "RAHUL" },
];
const dummyVehicles = [
  {
    name: "B4564DXB",
  },
  { name: "B4564DX1" },
  { name: "B4564RNF" },
];
const dummyTransport = [
  {
    name: "TPR1",
  },
  { name: "TPR2" },
  { name: "TPR3" },
];
const dummyContainerSize = [
  {
    name: "20",
  },
  { name: "40" },
];

const CreateJob = ({isMobile,editJob=false,rowData={},cancelCallBack=null}) => {

  const [customerList,setCustomerList] = useState(dummyCustomers);
  const [customer,setCustomer] = useState(editJob ? rowData.customer : '');
  const [jobNumber , setJobNumber] = useState(editJob ? rowData.jobNumber : '');
  const [jobTypeList,setJobTypeList] = useState(dummyJobTypes);
  const [jobType , setJobType] = useState(editJob ? rowData.jobType : '');
  const [referenceList,setReferenceList] = useState(dummyReferences);
  const [reference , setReference] = useState(editJob ? rowData.reference : '');
  const [remarks , setRemarks] = useState(editJob ? rowData.remarks : '');
  const [container , setContainer] = useState(editJob ? rowData.container : '');
  const [containerStatus , setContainerStatus] = useState(editJob ? rowData.containerStatus : '');
  const [from , setFrom] = useState(editJob ? rowData.from : '');
  const [to , setTo] = useState(editJob ? rowData.to : '');
  const [rate , setRate] = useState(editJob ? rowData.rate : '');
  const [token , setToken] = useState(editJob ? rowData.token : '');
  const [inspection , setInspection] = useState(editJob ? rowData.inspection : '');
  const [mecrec , setMecrec] = useState(editJob ? rowData.mecrec : '');
  const [detention , setDetention] = useState(editJob ? rowData.detention : '');
  const [driverList , setDriverList] = useState(dummyDrivers);
  const [vehicleList , setVehicleList] = useState(dummyVehicles);
  const [vehicleIn , setVehicleIn] = useState(editJob ? rowData.vehicleIn : '');
  const [vehicleOut , setVehicleOut] = useState(editJob ? rowData.vehicleOut : '');
  const [driverIn , setDriverIn] = useState(editJob ? rowData.driverIn : '');
  const [driverOut , setDriverOut] = useState(editJob ? rowData.driverOut : '');
  const [transportList , setTransportList] = useState(dummyTransport);
  const [transport , setTransport] = useState(editJob ? rowData.transport : '');
  const [doValue , setDoValue] = useState(editJob ? rowData.doValue : '');
  const [storage , setStorage] = useState(editJob ? rowData.storage : '');
  const [containerSize , setContainerSize] = useState(editJob ? rowData.containerSize : '');
  const [VAT , setVAT] = useState(editJob ? rowData.VAT : '5');
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
      <Button onClick={editJob ? cancelCallBack : null } variant="outlined" startIcon={Icon ? <Icon style={{color:'white'}}/> : null} style={{marginLeft:10,marginTop:10,height:40,color:'white'}}>
          {label}
      </Button>
    )
  }

  const Buttons = () => {
    return (
      <React.Fragment>
        <div style={{marginBottom:20}}>
        <OutlinedButton label={editJob ? "Cancel Edit" : "Reset"} Icon={ResetIcon} />
        <ContainedButton handleClick={editJob ? () => {cancelCallBack();alert('Job Edited Successfully!!')} : () => {alert('Job Created Successfully!!');window.open(window.location.href,`_self`)} } label={editJob ? "Edit Job" : "Create Job"} Icon={AddJobIcon} />
        </div>
      </React.Fragment>
    );
  };

  const CalenderSelect = ({label,handleChange,value}) => {
    return (
      <div style={{ marginTop: 10 , marginLeft : 30,backgroundColor:'white'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={value} label={label} onChange={e => {handleChange(e.$d)}} />
      </DemoContainer>
    </LocalizationProvider>
    </div>
    )
  }

  return (
    <React.Fragment>
      {showPopUp && <PopUp popUpType={popUpType} handleClick={() => setShowPopUp(false)}  />}
      {!editJob && <img src={TruckIcon}  style={{width: '100%',height:'100%',opacity:0.9}} />}
    <div style={{position:'absolute',left:40,top:'21%',width:'100%'}}>
    <h1 style={{marginLeft:20,color:'white'}}>{ editJob ? `EDIT THIS JOB!` : `CREATE A JOB!`}</h1>
    <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <DropDown label="Customer" value={customer} handleChange={setCustomer} data={customerList} />
      <div style={{marginTop:20}}>
      {!editJob && <ContainedButton label="New Customer" handleClick={() => {setShowPopUp(true);setPopUpType('Customer')}} />}
      </div>
      <TextInput value={jobNumber} label="Job no." handleChange={setJobNumber}  />
      <DropDown label="Job Type" value={jobType} data={jobTypeList} handleChange={setJobType} />
      <div style={{marginTop:20}}>
      {!editJob && <ContainedButton label="New Job Type" handleClick={() => {setShowPopUp(true);setPopUpType('JobType')}} />}
      </div>
      <DropDown label="Reference" value={reference} data={referenceList} handleChange={setReference} />
      <div style={{marginTop:20}}>
      {!editJob && <ContainedButton label="New Reference" handleClick={() => {setShowPopUp(true);setPopUpType('Reference')}} />}
      </div>
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <TextInput value={remarks} label="Remarks" handleChange={setRemarks} />
      <TextInput value={container} label="Container" handleChange={setContainer} />
      <DropDown data={dummyContainerStatus} value={containerStatus} label="Container Status" handleChange={setContainerStatus} />
      <TextInput value={from} label="From" handleChange={setFrom} />
      <TextInput value={to} label="To" handleChange={setTo} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <TextInput value={rate} label="Rate" handleChange={setRate} />
      <TextInput value={token} label="Token" handleChange={setToken} />
      <TextInput value={inspection} label="Inspection" handleChange={setInspection} />
      <TextInput value={mecrec} label="Mecrec" handleChange={setMecrec} />
      <TextInput value={detention} label="Detention" handleChange={setDetention} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex',marginLeft:20}}>
      {!editJob && <ContainedButton label="New Driver" handleClick={() => {setShowPopUp(true);setPopUpType('Driver')}} />}
      {!editJob && <ContainedButton label="New Vehicle" handleClick={() => {setShowPopUp(true);setPopUpType('Vehicle')}} />}
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <DropDown data={driverList} value={driverIn} label="Driver IN" handleChange={setDriverIn} />
      <DropDown data={vehicleList} value={vehicleIn} label="Vehicle IN" handleChange={setVehicleIn} />
      <DropDown data={driverList} value={driverOut} label="Driver OUT" handleChange={setDriverOut} />
      <DropDown data={vehicleList} value={vehicleOut} label="Vehicle OUT" handleChange={setVehicleOut} />
      </div>
      <div style={{ flexDirection : 'row' , display : 'flex'}}>
      <DropDown data={transportList} value={transport} label="Transport" handleChange={setTransport} />
      <div style={{marginTop:20}}>
      {!editJob && <ContainedButton label="New Transport" handleClick={() => {setShowPopUp(true);setPopUpType('Transport')}} />}
      </div>
      <CalenderSelect value={doValue} label="DO Val" handleChange={setDoValue} />
      <CalenderSelect value={storage} label="Storage" handleChange={setStorage} />
      <DropDown data={dummyContainerSize} value={containerSize} label="Container Size" handleChange={setContainerSize} />
      </div>
      <div style={{display:'flex' , flexDirection : 'column' , marginLeft:20,marginTop:10}}>
      {!editJob && <RadioButtons value={VAT} setVAT={setVAT} />}
      {!editJob && <FormControlLabel onChange={() => {setRegisterForStatus(!registerForStatus)}} style={{color:'white'}} control={<Checkbox style={{color:'white'}}/>} label="Register for Container Status" />}
      </div>
      <Buttons />
    </div>
    </React.Fragment>
  );
};

export default CreateJob;
