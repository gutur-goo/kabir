import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomerDetailsTabInvoice from "../../CustomerDetailsTabInvoice";

const columns = [
  { field: "id", headerName: "S No.", flex: 1 },
  { field: "customer", headerName: "Customer", flex: 1 },
  { field: "outstanding", headerName: "Outstanding Amount", flex: 1 },
];

const dummyData = [
  {
    id: "1",
    customer: "VCL LLC",
    outstanding: "2500",
    outstandingInvoices : [{invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO'}]
  },
  {
    id: "2",
    customer: "ABL Enterprises",
    outstanding: "500",
    outstandingInvoices : [{invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO'}]
  },
  {
    id: "3",
    customer: "DART Logistics",
    outstanding: "4500",
    outstandingInvoices : [{invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO'}]
  },
  {
    id: "4",
    customer: "VILMAR GROUP",
    outstanding: "2100",
    outstandingInvoices : [{invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO',invoiceNumber : 'INVFKDJHIO'}]
  },
];

const InvoiceScreen = () => {
  const [customerSelect, setCustomerSelect] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleRowClick = (e) => {
    setRowData(e.row);
    setCustomerSelect(true);
  };

  return (
    <React.Fragment>
      <h1 style={{ display: "flex", justifyContent: "center" }}>INVOICING</h1>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div style={{ height: 700, width: "30%" }}>
          <DataGrid
            onRowClick={handleRowClick}
            rows={dummyData}
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
