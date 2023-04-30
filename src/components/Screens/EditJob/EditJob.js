import React from "react";
import CreateJob from "../CreateJob.js/CreateJob";

const EditJob = ({rowData,setEditJob}) => {
    return (
    <React.Fragment>
        <div style={{position:'absolute',top:'34%',width:'100%',height:'100%',backgroundColor : 'white',opacity:0.9}} />
    <div style={{position:'absolute',top:'34%',width:'100%'}}>
        <CreateJob editJob={true} rowData={rowData} cancelCallBack={() => {setEditJob(false)}} />
    </div>
    </React.Fragment>
    )
}

export default EditJob;