import Api from "./Api";
import { apiDomain } from "./constants";

export const getCustomerData = () => {
    return Api.get({
        path: `${apiDomain}/transport/customer`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postCustomerData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/customer`,
        data : payload,
        options : {}
      })
}

export const getJobTypeData = () => {
    return Api.get({
        path: `${apiDomain}/transport/jobType`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postJobTypeData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/jobType`,
        data : payload,
        options : {}
      })
}

export const getAllJobsData = () => {
    return Api.get({
        path: `${apiDomain}/transport/jobData`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postJobData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/jobData`,
        data : payload,
        options : {}
      })
}

export const getReferenceData = () => {
    return Api.get({
        path: `${apiDomain}/transport/reference`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postReferenceData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/reference`,
        data : payload,
        options : {}
      })
}

export const getDriverData = () => {
    return Api.get({
        path: `${apiDomain}/transport/driver`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postDriverData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/driver`,
        data : payload,
        options : {}
      })
}

export const getVehicleData = () => {
    return Api.get({
        path: `${apiDomain}/transport/vehicle`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postVehicleData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/vehicle`,
        data : payload,
        options : {}
      })
}

export const getTransporterData = () => {
    return Api.get({
        path: `${apiDomain}/transport/transporter`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postTransporterData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/transporter`,
        data : payload,
        options : {}
      })
}

export const getFromToData = () => {
    return Api.get({
        path: `${apiDomain}/transport/location`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const postFromToData = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/location`,
        data : payload,
        options : {}
      })
}

export const getContainerStatus = () => {
    return Api.get({
        path: `${apiDomain}/transport/containerStatus`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}




