import React, { useEffect, useRef } from "react";
import "./PaymentRecieptTemplate.css";
import Header from "../../../assets/templateHeaders/InvoiceHeader.jpg";
import Footer from "../../../assets/templateHeaders/InvoiceFooter.jpg";
import Logo from "../../../assets/images/logo.png";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

function numToWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

  if (num === 0) return "zero";

  const sign = num < 0 ? "minus " : "";
  num = Math.abs(num);

  let integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let words = "";
  if (integerPart === 0) {
    words = "zero";
  } else {
    let i = 0;
    while (integerPart > 0) {
      const chunk = integerPart % 1000;
      if (chunk !== 0) {
        const chunkWords = chunkToWords(chunk, ones, tens, teens);
        const chunkSuffix = thousands[i];
        words = chunkWords + " " + chunkSuffix + " " + words;
      }
      integerPart = Math.floor(integerPart / 1000);
      i++;
    }
  }

  if (decimalPart > 0) {
    words += " point " + chunkToWords(decimalPart, ones, tens, teens);
  }

  return sign + words.trim();
}

function chunkToWords(num, ones, tens, teens) {
  let words = "";
  if (num >= 100) {
    words += ones[Math.floor(num / 100)] + " hundred ";
    num %= 100;
  }
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + " " + ones[num % 10] + " ";
  } else if (num >= 10) {
    words += teens[num - 10] + " ";
  } else if (num > 0) {
    words += ones[num] + " ";
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

const PaymentReceiptTemplate = React.forwardRef((props, ref) => {

  const {
    customerName='',
    invoiceNumber='',
    amount='',
    amountInWords='',
    date='',
    methodReference='',
  } = JSON.parse(localStorage.getItem('payment_data'));

  localStorage.removeItem('payment_data');

  const handleDownload = () => {
    const element = document.getElementById('html-content');
    const opt = {
      // margin: 1,
      filename: `PAYMENT_${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    handleDownload();
    const timeout = setTimeout(() => {
      window.close();
    },1000);
    return () => clearTimeout(timeout);
  },[]);

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  // useEffect(() => {
  //   handlePrint();
  // },[]);

  return (
    <div
      class="invoice-box"
      id='html-content'
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={Header} style={{width:'100%'}} />
      <h1 style={{marginTop:30,marginBottom:30}}>PAYMENT RECIEPT</h1>
      <div
      >
      <p>Customer Name : <span><b>{customerName}</b></span></p>
      <p>Invoice No : <span><b>{invoiceNumber}</b></span></p>
      <p>Amount: <span><b>{amount}</b></span></p>
      <p>
        Amount in words : <span><b>{amountInWords}</b></span>
      </p>
      <p>Date : <span><b>{date}</b></span></p>
      <p>Method Ref# : <span><b>{methodReference}</b></span></p>
      </div>
      <h4>The above payment has been recieved</h4>
      <img src={Footer} style={{width:'100%' , marginTop:30}} />
    </div>
  );
});

export default PaymentReceiptTemplate;
