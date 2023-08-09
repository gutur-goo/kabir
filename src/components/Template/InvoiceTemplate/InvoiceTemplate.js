import React, { useEffect, useRef } from "react";
import "./InvoiceTemplate.css";
import Header from "../../../assets/templateHeaders/InvoiceHeader.webp";
import Footer from "../../../assets/templateHeaders/InvoiceFooter.webp";
import html2pdf from "html2pdf.js";
import {connect} from 'react-redux';
import { useReactToPrint } from "react-to-print";

function numToWords(num) {
	const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
	const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
	const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
	const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  
	if (num === 0) return 'zero';
  
	const sign = num < 0 ? 'minus ' : '';
	num = Math.abs(num);
  
	let integerPart = Math.floor(num);
	const decimalPart = Math.round((num - integerPart) * 100);
  
	let words = '';
	if (integerPart === 0) {
	  words = 'zero';
	} else {
	  let i = 0;
	  while (integerPart > 0) {
		const chunk = integerPart % 1000;
		if (chunk !== 0) {
		  const chunkWords = chunkToWords(chunk, ones, tens, teens);
		  const chunkSuffix = thousands[i];
		  words = chunkWords + ' ' + chunkSuffix + ' ' + words;
		}
		integerPart = Math.floor(integerPart / 1000);
		i++;
	  }
	}
  
	if (decimalPart > 0) {
	  words += ' point ' + chunkToWords(decimalPart, ones, tens, teens);
	}
  
	return sign + words.trim();
  }
  
  function chunkToWords(num, ones, tens, teens) {
	let words = '';
	if (num >= 100) {
	  words += ones[Math.floor(num / 100)] + ' hundred ';
	  num %= 100;
	}
	if (num >= 20) {
	  words += tens[Math.floor(num / 10)] + ' ' + ones[num % 10] + ' ';
	} else if (num >= 10) {
	  words += teens[num - 10] + ' ';
	} else if (num > 0) {
	  words += ones[num] + ' ';
	}
	return words.trim();
  }
	  
  

const tableData = [
  {
    Description: "INSPECTION CHARGES-LCL/CONTAINER",
    Qty: "1",
    Rate: "100",
    VAT: "5",
  },
  {
	Description: "TRANSPORTATION CHARGE-IMPORT CONTAINER",
    Qty: "6",
    Rate: "400",
    VAT: "5",
  },
  {
	Description: "MECRC CHARGES-CONTAINER",
    Qty: "1",
    Rate: "105",
    VAT: "5",
  },
  {
	Description: "MECRC CHARGES-CONTAINER",
    Qty: "1",
    Rate: "35",
    VAT: "5",
  },
];

