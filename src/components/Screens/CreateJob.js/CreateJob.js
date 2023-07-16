import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
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
import React, { useEffect, useState } from "react";
import ResetImage from "../../../assets/images/eraser-solid.svg";
import AddJobImage from "../../../assets/images/location-arrow-solid.svg";
import TruckIcon from "../../../assets/images/truckImage.jpg";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextInput from "../../TextInput/TextInput";
import DropDown from "../../DropDown/DropDown";
import PopUp from "../../PopUp/PopUp";
import ContainedButton from "../../ContainedButton/ContainedButton";
import RadioButtons from "../../RadioButtons/RadioButtons";
import PlusImage from "../../../assets/images/plus-solid.svg";
import Api from "../../../services/Api";
import { apiDomain } from "../../../services/constants";
import {
  getCustomerData,
  getDriverData,
  getFromData,
  getToData,
  getJobTypeData,
  getReferenceData,
  getTransporterData,
  getVehicleData,
  postCustomerData,
  postDriverData,
  postFromToData,
  postJobData,
  postJobTypeData,
  postReferenceData,
  postTransporterData,
  postVehicleData,
} from "../../../services/Actions";

const dummyContainerStatus = [
  {
    id: "LANDED",
    name : "LANDED"
  },
  { id: "PULLED" ,
    name : "PULLED"
},
  { id: "COMPLETED" ,
    name : "COMPLETED"
},
{
  id: "PENDING",
  name: "PENDING"
}
];

const dummyVATList = [{ name: "5",id: "5.00" }, { name: "0",id: "0.00" }]
const dummyStatusList = [{ name: "Yes",id: true }, { name: "No",id: false }]

const dummyContainerSize = [
  {
    id: "0",
    name: "0"
  },
  {
    id: "20",
    name : "20",
  },
  { id: "40" , name : "40"},
];

