import React, { useState, useEffect } from 'react'
import { DataGrid , GridToolbar } from '@mui/x-data-grid'
import EditJob from '../EditJob/EditJob';
import PopUp from '../../PopUp/PopUp';
import { getContainerStatus } from '../../../services/Actions';
import { Backdrop, CircularProgress } from '@mui/material';

const columns = [
  { field: "jobSerialNo", headerName: "Job Serial No.",width: 100},
  { field: "jobDate", headerName: "Job Date" },
  { field: "customerName", headerName: "Customer",width: 200 },
  { field: "jobNumber", headerName: "Job Number",width: 150 },
  { field: "jobTypeName", headerName: "Job Type",width:100 },
  { field: "referenceName", headerName: "Reference",width:150 },
  { field: "remarks", headerName: "Remarks" ,width:150},
  { field: "container", headerName: "Container",width:150 },
  { field: "containerStatus", headerName: "Container Status" ,width:120},
  { field: "fromName", headerName: "From",width:150 },
  { field: "toName", headerName: "To",width:150 },
  { field: "driverInName", headerName: "Driver IN",width:150},
  { field: "vehicleInName", headerName: "Vehicle IN",width:150 },
  { field: "driverOutName", headerName: "Driver OUT",width:150 },
  { field: "vehicleOutName", headerName: "Vehicle OUT",width:150 },
  { field: "rate", headerName: "Rate" ,width:100},
  { field: "token", headerName: "Token" ,width:100},
  { field: "inspection", headerName: "Inspection" ,width:100},
  { field: "mecrec", headerName: "Mecrec" ,width:100},
  { field: "detention", headerName: "Detention" ,width:100},
  { field: "transporterName", headerName: "Transport",width:150 },
  { field: "doVal", headerName: "DO Value" },
  { field: "storage", headerName: "Storage" },
  { field: "containerSize", headerName: "Container Size" },
  { field: "jobVAT", headerName: "VAT" },
];

const ContainerStatus = ({isMobile=false}) => {

  useEffect(() => {
    getContainerStatus().then(res => {
      console.log("response ",res)
      setContainersData(res?.data || []);  
      setShowLoader(false);
    })
  },[])

  const [editContainerStatus,setEditContainerStatus] = useState(false);
  const [rowData,setRowData] = useState({});
  const [containersData,setContainersData] = useState([]);
  const [showLoader,setShowLoader] = useState(true);

  const handleRowClick = (e) => {
    setRowData(e.row);
    setEditContainerStatus(true);
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
    {/* {editContainerStatus && <PopUp popUpType = {'ContainerStatus'} handleClick={() => {setEditContainerStatus(false)}} /> } */}
    <h1 style={{display:'flex',justifyContent:'center'}}>CONTAINER STATUS</h1>
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
      initialState={{
        filter: {
          filterModel: {
            items: [{ field: 'containerStatus', operator: 'isAnyOf', value: ['PULLED','PENDING','LANDED'] }],
          },
        },
      }}
        onRowClick={handleRowClick}
        getRowId={(row) => row.jobId}
        rows={containersData}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
    {editContainerStatus && <EditJob isMobile={isMobile} rowData={rowData} setEditJob={setEditContainerStatus}/> }
    </React.Fragment>
  )
}

export default ContainerStatus