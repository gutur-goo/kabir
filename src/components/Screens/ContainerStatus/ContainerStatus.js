import React, { useState, useEffect } from 'react'
import { DataGrid , GridToolbar } from '@mui/x-data-grid'
import EditJob from '../EditJob/EditJob';
import PopUp from '../../PopUp/PopUp';
import { getContainerStatus } from '../../../services/Actions';
import { Backdrop, CircularProgress } from '@mui/material';

const columns = [
  { field: "customerName", headerName: "Customer" },
  { field: "jobNumber", headerName: "Job Number" },
  { field: "jobTypeName", headerName: "Job Type" },
  { field: "referenceName", headerName: "Reference" },
  { field: "remarks", headerName: "Remarks" },
  { field: "container", headerName: "Container" },
  { field: "containerStatus", headerName: "Container Status" },
  { field: "from", headerName: "From" },
  { field: "to", headerName: "To" },
  { field: "driverInName", headerName: "Driver IN" },
  { field: "vehicleInName", headerName: "Vehicle IN" },
  { field: "driverOutName", headerName: "Driver OUT" },
  { field: "vehicleOutName", headerName: "Vehicle OUT" },
  { field: "rate", headerName: "Rate" },
  { field: "token", headerName: "Token" },
  { field: "inspection", headerName: "Inspection" },
  { field: "mecrec", headerName: "Mecrec" },
  { field: "detention", headerName: "Detention" },
  { field: "transporterName", headerName: "Transport" },
  { field: "doVal", headerName: "DO Value" },
  { field: "storage", headerName: "Storage" },
  { field: "containerSize", headerName: "Container Size" },
  { field: "includeVAT", headerName: "VAT" },
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