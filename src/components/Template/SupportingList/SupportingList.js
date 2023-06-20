import React, { useEffect, useRef } from "react";
import "./SupportingList.css";
import Header from "../../../assets/templateHeaders/InvoiceHeader.jpg";
import Footer from "../../../assets/templateHeaders/InvoiceFooter.jpg";
import Logo from "../../../assets/images/logo.png";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";

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
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
  {
    Date: "2023-03-01",
    Description: "JEBEL ALI PORT to VTS IND AREA",
    Container: "REGU509688",
    Vehicle: "88614 DXB",
    InvoiceNumber: "KT230331-359",
    Customer: "VTS Clima LLC",
    DeliveryDate: "2023-03-01",
    Qty: "1",
    Rate: "400",
    VAT: "5",
    Amount: "420",
  },
];

const SupportingListTemplate = (props) => {

  const {
    customerName = "",
    invoiceNo = "",
    rowData = "",
  } = JSON.parse(localStorage.getItem('supporting_data'));

  localStorage.removeItem('supporting_data');

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  // useEffect(() => {
  //   handlePrint();
  // },[]);

  const handleDownload = () => {
    const element = document.getElementById("html-content");
    const opt = {
      // margin: 1,
      filename: `SUPPORT_${invoiceNo}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    handleDownload();
    // const timeout = setTimeout(() => {
    //   window.close();
    // }, 1000);
    // return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      class="invoice-box"
      id="html-content"
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={Header} style={{width:'100%'}} />
      <h1 style={{marginTop:30,marginBottom:30}}>SUPPORTING LIST</h1>
      <div>
          <p>
            <b>Customer :</b>
            <span
              style={{ width: "30%", marginLeft: 5 }}
            >{customerName}</span>
          </p>
          <p style={{ display: "flex" }}>
            <b>Invoice Number :</b>
            <span
              style={{marginLeft: 5 }}
            >{invoiceNo}</span>
          </p>
        </div>
      <table style={{ width: "100%", marginTop: 30, textAlign: "center" }}>
        <tr>
          <th>SI.No</th>
          <th>Date</th>
          <th>Description</th>
          <th>Container</th>
          <th>Vehicle</th>
          {/* <th>Invoice No.</th>
          <th>Customer</th> */}
          <th>Delivery Date</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT</th>
          <th>Amount</th>
        </tr>
        {rowData.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.container}</td>
              <td>{item.vehicle}</td>
              {/* <td>{item.invoiceNo}</td>
              <td>{item.customer}</td> */}
              <td>{item.deliveryDate}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.vat}</td>
              <td>{item.amount}</td>
            </tr>
          );
        })}
      </table>
      <img src={Footer} style={{width:'100%',marginTop:40}} />
    </div>
  );
};

export default SupportingListTemplate;
