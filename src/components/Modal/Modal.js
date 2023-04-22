import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import TextInput from "../TextInput/TextInput";
import ContainedButton from "../ContainedButton/ContainedButton";
import DropDown from "../DropDown/DropDown";

const dummyInvoiceNumbers = [
    {
        name : 'INV-163849'
    },
    {
        name : 'INV-173849'
    },
    {
        name : 'INV-975932'
    }
]

const ModalFullScreen = ({handleClose,style,handleClick}) => {
    return (
<Modal
  open={true}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx = {style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Enter the following payment details
    </Typography>
    <DropDown noCustomWidth={true} label={`INVOICE NUMBER`} data={dummyInvoiceNumbers} />
    <TextInput label={'Payment Date'} />
    <TextInput label={'Payment Mode'} />
    <TextInput label={'Remarks'} />
    <div style={{marginTop:20}}>
    <ContainedButton handleClick={handleClick} label={'Register & Generate Payment Reciept'} />
    </div>
  </Box>
</Modal>
    )
}

export default ModalFullScreen;