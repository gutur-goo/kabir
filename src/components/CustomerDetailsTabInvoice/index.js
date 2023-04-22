import React, { useState } from "react";
import ActionAreaCard from "../Card/Card";
import { Typography } from "@mui/material";
import ModalFullScreen from "../Modal/Modal";

const CustomerDetailsTabInvoice = ({customerData={}}) => {

    const [showModal,setShowModal] = useState(false);

    const generateInvoice = () => {
        window.open(window.location.href+`invoice`);
        window.open(window.location.href+`supporting`);
    }

    const generateOutstanding = () => {
        window.open(window.location.href+`outstanding`);
    }

    const generatePayment = () => {
        setShowModal(true);
    }

    const generatePayRC = () => {
        setShowModal(false);
        window.open(window.location.href+`paymentrc`);
    }

    return (
        <div>
            {showModal && <ModalFullScreen handleClick={generatePayRC} handleClose={() => {setShowModal(false)}} style={{padding:10,position:'absolute',backgroundColor:'white',top:'35%',left:'42%'}} /> }
            <div style={{marginBottom:'10%',marginLeft:'10%'}}>
            <Typography variant="h5" component="h10">
            Customer Name : {customerData.customer}
            </Typography>
            <Typography variant="h5" component="h2">
            Outstanding Amount : {customerData.outstanding}
            </Typography>
            <Typography variant="h5" component="h2">
            Outstanding Invoices : INV-2H43KHF, INV-28404BV, INV-2384920
            </Typography>
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
            <div style={{marginLeft:50,marginRight:50}}>
            <ActionAreaCard handleClick={generateInvoice} heading={'Generate Invoice'} subheading={'Generates the invoice of the current month transactions with this customer in addition with Supportings'} />
            </div>
            <div style={{marginLeft:50,marginRight:50}}>
            <ActionAreaCard handleClick={generateOutstanding} heading={'Generate Outstanding Reciept'} subheading={'Generates the reciept of total outstandings of this customer'} />
            </div>
            <div style={{marginLeft:50,marginRight:50}}>
            <ActionAreaCard handleClick={generatePayment} heading={'Generate Payment Reciept'} subheading={'Generates the payment reciept for an invoice of this customer'} />
            </div>
            </div>
        </div>

    )
}

export default CustomerDetailsTabInvoice;