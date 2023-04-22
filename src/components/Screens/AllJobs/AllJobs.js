import React, { useState, useEffect } from 'react'
import { DataGrid , GridToolbar } from '@mui/x-data-grid'
import EditJob from '../EditJob/EditJob';

const columns = [
  { field: 'id', headerName: 'S No.' },
  { field: 'customer', headerName: 'Customer' },
  { field: 'jobNumber', headerName: 'Job Number' },
  { field: 'jobType', headerName: 'Job Type'},
  { field: 'reference', headerName: 'Reference'},
  { field: 'remarks', headerName: 'Remarks' },
  { field: 'container', headerName: 'Container' },
  { field: 'containerStatus', headerName: 'Container Status' },
  { field: 'from', headerName: 'From' },
  { field: 'to', headerName: 'To' },
  { field: 'driverIn', headerName: 'Driver IN' },
  { field: 'vehicleIn', headerName: 'Vehicle IN' },
  { field: 'driverOut', headerName: 'Driver OUT' },
  { field: 'vehicleOut', headerName: 'Vehicle OUT' },
  { field: 'rate', headerName: 'Rate' },
  { field: 'token', headerName: 'Token' },
  { field: 'inspection', headerName: 'Inspection' },
  { field: 'mecrec', headerName: 'Mecrec' },
  { field: 'detention', headerName: 'Detention' },
  { field: 'transport', headerName: 'Transport' },
  { field: 'doVal', headerName: 'DO Value' },
  { field: 'storage', headerName: 'Storage' },
  { field: 'containerSize', headerName: 'Container Size' },
  { field: 'includeVAT', headerName: 'VAT' },
]

const dummyData = [{ 
    id:'1', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  jobType: "CONTAINER",
  reference: "BROTHER",
  remarks: "REMARKS HERE",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  token: "10",
  inspection: "50",
  mecrec: "50",
  detention: "10",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  transport: "",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
  includeVAT: "5"
},
{ 
    id:'2', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  jobType: "CONTAINER",
  reference: "BROTHER",
  remarks: "REMARKS HERE",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  token: "10",
  inspection: "50",
  mecrec: "50",
  detention: "10",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  transport: "",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
  includeVAT: "5"
},
{ 
    id:'3', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  jobType: "CONTAINER",
  reference: "BROTHER",
  remarks: "REMARKS HERE",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  token: "10",
  inspection: "50",
  mecrec: "50",
  detention: "10",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  transport: "",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
  includeVAT: "5"
},
{ 
    id:'4', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  jobType: "CONTAINER",
  reference: "BROTHER",
  remarks: "REMARKS HERE",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  token: "10",
  inspection: "50",
  mecrec: "50",
  detention: "10",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  transport: "",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
  includeVAT: "5"
},
{ 
    id:'5', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  jobType: "CONTAINER",
  reference: "BROTHER",
  remarks: "REMARKS HERE",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  token: "10",
  inspection: "50",
  mecrec: "50",
  detention: "10",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  transport: "",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
  includeVAT: "5"
}];

const AllJobs = () => {

  const [editJob,setEditJob] = useState(false);
  const [rowData,setRowData] = useState({});

  const handleRowClick = (e) => {
    setRowData(e.row);
    setEditJob(true);
  }

  return (
    <React.Fragment>
    <h1 style={{display:'flex',justifyContent:'center'}}>ALL JOBS</h1>
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        onRowClick={handleRowClick}
        rows={dummyData}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
    {editJob && <EditJob rowData={rowData} setEditJob={setEditJob}/> }
    </React.Fragment>
  )
}

export default AllJobs