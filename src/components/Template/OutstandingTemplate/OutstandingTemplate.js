import React, { useEffect, useRef } from "react";
import "./OutstandingTemplate.css";
import Header from "../../../assets/templateHeaders/InvoiceHeader.webp";
import Footer from "../../../assets/templateHeaders/InvoiceFooter.webp";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

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
    invoiceNumber: "KT-230228-347",
    invoiceDate : "2023-02-28",
    amount: "19530",
    days: "1 months, 10 days",
  },
  {
	invoiceNumber: "KT-230331-355",
    invoiceDate : "2023-03-31",
    amount: "15624",
    days: "0 months, 9 days",
  }
];

const OutstandingTemplate = () => {
  const {
    customerId='',
      customerName='',
      customerTRN='',
      customerAddress='',
      rowData='',
      total='',
  } = JSON.parse(localStorage.getItem('outstanding_data'));

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  // useEffect(() => {
  //   handlePrint();
  // },[]);

  // localStorage.removeItem('outstanding_data')
	// let invoiceAmount = 0;
	// let taxableValue = 0;
	// let VATAmount = 0;
	// let grossAmount = 0;

  const handleDownload = () => {
    const element = document.getElementById('html-content');
    const opt = {
      // margin: 1,
      filename: `OUTSTANDING_${customerName}.pdf`,
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
    <div class="invoice-box" id="html-content" >
      <img src={Header} style={{width:'100%'}}/>
      <h1 style={{display:'flex',justifyContent:'center',marginBottom:30,marginTop:30}}>OUTSTANDING STATEMENT</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginLeft: 30 }}>
          <p>
            <b>Customer :</b>{" "}
            <span
              style={{ width: "30%", marginLeft: 5 }}
            >{customerName}</span>
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
      </div>
      <table style={{ width: "100%", marginTop: 30, textAlign: "center" }}>
        <tr>
          <th>SI.No</th>
          <th>Invoice No</th>
          <th>Invoice Date</th>
          <th>Amount</th>
          <th>No. of days</th>
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
              <td>{index+1}</td>
              <td>{item.invoiceNo}</td>
              <td>{item.invoiceDate}</td>
              <td>{item.amount}</td>
              <td>{item.noOfDays}</td>
            </tr>
          );
        })}
		<tr>
              <td></td>
              <td></td>
              <td>{`Total`}</td>
              <td><b>{total}</b></td>
            </tr>
      </table>
	  <p style={{marginTop:20}}>{`Amount in words : ${numToWords(35154)} Dirhams`}</p>
      <img src={Footer} style={{width:'100%',marginTop:40}} />
    </div>
  );
};

export default OutstandingTemplate;
