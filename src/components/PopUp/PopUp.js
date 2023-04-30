import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import ContainedButton from "../ContainedButton/ContainedButton";
import DropDown from "../DropDown/DropDown";

const dummyContainerStatus = [
    {
      name: "LANDED",
    },
    { name: "PULLED" },
    { name: "COMPLETED" },
  ];

const PopUp = ({ popUpType, handleClick,manageNewEntries,isMobile=false}) => {

    const [name,setName] = useState('');
    const [TRN,setTRN] = useState('');
    const [customerContact,setCustomerContact] = useState('');
    const [customerAddress,setCustomerAddress] = useState('');
    const [emiratesID,setEmiratesID] = useState('');
    const [driverID,setDriverID] = useState('');
    const [driverContact,setDriverContact] = useState('');
    const [containerStatus,setContainerStatus] = useState('');

    const submitData = () => {
      const data = {
        name : name,
        TRN : TRN,
        customerContact : customerContact,
        customerAddress : customerAddress,
        emiratesID : emiratesID,
        driverID : driverID,
        driverContact : driverContact,
        containerStatus : containerStatus
      }
      manageNewEntries(data);
      handleClick();
    }

    return (
        <React.Fragment>
        <div onClick={handleClick} style ={{backgroundColor : 'rgba(0,0,0,0.93)',width:'100%',height:'100%',position:'absolute',zIndex:5,opacity:0.9}} />
        <div style={{backgroundColor:'white',position:'absolute',zIndex:6,width:isMobile ? '70%' : '30%',height:null,left:isMobile ? '10%' : '35%',top:'40%',borderRadius:4,padding:20}}>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <h3>{`Add a New ${popUpType}`}</h3>
        {popUpType != 'ContainerStatus' && <TextInput label={'Enter Name'} handleChange={setName} />}
        {popUpType == 'Customer' && <TextInput label={'Enter TRN Number'} handleChange={setTRN} /> }
        {popUpType == 'Customer' && <TextInput label={'Enter Customer Contact'} handleChange={setCustomerContact} /> }
        {popUpType == 'Customer' && <TextInput label={'Enter Customer Address'} handleChange={setCustomerAddress} /> }
        {popUpType == 'Driver' && <TextInput label={'Enter Emirates ID'} handleChange={setEmiratesID} /> }
        {popUpType == 'Driver' && <TextInput label={'Enter Driver ID'} handleChange={setDriverID} /> }
        {popUpType == 'Driver' && <TextInput label={'Enter Driver Contact'} handleChange={setDriverContact} /> }
        {popUpType == 'ContainerStatus' && 
        <div style={{width:'50%'}}>
        <DropDown noCustomWidth={true} data={dummyContainerStatus} handleChange={setContainerStatus} label={'Edit Container Status'} />
        </div>
         }
        <ContainedButton handleClick={submitData} label='Submit' />
        </div>
        </div>
        </React.Fragment>
    )
}

export default PopUp;