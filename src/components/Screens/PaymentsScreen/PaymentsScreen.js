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

const columns = [
  { field: 'id', headerName: 'S No.' , flex : 1},
  { field: 'expenseType', headerName: 'Payment Type' , flex : 1},
  { field: 'amount', headerName: 'Amount' , flex : 1},
  { field: 'remarks', headerName: 'Remarks' , flex : 1},
  { field: 'date', headerName: 'Date' , flex : 1},
]

const dummyData = [{ 
    id:'1', 
  expenseType : 'Workshop',
  amount : '400',
  remarks : 'REGULAR MAINTAINANCE AT DXB WORKSHOP',
  date : '2023-03-02'
},
{ 
    id:'2', 
  expenseType : 'Toll',
  amount : '100',
  remarks : 'TOLL AT DXB ABU DHABI HGHWY',
  date : '2023-03-22'
},
{ 
    id:'3', 
  expenseType : 'Diesel',
  amount : '2200',
  remarks: '2ND WEEK DIESEL',
  date : '2023-03-14'
}];

const dummyType = [
    {name : 'Workshop'},
    {name : 'Toll'},
    {name : 'Diesel'}
]

const PaymentsScreen = () => {

  const [editContainerStatus,setEditContainerStatus] = useState(false);
  const [rowData,setRowData] = useState({});

  const handleRowClick = (e) => {
    setRowData(e.row);
    setEditContainerStatus(true);
  }

  const CalenderSelect = ({label,handleChange,value}) => {
    return (
      <div style={{ marginTop: 10 , marginLeft : 30,backgroundColor:'white'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker value={value} label={label} onChange={e => {handleChange(e.$d)}} />
      </DemoContainer>
    </LocalizationProvider>
    </div>
    )
  }

  return (
    <React.Fragment>
    {editContainerStatus && <PopUp popUpType = {'Payment Type'} handleClick={() => {setEditContainerStatus(false)}} /> }
    <h1 style={{display:'flex',justifyContent:'center'}}>PAYMENTS</h1>
    <div style={{display:'flex',flexDirection:'row'}}>
    <div style={{flex:1,width:'30%'}}>
        <h3 style={{marginLeft:25}}>Add a new payment type</h3>
        <div style={{width:'300%',display:'flex',flexDirection:'row'}}>
        <DropDown label={`Payment Type`} data={dummyType}  />
        <div style={{marginTop:15}}>
        <ContainedButton label={`Add new Payment Type`} handleClick={() => {setEditContainerStatus(true)}} />
        </div>
        </div>
        <TextInput label={`Amount`} />
        <TextInput label={`Remarks`} />
        <CalenderSelect lable={`Payment Date`} handleChange={null} />
        <div style={{marginLeft:20,marginTop:10}}>
        <ContainedButton label={`Submit Payment`} />
        </div>
    </div>
    <div style={{ height: 700, width: '70%' }}>
      <DataGrid
        onRowClick={handleRowClick}
        rows={dummyData}
        getRowId={(row) => row.jobId}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
    </div>
    </React.Fragment>
  )
}

export default PaymentsScreen