import React, { useState, useEffect } from 'react'
import { DataGrid , GridToolbar } from '@mui/x-data-grid'
import EditJob from '../EditJob/EditJob';
import PopUp from '../../PopUp/PopUp';

const columns = [
  { field: 'id', headerName: 'S No.' },
  { field: 'customer', headerName: 'Customer' },
  { field: 'jobNumber', headerName: 'Job Number' },
  { field: 'container', headerName: 'Container' },
  { field: 'containerStatus', headerName: 'Container Status' },
  { field: 'from', headerName: 'From' },
  { field: 'to', headerName: 'To' },
  { field: 'driverIn', headerName: 'Driver IN' },
  { field: 'vehicleIn', headerName: 'Vehicle IN' },
  { field: 'driverOut', headerName: 'Driver OUT' },
  { field: 'vehicleOut', headerName: 'Vehicle OUT' },
  { field: 'rate', headerName: 'Rate' },
  { field: 'doVal', headerName: 'DO Value' },
  { field: 'storage', headerName: 'Storage' },
  { field: 'containerSize', headerName: 'Container Size' },
]

const dummyData = [{ 
    id:'1', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
},
{ 
  id:'2', 
customer: "VCL LLC",
jobNumber: "ABCDXYZ1234",
container: "GHJUKI8765",
containerStatus: "LANDED",
from: "DXB PORT",
to: "ABU DHABI",
rate: "400",
driverIn: "AMAN",
driverOut: "AMAN",
vehicleIn: "B4564DXB",
vehicleOut: "B4564DXB",
doVal: "20-04-2023",
storage: "22-04-2023",
containerSize: "40",
},
{ 
    id:'3', 
  customer: "VCL LLC",
  jobNumber: "ABCDXYZ1234",
  container: "GHJUKI8765",
  containerStatus: "LANDED",
  from: "DXB PORT",
  to: "ABU DHABI",
  rate: "400",
  driverIn: "AMAN",
  driverOut: "AMAN",
  vehicleIn: "B4564DXB",
  vehicleOut: "B4564DXB",
  doVal: "20-04-2023",
  storage: "22-04-2023",
  containerSize: "40",
},
{ 
  id:'4', 
customer: "VCL LLC",
jobNumber: "ABCDXYZ1234",
container: "GHJUKI8765",
containerStatus: "LANDED",
from: "DXB PORT",
to: "ABU DHABI",
rate: "400",
driverIn: "AMAN",
driverOut: "AMAN",
vehicleIn: "B4564DXB",
vehicleOut: "B4564DXB",
doVal: "20-04-2023",
storage: "22-04-2023",
containerSize: "40",
},
{ 
  id:'5', 
customer: "VCL LLC",
jobNumber: "ABCDXYZ1234",
container: "GHJUKI8765",
containerStatus: "LANDED",
from: "DXB PORT",
to: "ABU DHABI",
rate: "400",
driverIn: "AMAN",
driverOut: "AMAN",
vehicleIn: "B4564DXB",
vehicleOut: "B4564DXB",
doVal: "20-04-2023",
storage: "22-04-2023",
containerSize: "40",
}];

const ContainerStatus = () => {

  const [editContainerStatus,setEditContainerStatus] = useState(false);
  const [rowData,setRowData] = useState({});

  const handleRowClick = (e) => {
    setRowData(e.row);
    setEditContainerStatus(true);
  }

  return (
    <React.Fragment>
    {editContainerStatus && <PopUp popUpType = {'ContainerStatus'} handleClick={() => {setEditContainerStatus(false)}} /> }
    <h1 style={{display:'flex',justifyContent:'center'}}>CONTAINER STATUS</h1>
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        onRowClick={handleRowClick}
        rows={dummyData}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
    </React.Fragment>
  )
}

export default ContainerStatus