const CreateJob = ({
  isMobile = false,
  editJob = false,
  rowData = {},
  cancelCallBack = null,
}) => {


  const getAllData = () => {
    const timeout = setTimeout(() => {
      const promises = [
        getCustomerData(),
        getJobTypeData(),
        getReferenceData(),
        getTransporterData(),
        getDriverData(),
        getVehicleData(),
        getFromData(),
        getToData()
      ];
      Promise.allSettled(promises)
        .then((res) => {
          res.forEach((result, index) => {
            switch (index) {
              case 0:
                setCustomerList(result.value.data);
                break;
              case 1:
                setJobTypeList(result.value.data);
                break;
              case 2:
                setReferenceList(result.value.data);
                break;
              case 3:
                setTransportList(result.value.data);
                break;
              case 4:
                setDriverList(result.value.data);
                break;
              case 5:
                setVehicleList(result.value.data);
                break;
              case 6:
                setPickData(result.value.data);
              case 7:
                setDropData(result.value.data);
                setShowLoader(false);
                break;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
    return () => timeout;
  }

  useEffect(() => {
    getAllData();
  }, []);

  const createJobwithData = () => {
    const payload = {
      jobId: rowData?.jobId || null,
      customer: customer,
      jobNumber: jobNumber,
      jobType: jobType,
      reference: reference,
      remarks: remarks,
      container: container,
      containerStatus: containerStatus,
      from: from,
      to: to,
      rate: rate == '' ? 0 : parseInt(rate),
      token: token == '' ? 0 : parseInt(token),
      commission: driverCommision == '' ? 0 : parseInt(driverCommision),
      inspection: inspection == '' ? 0 : parseInt(inspection),
      mecrec: mecrec == '' ? 0 : parseInt(mecrec),
      detention: detention == '' ? 0 : parseInt(detention),
      driverIn: driverIn,
      driverOut: driverOut,
      vehicleIn: vehicleIn,
      vehicleOut: vehicleOut,
      transport: transport,
      jobDate: jobDate === null || isNaN(jobDate.$D) ? (editJob ? rowData.jobDate : "") : (jobDate.$D+"-"+(jobDate.$M+1)+"-"+jobDate.$y),
      doVal: doValue === null || isNaN(doValue.$D) ? (editJob ? rowData.doVal : "") : (doValue.$D+"-"+(doValue.$M+1)+"-"+doValue.$y),
      storage: storage === null || isNaN(storage.$D) ? (editJob ? rowData.storage : "") : storage.$D+"-"+(storage.$M+1)+"-"+storage.$y,
      containerSize: containerSize,
      jobVAT: VAT === "5.00" ? 5 : 0,
      registerContainer: registerForStatus  ? "True" : "False",
    };
    // console.log("Payload -> ",payload)
    postJobData(payload).then(res => {
      window.open(window.location.href,`_self`)
    }).catch(err => {
      console.log("Error ",err)
    })
  };

  console.log("rowdata -> ",rowData)

  const [customerList, setCustomerList] = useState();
  const [customer, setCustomer] = useState(editJob ? rowData.customer : "");
  const [jobNumber, setJobNumber] = useState(editJob ? rowData.jobNumber : "");
  const [jobTypeList, setJobTypeList] = useState();
  const [jobType, setJobType] = useState(editJob ? rowData.jobType : "");
  const [referenceList, setReferenceList] = useState();
  const [reference, setReference] = useState(editJob ? rowData.reference : "");
  const [remarks, setRemarks] = useState(editJob ? rowData.remarks : "");
  const [container, setContainer] = useState(editJob ? rowData.container : "");
  const [containerStatus, setContainerStatus] = useState(
    editJob ? rowData.containerStatus : ""
  );
  const [from, setFrom] = useState(editJob ? rowData.from : "");
  const [to, setTo] = useState(editJob ? rowData.to : "");
  const [rate, setRate] = useState(editJob ? rowData.rate : "");
  const [token, setToken] = useState(editJob ? rowData.token : "");
  const [inspection, setInspection] = useState(
    editJob ? rowData.inspection : ""
  );
  const [mecrec, setMecrec] = useState(editJob ? rowData.mecrec : "");
  const [detention, setDetention] = useState(editJob ? rowData.detention : "");
  const [driverList, setDriverList] = useState();
  const [vehicleList, setVehicleList] = useState();
  const [vehicleIn, setVehicleIn] = useState(editJob ? rowData.vehicleIn : "");
  const [vehicleOut, setVehicleOut] = useState(
    editJob ? rowData.vehicleOut : ""
  );
  const [driverIn, setDriverIn] = useState(editJob ? rowData.driverIn : "");
  const [driverOut, setDriverOut] = useState(editJob ? rowData.driverOut : "");
  const [transportList, setTransportList] = useState();
  const [transport, setTransport] = useState(editJob ? rowData.transporter : "");
  const [doValue, setDoValue] = useState(null);
  const [storage, setStorage] = useState(null);
  const [containerSize, setContainerSize] = useState(
    editJob ? rowData.containerSize.includes('20') ? '20' : '40' : ""
  );
  const [VAT, setVAT] = useState(editJob ? rowData.jobVAT : "5.00");
  const [registerForStatus, setRegisterForStatus] = useState(editJob ? rowData.registerContainer : false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [pickData, setPickData] = useState();
  const [dropData, setDropData] = useState();
  const [driverCommision, setDriverComission] = useState(editJob ? rowData.commission : "");
  const [showLoader, setShowLoader] = useState(true);
  const [jobDate,setJobDate] = useState(null);

  console.log("rowData.VAT -> ",rowData.jobVAT);

  const manageNewEntries = (data) => {
    let payload;
    switch (popUpType) {
      case "Customer":
        payload = {
          customerName: data.name,
          customerTRN: data.TRN,
          customerContact: data.customerContact,
          customerAddress: data.customerAddress,
        };
        postCustomerData(payload);
        break;
      case "JobType":
        payload = {
          jobName: data.name,
        };
        postJobTypeData(payload);
        break;
      case "Reference":
        payload = {
          referenceName: data.name,
        };
        postReferenceData(payload);
        break;
      case "From":
        payload = {
          locationName: data.name,
          locationType:"SOURCE"
        };
        postFromToData(payload);
        break;
      case "To":
        payload = {
          locationName: data.name,
          locationType:"DESTINATION"
        };
        postFromToData(payload);
        break;
      case "Transport":
        payload = {
          transporterName: data.name,
        };
        postTransporterData(payload);
        break;
      case "Driver":
        payload = {
          driverName: data.name,
          driverEID: data.emiratesID,
          driverID: data.driverId,
          driverContact: data.driverContact,
        };
        postDriverData(payload);
        break;
      case "Vehicle":
        payload = {
          vehicleName: data.name,
        };
        postVehicleData(payload);
        break;
    }
    setShowLoader(true);
    getAllData();
  };

  const ResetIcon = () => {
    return <img src={ResetImage} width={"20"} height={"20"} />;
  };

  const AddJobIcon = () => {
    return <img src={AddJobImage} width={"20"} height={"20"} />;
  };

  const OutlinedButton = ({ label, Icon }) => {
    return (
      <Button
        onClick={editJob ? cancelCallBack : null}
        variant="outlined"
        startIcon={Icon ? <Icon /> : null}
        style={{ marginLeft: 10, marginTop: 10, height: 40 }}
      >
        {label}
      </Button>
    );
  };

  const Buttons = () => {
    return (
      <React.Fragment>
        <div style={{ marginTop: 20, marginLeft: 20, marginBottom:20 }}>
          {editJob && (
            <ContainedButton
              handleClick={cancelCallBack}
              label={editJob ? "Cancel Edit" : "Reset"}
              Icon={ResetIcon}
            />
          )}
          <ContainedButton
            handleClick={createJobwithData}
            label={editJob ? "Edit Job" : "Create Job"}
            Icon={AddJobIcon}
          />
        </div>
      </React.Fragment>
    );
  };

  const CalenderSelect = ({ label, handleChange, value }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
          <div style={{ marginTop: 10, marginLeft: 30, backgroundColor: "white"}}>
            <DatePicker
              value={value}
              label={label}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            </div>
          </DemoContainer>
        </LocalizationProvider>
    );
  };

  const PlusIcon = () => {
    return <img src={PlusImage} height={"20"} width={"20"} />;
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showPopUp && (
        <PopUp isMobile={isMobile} popUpType={popUpType} handleClick={() => setShowPopUp(false)} manageNewEntries={manageNewEntries} />
      )}
      {/* {!editJob && <img src={TruckIcon}  style={{width: '100%',height:'100%',opacity:0.9}} />} */}
      {isMobile ? 
        <div>
        <h1 style={{ marginLeft: 20 }}>
          {editJob ? `EDIT THIS JOB!` : `CREATE A JOB!`}
        </h1>
        <div style={{ flexDirection: "row", display: "flex" ,width:'500%'}}>
            <DropDown
              label="Customer"
              value={customer}
              handleChange={setCustomer}
              data={customerList}
            />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  scrollToTop();
                  setShowPopUp(true);
                  setPopUpType("Customer");
                }}
              />
            )}
          </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex" ,width:'500%'}}>
          <DropDown
            label="Job Type"
            value={jobType}
            data={jobTypeList}
            handleChange={setJobType}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("JobType");
                }}
              />
            )}
          </div>
          </div>
          <div style={{width:'60%'}}>
          <CalenderSelect
            value={jobDate}
            label="Job Date"
            handleChange={setJobDate}
          />
          <TextInput
            value={jobNumber}
            label="Job no."
            handleChange={setJobNumber}
          />
          </div>
          <div style={{ flexDirection: "row", display: "flex" , width:'500%' }}>
          <DropDown
            label="Reference"
            value={reference}
            data={referenceList}
            handleChange={setReference}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  scrollToTop();
                  setShowPopUp(true);
                  setPopUpType("Reference");
                }}
              />
            )}
          </div>
        </div>
        <div style={{width:'60%'}}>
        <TextInput
            value={container}
            label="Container"
            handleChange={setContainer}
          />
          </div>
          <div style={{width:'500%'}}>
          <DropDown
            data={dummyContainerStatus}
            value={containerStatus}
            label="Container Status"
            handleChange={setContainerStatus}
          />
          <DropDown
            data={dummyContainerSize}
            value={containerSize}
            label="Container Size"
            handleChange={setContainerSize}
          />
          </div>
          <div style={{width:'60%'}}>
          <CalenderSelect
            value={doValue}
            label="DO Val"
            handleChange={setDoValue}
          />
          <CalenderSelect
            value={storage}
            label="Storage"
            handleChange={setStorage}
          />
          </div>
          <div style={{width:'60%'}}>
          <TextInput
            value={remarks}
            label="Remarks"
            handleChange={setRemarks}
          />
          </div>
        <div style={{ flexDirection: "row", display: "flex",width:'500%' }}>
          <DropDown
            data={pickData}
            value={from}
            label="From"
            handleChange={setFrom}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  scrollToTop();
                  setShowPopUp(true);
                  setPopUpType("Pick-up/Drop Location");
                }}
              />
            )}
          </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex",width:'500%' }}>
          <DropDown
            data={dropData}
            value={to}
            label="To"
            handleChange={setTo}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("To");
                }}
              />
            )}
          </div>
          </div>
           <div style={{ flexDirection: "row", display: "flex",width:'500%' }}>
          <DropDown
            data={transportList}
            value={transport}
            label="Transport"
            handleChange={setTransport}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  scrollToTop();
                  setShowPopUp(true);
                  setPopUpType("Transport");
                }}
              />
            )}
          </div>
        </div>
        <div style={{ flexDirection: "column", display: "flex" , width:'60%' }}>
          <TextInput value={rate} label="Rate" handleChange={setRate} />
          <TextInput value={token} label="Token" handleChange={setToken} />
          <TextInput
            value={inspection}
            label="Inspection"
            handleChange={setInspection}
          />
          <TextInput value={mecrec} label="Mecrec" handleChange={setMecrec} />
          <TextInput
            value={detention}
            label="Detention"
            handleChange={setDetention}
          />
        </div>
        <div style={{ flexDirection: "row", display: "flex",width:'500%' }}>
        <DropDown
            data={vehicleList}
            value={vehicleOut}
            label="Vehicle OUT"
            handleChange={setVehicleOut}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  scrollToTop();
                  setShowPopUp(true);
                  setPopUpType("Vehicle");
                }}
              />
            )}
          </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex",width:'500%' }}>
          <DropDown
            data={driverList}
            value={driverOut}
            label="Driver OUT"
            handleChange={setDriverOut}
          />
          <div style={{ marginTop: 20 }}>
                {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  scrollToTop();
                  setShowPopUp(true);
                  setPopUpType("Driver");
                }}
              />
            )}
          </div>
          </div>
          <div style={{width:'500%'}}>
          <DropDown
            data={vehicleList}
            value={vehicleIn}
            label="Vehicle IN"
            handleChange={setVehicleIn}
          />
          </div>
          <div style={{ width:'500%' }}>
          <DropDown
            data={driverList}
            value={driverIn}
            label="Driver IN"
            handleChange={setDriverIn}
          />
          </div>
          <div style={{width:'60%'}}>
          <TextInput
            value={driverCommision}
            label="Driver Comission"
            handleChange={setDriverComission}
          />
          </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 10,width:'500%' }}>
            <DropDown
              label={"VAT"}
              data={dummyVATList}
              handleChange={setVAT}
              value={VAT}
            />
            {/* <div style={{ marginLeft: 30, marginTop: 25 }}>
              <FormControlLabel
                onChange={() => {
                  setRegisterForStatus(!registerForStatus);
                }}
                control={<Checkbox />}
                label="Register for Container Status"
              />
            </div> */}
            <DropDown
              label={"Register for Container Status"}
              data={dummyStatusList}
              handleChange={setRegisterForStatus}
              value={registerForStatus}
            />
        </div>
        <Buttons />
      </div>
      :
      <div style={{ height: 800 }}>
        <h1 style={{ marginLeft: 20 }}>
          {editJob ? `EDIT THIS JOB!` : `CREATE A JOB!`}
        </h1>
        <div style={{ flexDirection: "row", display: "flex" }}>
            <DropDown
              label="Customer"
              value={customer}
              handleChange={setCustomer}
              data={customerList}
            />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("Customer");
                }}
              />
            )}
          </div>
          <DropDown
            label="Job Type"
            value={jobType}
            data={jobTypeList}
            handleChange={setJobType}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("JobType");
                }}
              />
            )}
          </div>
          <CalenderSelect
            value={jobDate}
            label="Job Date"
            handleChange={setJobDate}
          />
          <TextInput
            value={jobNumber}
            label="Job no."
            handleChange={setJobNumber}
          />
          <DropDown
            label="Reference"
            value={reference}
            data={referenceList}
            handleChange={setReference}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("Reference");
                }}
              />
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <TextInput
            value={container}
            label="Container"
            handleChange={setContainer}
          />
          <DropDown
            data={dummyContainerStatus}
            value={containerStatus}
            label="Container Status"
            handleChange={setContainerStatus}
          />
          <DropDown
            data={dummyContainerSize}
            value={containerSize}
            label="Container Size"
            handleChange={setContainerSize}
          />
          <CalenderSelect
            value={doValue}
            label="DO Val"
            handleChange={setDoValue}
          />
          <CalenderSelect
            value={storage}
            label="Storage"
            handleChange={setStorage}
          />
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <TextInput
            value={remarks}
            label="Remarks"
            handleChange={setRemarks}
          />
          <DropDown
            data={pickData}
            value={from}
            label="From"
            handleChange={setFrom}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("From");
                }}
              />
            )}
          </div>
          <DropDown
            data={dropData}
            value={to}
            label="To"
            handleChange={setTo}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("To");
                }}
              />
            )}
          </div>
          <DropDown
            data={transportList}
            value={transport}
            label="Transport"
            handleChange={setTransport}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("Transport");
                }}
              />
            )}
          </div>
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <TextInput value={rate} label="Rate" handleChange={setRate} />
          <TextInput value={token} label="Token" handleChange={setToken} />
          <TextInput
            value={inspection}
            label="Inspection"
            handleChange={setInspection}
          />
          <TextInput value={mecrec} label="Mecrec" handleChange={setMecrec} />
          <TextInput
            value={detention}
            label="Detention"
            handleChange={setDetention}
          />
        </div>
        <div style={{ flexDirection: "row", display: "flex" }}>
        <DropDown
            data={vehicleList}
            value={vehicleOut}
            label="Vehicle OUT"
            handleChange={setVehicleOut}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("Vehicle");
                }}
              />
            )}
          </div>
        <DropDown
            data={driverList}
            value={driverOut}
            label="Driver OUT"
            handleChange={setDriverOut}
          />
          <div style={{ marginTop: 20 }}>
            {!editJob && (
              <ContainedButton
                Icon={PlusIcon}
                handleClick={() => {
                  setShowPopUp(true);
                  setPopUpType("Driver");
                }}
              />
            )}
          </div>
          <DropDown
            data={vehicleList}
            value={vehicleIn}
            label="Vehicle IN"
            handleChange={setVehicleIn}
          />
          <DropDown
            data={driverList}
            value={driverIn}
            label="Driver IN"
            handleChange={setDriverIn}
          />
          <TextInput
            value={driverCommision}
            label="Driver Comission"
            handleChange={setDriverComission}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
            <DropDown
              label={"VAT"}
              data={dummyVATList}
              handleChange={setVAT}
              value={VAT}
            />
            {/* <div style={{ marginLeft: 10, marginTop: 25 }}> */}
              {/* <FormControlLabel
                onChange={(e) => {
                  console.log("e --------> ",e)
                  setRegisterForStatus(!registerForStatus);
                }}
                control={<Checkbox onChange={e => console.log("Eeeeeeeeeee- > ")} />}
                label="Register for Container Status"
              /> */}
              <DropDown
              label={"Register for Container Status"}
              data={dummyStatusList}
              handleChange={setRegisterForStatus}
              value={registerForStatus}
            />
            {/* </div> */}
        </div>
        <Buttons />
      </div>}
    </React.Fragment>
  );
};

export default CreateJob;
