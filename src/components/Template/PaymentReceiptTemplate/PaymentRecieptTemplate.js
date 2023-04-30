import React from "react";
import "./PaymentRecieptTemplate.css";
import Header from "../../../assets/templateHeaders/InvoiceHeader.png";
import Footer from "../../../assets/templateHeaders/InvoiceFooter.png";
import Logo from "../../../assets/images/logo.png";

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

const PaymentReceiptTemplate = () => {
  let invoiceAmount = 0;
  let taxableValue = 0;
  let VATAmount = 0;
  let grossAmount = 0;

  return (
    <div
      class="invoice-box"
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={Logo} />
      <h2>Payment Reciept</h2>
      <div
      style={{
        marginLeft:'20%'
      }}
      >
      <p>Customer Name : <span><b>AW ROSTAMANI LOGISTICS</b></span></p>
      <p>Invoice No : <span><b>KT-221231-328</b></span></p>
      <p>Amount: <span><b>19530</b></span></p>
      <p>
        Amount in words : <span><b>Nineteen Thousands Five Hundred and Thirty Dirhams</b></span>
      </p>
      <p>Date : <span><b>2023-02-21</b></span></p>
      <p>Method Ref# : <span><b>21-02-23 Ch#043780 MASHREQ BANK</b></span></p>
      </div>
      <h4>The above payment has been recieved</h4>
    </div>
  );
};

export default PaymentReceiptTemplate;