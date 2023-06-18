import { Backdrop, Box, CircularProgress, Modal, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ContainedButton from "../ContainedButton/ContainedButton";
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { generateInvoice, getExpensesOfType } from "../../services/Actions";
import DropDown from "../DropDown/DropDown";

const columns = [
  { field: "jobSerialNo", headerName: "Job Serial No.",width: 100},
  { field: "jobDate", headerName: "Job Date" },
  { field: "customerName", headerName: "Customer",width: 200 },
  { field: "jobNumber", headerName: "Job Number",width: 150 },
  { field: "jobTypeName", headerName: "Job Type",width:100 },
  { field: "referenceName", headerName: "Reference",width:150 },
  { field: "remarks", headerName: "Remarks" ,width:150},
  { field: "container", headerName: "Container",width:150 },
  { field: "containerStatus", headerName: "Container Status" ,width:120},
  { field: "fromName", headerName: "From",width:150 },
  { field: "toName", headerName: "To",width:150 },
  { field: "driverInName", headerName: "Driver IN",width:150},
  { field: "vehicleInName", headerName: "Vehicle IN",width:150 },
  { field: "driverOutName", headerName: "Driver OUT",width:150 },
  { field: "vehicleOutName", headerName: "Vehicle OUT",width:150 },
  { field: "rate", headerName: "Rate" ,width:100},
  { field: "token", headerName: "Token" ,width:100},
  { field: "inspection", headerName: "Inspection" ,width:100},
  { field: "mecrec", headerName: "Mecrec" ,width:100},
  { field: "detention", headerName: "Detention" ,width:100},
  { field: "transporterName", headerName: "Transport",width:150 },
  { field: "doVal", headerName: "DO Value" },
  { field: "storage", headerName: "Storage" },
  { field: "containerSize", headerName: "Container Size" },
  { field: "jobVAT", headerName: "VAT" },
];

const columnsForExpenseData = [
  { field: "id", headerName: "S No." ,flex : 1},
  { field: "remarks", headerName: "Remarks" ,flex : 1},
  { field: "amount", headerName: "Amount" ,flex : 1},
  { field: "date", headerName: "Date" ,flex : 1}
]

const vatData = [
  {
    name : "5 %",
    id : true
  },
  {
    name : "0 %",
    id : false
  }
]

const InvoicePopUp = ({handleClose,style,jobsListForInvoicing = [],customerData = {},setVATVisible,notInvoice=false,rowData}) => {

  const [selectedJobs,setSelectedJobs] = useState([]);
  const [invoiceDate,setInvoiceDate] = useState();
  const [vatType,setVatType] = useState(true);
  const [expenseTypeData,setExpenseTypeData] = useState([]);
  const [showLoader,setShowLoader] = useState(true);

  useEffect(() => {
    if(notInvoice)
    {
      getExpensesOfType(rowData.id).then(res => {
        setExpenseTypeData(res.data);
        setShowLoader(false);
      })
    }
  },[]);

  const generateInvoiceFromJobs = () => {
    const payload = {
      invoiceDate : invoiceDate === null || isNaN(invoiceDate.$D) ? "" : (invoiceDate.$D+"-"+(invoiceDate.$M+1)+"-"+invoiceDate.$y),
      jobsList : selectedJobs,
      vatAmount : vatType ? 5.0 : 0.0,
      customerId : customerData.customerId
    };
    generateInvoice(payload).then(res => {
    localStorage.setItem('invoice_data',JSON.stringify(res.data.invoiceResponseData));
    localStorage.setItem('supporting_data',JSON.stringify(res.data.supportingResponseData));
    const timeout = setTimeout(() => {
      window.location.reload();
      window.open(window.location.href+"invoice");
      window.open(window.location.href+"supporting");
    }, 500);
    return () => clearTimeout(timeout);
    });
  }

  const toggleVat = (vat) => {
    setVATVisible(vat);
    setVatType(vat);
  }
  
  const TableView = useCallback(({jobsListForInvoicing = []}) => {
    return (
      <Box sx={{ height: 400, width: '100%' , marginTop:2 }}>
        <DataGrid
          rows={jobsListForInvoicing}
          getRowId={(row) => row.jobId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={setSelectedJobs}
          disableRowSelectionOnClick
        />
      </Box>
    );
  },[]);
  
  const CalenderSelect = ({ label, handleChange, value }) => {
      return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
            <div style={{ marginTop: 10, marginLeft: 30, backgroundColor: "white"}}>
              <DatePicker
                value={invoiceDate}
                label={"Invoice Date"}
                onChange={setInvoiceDate}
              />
              </div>
            </DemoContainer>
          </LocalizationProvider>
      );
    };

    console.log("columnsForExpenseData ----> ",expenseTypeData)

  return (
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!notInvoice ? <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Jobs
          </Typography>
          <DropDown
          // noCustomWidth={true}
          label={`VAT TYPE`}
          value={vatType}
          handleChange={toggleVat}
          data={vatData}
        />
          <TableView jobsListForInvoicing={jobsListForInvoicing} />
          <CalenderSelect />
          <div style={{ marginTop: 20 }}>
            <ContainedButton
              handleClick={generateInvoiceFromJobs}
              label={"Generate Invoice"}
            />
          </div>
        </Box>
      :
      <Box sx={style}>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`All Expenses against ${rowData.name}`}
          </Typography>
          <div style={{ height: 400, width: "100%" ,marginTop:10}}>
          <DataGrid
          // onRowClick={handleRowClick}
          rows={expenseTypeData}
          getRowId={(row) => row.id}
          columns={columnsForExpenseData}
          pageSize={12}
          slots={{ toolbar: GridToolbar }}
        />
        </div>
        </Box>  
      }
      </Modal>
    )
}

export default InvoicePopUp;