const InvoiceTemplate = (props) => {
const {
  rowData=[],
  invoiceAmount='',
  taxableValue='',
  totalVatAmount='',
  grossAmount='',
  customer='',
  customerTRN='',
  invoiceDate='',
  invoiceNo='',
  customerAddress='',
  grossAmountInWords= '',
} = JSON.parse(localStorage.getItem('invoice_data')) || {};

localStorage.removeItem('invoice_data');

	// let invoiceAmount = 0;
	// let taxableValue = 0;
	// let VATAmount = 0;
	// let grossAmount = 0;

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  // useEffect(() => {
  //   // handlePrint();
  // },[]);

  const handleDownload = () => {
    const element = document.getElementById('html-content');
    const opt = {
      // margin: 1,
      filename: `${invoiceNo}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    handleDownload();
    // const timeout = setTimeout(() => {
    //   window.close();
    // },1000);
    // return () => clearTimeout(timeout);
  },[]);

  return (
    <div class="invoice-box" id="html-content">
      <img src={Header} style={{ width: "100%" }} />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 30,
          marginTop: 30,
        }}
      >
        TAX INVOICE
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <div style={{ marginLeft: 30 }}>
          <p>
            <b>Customer :</b>{" "}
            <span
              style={{ width: "30%", marginLeft: 5 }}
            >{customer}</span>
          </p>
          <p style={{ display: "flex" }}>
            <b>Address :</b>
            <span
              style={{ width: "30%", marginLeft: 5 }}
            >{customerAddress}</span>
          </p>
          <p>
            <b>Customer TRN : </b>
            {customerTRN}
          </p>
        </div>
        <div>
          <p>
            <b>Invoice Date : </b>
            {invoiceDate}
          </p>
          <p>
            <b>Invoice Number : </b>
            {invoiceNo}
          </p>
          <p>
            <b>Kabir TRN : </b>
            {`100451512600003`}
          </p>
        </div> */}
        <table style={{borderWidth:0}}>
          <tr>
            <th style={{borderWidth:0,textAlign:'left'}}>Customer </th>
            <th style={{borderWidth:0,textAlign:'left'}}> : </th>
            <td style={{borderWidth:0,textAlign:'left'}}>{customer} </td>
          </tr>
          <tr>
            <th style={{borderWidth:0,textAlign:'left'}}>Address </th>
            <th style={{borderWidth:0,textAlign:'left'}}> : </th>
            <td style={{borderWidth:0,textAlign:'left',width:'77%',lineHeight:1}}>{customerAddress}</td>
          </tr>
          <tr>
            <th style={{borderWidth:0,textAlign:'left'}}>Customer TRN </th>
            <th style={{borderWidth:0,textAlign:'left'}}> : </th>
            <td style={{borderWidth:0,textAlign:'left'}}>{customerTRN}</td>
          </tr>
        </table>
        <table style={{borderWidth:0}}>
          <tr>
            <th style={{borderWidth:0,textAlign:'left'}}>Invoice Date </th>
            <th style={{borderWidth:0,textAlign:'left'}}> : </th>
            <td style={{borderWidth:0,textAlign:'left'}}>{invoiceDate} </td>
          </tr>
          <tr>
            <th style={{borderWidth:0,textAlign:'left',width:'40%',lineHeight:1}}>Invoice Number </th>
            <th style={{borderWidth:0,textAlign:'left'}}> : </th>
            <td style={{borderWidth:0,textAlign:'left'}}>{invoiceNo}</td>
          </tr>
          <tr>
            <th style={{borderWidth:0,textAlign:'left'}}>Kabir TRN </th>
            <th style={{borderWidth:0,textAlign:'left'}}> : </th>
            <td style={{borderWidth:0,textAlign:'left'}}>{`100451512600003`}</td>
          </tr>
        </table>
      </div>
      <table style={{ width: "100%", marginTop: 30, textAlign: "center" }}>
        <tr>
          <th style={{textAlign:'left',paddingLeft:10}}>SI.No</th>
          <th style={{textAlign:'left',paddingLeft:10}}>Description</th>
          <th style={{textAlign:'left',paddingLeft:10}}>Qty</th>
          <th style={{textAlign:'left',paddingLeft:10}}>Rate</th>
          <th style={{textAlign:'left',paddingLeft:10}}>VAT %</th>
          <th style={{textAlign:'left',paddingLeft:10}}>Total VAT</th>
          <th style={{textAlign:'left',paddingLeft:10}}>Total Amount</th>
        </tr>
        {rowData.map((item, index) => {
          // invoiceAmount = invoiceAmount + parseInt(item.Rate)*parseInt(item.Qty);
          // taxableValue = taxableValue + (item.VAT == '5' ? parseInt(item.Rate)*parseInt(item.Qty) : 0)
          // const vat = item.VAT == '0' ? 0 : (parseInt(item.Rate) * 0.05);
          // VATAmount = VATAmount + (vat*parseInt(item.Qty));
          // const total = (parseInt(item.Rate)*parseInt(item.Qty)) + (item.VAT == '0' ? 0 : (parseInt(item.Rate) * 0.05)*parseInt(item.Qty));
          // grossAmount = grossAmount + total;
          return (
            <tr>
              <td style={{textAlign:'left',paddingLeft:10}}>{index + 1}</td>
              <td style={{textAlign:'left',paddingLeft:10}}>{item.description}</td>
              <td style={{textAlign:'left',paddingLeft:10}}>{item.quantity}</td>
              <td style={{textAlign:'left',paddingLeft:10}}>{item.rate}</td>
              <td style={{textAlign:'left',paddingLeft:10}}>{item["vat%"]}</td>
              <td style={{textAlign:'left',paddingLeft:10}}>{item.totalVat}</td>
              <td style={{textAlign:'left',paddingLeft:10}}>{item.totalAmount}</td>
            </tr>
          );
        })}
        <tr>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{`Invoice Amount`}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>
            <b>{invoiceAmount}</b>
          </td>
        </tr>
        <tr>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{`Taxable Value`}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>
            <b>{taxableValue}</b>
          </td>
        </tr>
        <tr>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{`VAT Amount`}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>
            <b>{totalVatAmount}</b>
          </td>
        </tr>
        <tr>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>{""}</td>
          <td style={{textAlign:'left',paddingLeft:10}}>
            <b>{`Gross Amount`}</b>
          </td>
          <td style={{textAlign:'left',paddingLeft:10}}>
            <b>{`AED ${grossAmount}`}</b>
          </td>
        </tr>
      </table>
      <p
        style={{ marginTop: 20 }}
      >{`Amount in words : ${grossAmountInWords}`}</p>
      <img src={Footer} style={{ marginTop: 70, width: "100%" }} />
    </div>
  );
};

export default InvoiceTemplate;
