import React from "react";
import CreateJob from "../CreateJob.js/CreateJob";

const EditJob = ({rowData,setEditJob,isMobile}) => {
    return (
    <React.Fragment>
        <div style={{position:'absolute',top:isMobile ? '27%' : '34%',width:'100%',overflowX:'hidden',height:isMobile ? '180%':'100%',backgroundColor : 'white',opacity:0.9}} />
    <div style={{position:'absolute',top:'34%',width:'100%',overflowX:'hidden'}}>
        <CreateJob isMobile={isMobile} editJob={true} rowData={rowData} cancelCallBack={() => {setEditJob(false)}} />
    </div>
    </React.Fragment>
    )
}

export default EditJob;