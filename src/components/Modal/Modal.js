import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import ContainedButton from "../ContainedButton/ContainedButton";
import DropDown from "../DropDown/DropDown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const dummyInvoiceNumbers = [
  {
    name: "INV-163849",
  },
  {
    name: "INV-173849",
  },
  {
    name: "INV-975932",
  },
];

const ModalFullScreen = ({
  handleClose,
  style,
  handleClick,
  oustandingInvoices,
  customerData,
}) => {

  const [selectedInvoice,setSelectedInvoice] = useState("");
  const [paymentDate, setPaymentDate] = useState();
  const [paymentMode,setPaymentMode] = useState("");
  const [remarks,setRemarks] = useState("");

  const CalenderSelect = ({ label, handleChange, value }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs }>
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

  const generatePayRc = () => {
    const payload = {
      "customerId": customerData.customerId,
    "invoiceId":selectedInvoice,
    "methodReference": paymentMode,
    "receiptDate": paymentDate.$D+"-"+(paymentDate.$M+1)+"-"+paymentDate.$y,
    }
    handleClick(payload);
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter the following payment details
        </Typography>
        <DropDown
          noCustomWidth={true}
          label={`INVOICE NUMBER`}
          value={selectedInvoice}
          handleChange={setSelectedInvoice}
          data={oustandingInvoices}
        />
        <CalenderSelect 
         value={paymentDate}
         label="Payment Date"
         handleChange={setPaymentDate}
        />
        <TextInput label={"Payment Mode"} handleChange={setPaymentMode} value={paymentMode} />
        {/* <TextInput label={"Remarks"} handleChange={setRemarks} value={remarks} /> */}
        <div style={{ marginTop: 20 }}>
          <ContainedButton
            handleClick={generatePayRc}
            label={"Register & Generate Payment Reciept"}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default ModalFullScreen;
