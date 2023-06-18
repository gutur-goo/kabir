import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomerDetailsTabInvoice from "../../CustomerDetailsTabInvoice";
import { getOutstandings } from "../../../services/Actions";
import { Backdrop, CircularProgress } from "@mui/material";

const columns = [
  { field: "customerId", headerName: "S No.", flex: 1 },
  { field: "customerName", headerName: "Customer", flex: 1 },
  { field: "totalOutstanding", headerName: "Outstanding Amount", flex: 1 },
];

const InvoiceScreen = () => {

  const [customerOutstandings,setCustomerOutstandings] = useState([]);

  useEffect(() => {
    getOutstandings().then(res => {
      setCustomerOutstandings(res.data);
      setShowLoader(false);
    })
  },[]);

  const [customerSelect, setCustomerSelect] = useState(false);
  const [rowData, setRowData] = useState({});
  const [showLoader, setShowLoader] = useState(true);

  const handleRowClick = (e) => {
    setRowData(e.row);
    setCustomerSelect(true);
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
      <h1 style={{ display: "flex", justifyContent: "center" }}>INVOICING</h1>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ height: 700, width: "30%" }}>
          <DataGrid
            onRowClick={handleRowClick}
            rows={customerOutstandings}
            getRowId={(row) => row.customerId}
            columns={columns}
            disableColumnResize={true}
            pageSize={12}
            style={{ display: "flex", flex: 1, width: "100%" }}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
        {!customerSelect ? <div style={{marginLeft:'30%'}}>Select a customer from the table!</div> : <CustomerDetailsTabInvoice customerData={rowData} />}
      </div>
    </React.Fragment>
  );
};

export default InvoiceScreen;
