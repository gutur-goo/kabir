import React, { useState, useEffect } from 'react'
import { DataGrid , GridToolbar } from '@mui/x-data-grid'
import EditJob from '../EditJob/EditJob';
import PopUp from '../../PopUp/PopUp';
import DropDown from '../../DropDown/DropDown';
import TextInput from '../../TextInput/TextInput';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ContainedButton from '../../ContainedButton/ContainedButton';
import { addPayment, addPaymentType, getPaymentsTotal, getPaymentType } from '../../../services/Actions';
import { Backdrop, CircularProgress } from '@mui/material';
import InvoicePopUp from '../../InvoicePopUp/InvoicePopUp';

const columns = [
  { field: 'id', headerName: 'S No.' , flex : 1},
  { field: 'name', headerName: 'Payment Type' , flex : 1},
  { field: 'total_amount', headerName: 'Amount' , flex : 1}
]

const dummyData = [{ 
    id:'1', 
  name : 'Workshop',
  total_amount : '400',
  remarks : 'REGULAR MAINTAINANCE AT DXB WORKSHOP',
  date : '2023-03-02'
},
{ 
    id:'2', 
  name : 'Toll',
  total_amount : '100',
  remarks : 'TOLL AT DXB ABU DHABI HGHWY',
  date : '2023-03-22'
},
{ 
    id:'3', 
  name : 'Diesel',
  total_amount : '2200',
  remarks: '2ND WEEK DIESEL',
  date : '2023-03-14'
}];

const dummyType = [
    {name : 'Workshop'},
    {name : 'Toll'},
    {name : 'Diesel'}
]

const ExpensesScreen = () => {

  const [editContainerStatus,setEditContainerStatus] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [rowData,setRowData] = useState({});

  const [expenseTypes,setExpenseTypes] = useState([]);
  const [totalExpenses,setTotalExpenses] = useState([]);
  const [selectedExpenseType,setSelectedExpenseType] = useState("");
  const [amount,setAmount] = useState("");
  const [remarks,setRemarks] = useState("");
  const [expenseDate,setExpenseDate] = useState(null);
  const [showLoader,setShowLoader] = useState(true);

  const handleRowClick = (e) => {
    setRowData(e.row);
    setShowModal(true);
  }

  const getData = () => {
    getPaymentsTotal().then(res => {
      console.log("res 1 -> ",res);
      setTotalExpenses(res.data);
    }).catch(err => console.log(err));
    getPaymentType().then(res => {
      console.log("res 2 -> ",res);
      setExpenseTypes(res.data);
      setShowLoader(false);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getData();
  },[]);

  const CalenderSelect = ({label,handleChange,value}) => {
    return (
      <div style={{ marginTop: 10 , marginLeft : 30,backgroundColor:'white'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={value} label={label} onChange={e => {handleChange(e)}} />
      </DemoContainer>
    </LocalizationProvider>
    </div>
    )
  }

  const addnewExpenseType = (data) => {
    const payload = {
      PaymentTypeName : data.name
    }
    setShowLoader(true);
    addPaymentType(payload).then(res => {
      setShowLoader(false);
      getData();
    });
    setEditContainerStatus(false);
  }

  const submitExpense = () => {
    const payload = {
      paymentTypeId : selectedExpenseType,
      amount : amount,
      date : expenseDate.$D+"-"+(expenseDate.$M+1)+"-"+expenseDate.$y,
      remarks : remarks
    }
    addPayment(payload).then(res => {
      setShowLoader(true);
      getData();
    })
  }

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showModal && <InvoicePopUp handleClose={() => {setShowModal(false)}} rowData={rowData} notInvoice={true} isPayment={true} style={{padding:10,position:'absolute',backgroundColor:'white',top:'10%',width:'70%',left:'12%'}} /> }
    {editContainerStatus && <PopUp manageNewEntries={addnewExpenseType} popUpType = {'Payment Type'} handleClick={() => {setEditContainerStatus(false)}} /> }
    <h1 style={{display:'flex',justifyContent:'center'}}>PAYMENTS</h1>
    <div style={{display:'flex',flexDirection:'row'}}>
    <div style={{flex:1,width:'30%'}}>
        <h3 style={{marginLeft:25}}>Add a New Payment</h3>
        <div style={{width:'300%',display:'flex',flexDirection:'row'}}>
        <DropDown label={`Payment Type`}
          value={selectedExpenseType}
          handleChange={setSelectedExpenseType}
          data={expenseTypes}  
          isID={true}
          />
        <div style={{marginTop:15}}>
        <ContainedButton label={`Add new Payment Type`} handleClick={() => {setEditContainerStatus(true)}} />
        </div>
        </div>
        <div style={{width:'45%'}}>
        <TextInput value={amount} handleChange={setAmount} label={`Amount`} />
        <TextInput value={remarks} handleChange={setRemarks} label={`Remarks`} />
        <CalenderSelect value={expenseDate} label={`Payment Date`} handleChange={setExpenseDate} />
        </div>
        <div style={{marginLeft:20,marginTop:10}}>
        <ContainedButton label={`Submit Payment`} handleClick={submitExpense} />
        </div>
    </div>
    <div style={{ height: 700, width: '70%' }}>
      <DataGrid
        onRowClick={handleRowClick}
        rows={totalExpenses}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
    </div>
    </React.Fragment>
  )
}

export default ExpensesScreen