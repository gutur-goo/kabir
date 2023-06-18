import React, { useEffect, useState } from "react";
import ActionAreaCard from "../Card/Card";
import { Typography } from "@mui/material";
import ModalFullScreen from "../Modal/Modal";
import InvoicePopUp from "../InvoicePopUp/InvoicePopUp";
import { generateOutstanding, generatePaymentReciept, getNonInvoicedJobs } from "../../services/Actions";

const CustomerDetailsTabInvoice = ({customerData={}}) => {
    const [showModal,setShowModal] = useState(false);
    const [showInvoicePopUp,setShowInvoicePopUp] = useState(false);
    const [jobsListForInvoicing, setJobsListForInvoicing] = useState([]);
    const [oustandingInvoices, setOutstandingInvoices] = useState([]);
    const [VATVisible,setVATVisible] = useState(true);

    useEffect(() => {
        getNonInvoicedJobs(customerData.customerId,VATVisible ? 5 : 0).then(res => {
            setJobsListForInvoicing(res.data);
        })
    },[customerData,VATVisible]);

    useEffect(() => {
        setOutstandingInvoices([]);
        generateOutstanding(customerData.customerId).then(res => {
            let outstandingsList = [];
            res.data.rowData.map(item => {
                outstandingsList = [...outstandingsList , {name : item.invoiceNo,id : item.invoiceId}]
            });
            setOutstandingInvoices(outstandingsList);
            localStorage.setItem('outstanding_data',JSON.stringify(res.data));
        })
    },[customerData])

    const generateInvoice = () => {
        setShowInvoicePopUp(true);
    }

    const generateOutstandingInvoice = () => {
        window.open(window.location.href+`outstanding`);
    }

    const generatePayment = () => {
        setShowModal(true);
    }

    const generatePayRC = (payload) => {
        generatePaymentReciept(payload).then(res => {
            localStorage.setItem('payment_data',JSON.stringify(res.data));
        })
        setShowModal(false);
        const timeout = setTimeout(() => {
            window.location.reload();
            window.open(window.location.href+`paymentrc`);
        }, 500);

        return () => clearTimeout(timeout);
    }

    return (
        <div>
            {showModal && <ModalFullScreen customerData={customerData} oustandingInvoices={oustandingInvoices} handleClick={generatePayRC} handleClose={() => {setShowModal(false)}} style={{padding:10,position:'absolute',backgroundColor:'white',top:'35%',left:'42%'}} /> }
            {showInvoicePopUp && <InvoicePopUp setVATVisible={setVATVisible} customerData={customerData} jobsListForInvoicing={jobsListForInvoicing} handleClose={() => {setShowInvoicePopUp(false)}} style={{padding:10,position:'absolute',backgroundColor:'white',top:'10%',width:'70%',left:'12%'}} /> }
            <div style={{marginBottom:'10%',marginLeft:'10%'}}>
            <Typography variant="h5" component="h10">
            Customer Name : {customerData.customerName}
            </Typography>
            <Typography variant="h5" component="h2">
            Outstanding Amount : {customerData.totalOutstanding} AED
            </Typography>
            <div style={{display:'flex',flexDirection:'row'}}>
            <Typography variant="h5" component="h2">
            Outstanding Invoices : 
            </Typography>
            {oustandingInvoices.map(item => <Typography variant="h5" component="h2">{`${item.name}, `}</Typography>)}
            </div>
            </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
            <div style={{marginLeft:50,marginRight:50}}>
            <ActionAreaCard handleClick={generateInvoice} heading={'Generate Invoice'} subheading={'Generates the invoice of the current month transactions with this customer in addition with Supportings'} />
            </div>
            <div style={{marginLeft:50,marginRight:50}}>
            <ActionAreaCard handleClick={generateOutstandingInvoice} heading={'Generate Outstanding Reciept'} subheading={'Generates the reciept of total outstandings of this customer'} />
            </div>
            <div style={{marginLeft:50,marginRight:50}}>
            <ActionAreaCard handleClick={generatePayment} heading={'Generate Payment Reciept'} subheading={'Generates the payment reciept for an invoice of this customer'} />
            </div>
            </div>
        </div>

    )
}

export default CustomerDetailsTabInvoice;