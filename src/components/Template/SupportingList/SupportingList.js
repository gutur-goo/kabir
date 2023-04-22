import React from "react";
import "./SupportingList.css";
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
    "Date" : "2023-03-01",
    "Description" : "JEBEL ALI PORT to VTS IND AREA",
    "Container" : "REGU509688", 
    "Vehicle" : "88614 DXB",
    "InvoiceNumber" : "KT230331-359",
    "Customer": "VTS Clima LLC",
    "DeliveryDate" : "2023-03-01", 
    "Qty":"1", 
    "Rate" : "400", 
    "VAT" : "5", 
    "Amount" : "420"
    },
    {
      "Date" : "2023-03-01",
      "Description" : "JEBEL ALI PORT to VTS IND AREA",
      "Container" : "REGU509688", 
      "Vehicle" : "88614 DXB",
      "InvoiceNumber" : "KT230331-359",
      "Customer": "VTS Clima LLC",
      "DeliveryDate" : "2023-03-01", 
      "Qty":"1", 
      "Rate" : "400", 
      "VAT" : "5", 
      "Amount" : "420"
      },
      {
        "Date" : "2023-03-01",
        "Description" : "JEBEL ALI PORT to VTS IND AREA",
        "Container" : "REGU509688", 
        "Vehicle" : "88614 DXB",
        "InvoiceNumber" : "KT230331-359",
        "Customer": "VTS Clima LLC",
        "DeliveryDate" : "2023-03-01", 
        "Qty":"1", 
        "Rate" : "400", 
        "VAT" : "5", 
        "Amount" : "420"
        },
        {
          "Date" : "2023-03-01",
          "Description" : "JEBEL ALI PORT to VTS IND AREA",
          "Container" : "REGU509688", 
          "Vehicle" : "88614 DXB",
          "InvoiceNumber" : "KT230331-359",
          "Customer": "VTS Clima LLC",
          "DeliveryDate" : "2023-03-01", 
          "Qty":"1", 
          "Rate" : "400", 
          "VAT" : "5", 
          "Amount" : "420"
          },
          {
            "Date" : "2023-03-01",
            "Description" : "JEBEL ALI PORT to VTS IND AREA",
            "Container" : "REGU509688", 
            "Vehicle" : "88614 DXB",
            "InvoiceNumber" : "KT230331-359",
            "Customer": "VTS Clima LLC",
            "DeliveryDate" : "2023-03-01", 
            "Qty":"1", 
            "Rate" : "400", 
            "VAT" : "5", 
            "Amount" : "420"
            },
            {
              "Date" : "2023-03-01",
              "Description" : "JEBEL ALI PORT to VTS IND AREA",
              "Container" : "REGU509688", 
              "Vehicle" : "88614 DXB",
              "InvoiceNumber" : "KT230331-359",
              "Customer": "VTS Clima LLC",
              "DeliveryDate" : "2023-03-01", 
              "Qty":"1", 
              "Rate" : "400", 
              "VAT" : "5", 
              "Amount" : "420"
              },
              {
                "Date" : "2023-03-01",
                "Description" : "JEBEL ALI PORT to VTS IND AREA",
                "Container" : "REGU509688", 
                "Vehicle" : "88614 DXB",
                "InvoiceNumber" : "KT230331-359",
                "Customer": "VTS Clima LLC",
                "DeliveryDate" : "2023-03-01", 
                "Qty":"1", 
                "Rate" : "400", 
                "VAT" : "5", 
                "Amount" : "420"
                },
                {
                  "Date" : "2023-03-01",
                  "Description" : "JEBEL ALI PORT to VTS IND AREA",
                  "Container" : "REGU509688", 
                  "Vehicle" : "88614 DXB",
                  "InvoiceNumber" : "KT230331-359",
                  "Customer": "VTS Clima LLC",
                  "DeliveryDate" : "2023-03-01", 
                  "Qty":"1", 
                  "Rate" : "400", 
                  "VAT" : "5", 
                  "Amount" : "420"
                  },
                  {
                    "Date" : "2023-03-01",
                    "Description" : "JEBEL ALI PORT to VTS IND AREA",
                    "Container" : "REGU509688", 
                    "Vehicle" : "88614 DXB",
                    "InvoiceNumber" : "KT230331-359",
                    "Customer": "VTS Clima LLC",
                    "DeliveryDate" : "2023-03-01", 
                    "Qty":"1", 
                    "Rate" : "400", 
                    "VAT" : "5", 
                    "Amount" : "420"
                    },
                    {
                      "Date" : "2023-03-01",
                      "Description" : "JEBEL ALI PORT to VTS IND AREA",
                      "Container" : "REGU509688", 
                      "Vehicle" : "88614 DXB",
                      "InvoiceNumber" : "KT230331-359",
                      "Customer": "VTS Clima LLC",
                      "DeliveryDate" : "2023-03-01", 
                      "Qty":"1", 
                      "Rate" : "400", 
                      "VAT" : "5", 
                      "Amount" : "420"
                      },
                      {
                        "Date" : "2023-03-01",
                        "Description" : "JEBEL ALI PORT to VTS IND AREA",
                        "Container" : "REGU509688", 
                        "Vehicle" : "88614 DXB",
                        "InvoiceNumber" : "KT230331-359",
                        "Customer": "VTS Clima LLC",
                        "DeliveryDate" : "2023-03-01", 
                        "Qty":"1", 
                        "Rate" : "400", 
                        "VAT" : "5", 
                        "Amount" : "420"
                        }
];

const SupportingListTemplate = () => {
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
      <h2>Supporting list</h2>
      <table style={{ width: "100%", marginTop: 30, textAlign: "center" }}>
        <tr>
          <th>SI.No</th>
          <th>Date</th>
          <th>Description</th>
          <th>Container</th>
          <th>Vehicle</th>
          <th>Invoice No.</th>
          <th>Customer</th>
          <th>Delivery Date</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT</th>
          <th>Amount</th>
        </tr>
        {tableData.map((item, index) => {
			return (
            <tr>
              <td>{index+1}</td>
              <td>{item.Date}</td>
              <td>{item.Description}</td>
              <td>{item.Container}</td>
              <td>{item.Vehicle}</td>
              <td>{item.InvoiceNumber}</td>
              <td>{item.Customer}</td>
              <td>{item.DeliveryDate}</td>
              <td>{item.Qty}</td>
              <td>{item.Rate}</td>
              <td>{item.VAT}</td>
              <td>{item.Amount}</td>
            </tr>
          );
        })}
        </table>
    </div>
  );
};

export default SupportingListTemplate;
