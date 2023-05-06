import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditJob from "../EditJob/EditJob";
import Api from "../../../services/Api";
import { apiDomain } from "../../../services/constants";
import { getAllJobsData } from "../../../services/Actions";
import { Backdrop, CircularProgress } from "@mui/material";

const columns = [
  { field: "customerName", headerName: "Customer" },
  { field: "jobNumber", headerName: "Job Number" },
  { field: "jobTypeName", headerName: "Job Type" },
  { field: "referenceName", headerName: "Reference" },
  { field: "remarks", headerName: "Remarks" },
  { field: "container", headerName: "Container" },
  { field: "containerStatus", headerName: "Container Status" },
  { field: "fromName", headerName: "From" },
  { field: "toName", headerName: "To" },
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

const AllJobs = ({isMobile = false}) => {
  useEffect(() => {
    getAllJobsData()
      .then((res) => {
        setJobData(res.data || []);
        setShowLoader(false);
      })
      .catch((err) => {
        console.log("Error in all jobs data api ", err);
      });
  }, []);

  const [editJob, setEditJob] = useState(false);
  const [rowData, setRowData] = useState({});
  const [jobsData, setJobData] = useState([]);
  const [showLoader,setShowLoader] = useState(true);

  const handleRowClick = (e) => {
    setRowData(e.row);
    setEditJob(true);
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1 style={{ display: "flex", justifyContent: "center" }}>ALL JOBS</h1>
      <div style={{ height: window.innerHeight, width: "100%" }}>
        <DataGrid
          onRowClick={handleRowClick}
          rows={jobsData}
          getRowId={(row) => row.jobId}
          columns={columns}
          pageSize={12}
          slots={{ toolbar: GridToolbar }}
        />
      </div>
      {editJob && <EditJob isMobile={isMobile} rowData={rowData} setEditJob={setEditJob} />}
    </React.Fragment>
  );
};

export default AllJobs;
