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

export const getFromData = () => {
    return Api.get({
        path: `${apiDomain}/transport/location?type=SOURCE`,
        options: {
            method: 'GET',
            timeout: 10000
        },
    })
}

export const getToData = () => {
    return Api.get({
        path: `${apiDomain}/transport/location?type=DESTINATION`,
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

export const getNonInvoicedJobs = (customerId,VAT) => {
    return Api.get({
        path: `${apiDomain}/transport/invoiceJob?customerId=${customerId}&vat=${VAT}`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const generateInvoice = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/invoice`,
        data : payload,
        options : {}
      })
}

export const getOutstandings = () => {
    return Api.get({
        path: `${apiDomain}/transport/outstanding`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const generateOutstanding = (customerId) => {
    return Api.get({
        path: `${apiDomain}/transport/customerOutstanding?customerId=${customerId}`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const generatePaymentReciept = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/paymentReceipt`,
        data : payload,
        options : {}
      })
}

export const getExpensesType = () => {
    return Api.get({
        path: `${apiDomain}/transport/expenseType`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const addExpenseType = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/expenseType`,
        data : payload,
        options : {}
      })
}

export const addExpense = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/expense`,
        data : payload,
        options : {}
      })
}

export const getExpensesOfType = (expense_type) => {
    return Api.get({
        path: `${apiDomain}/transport/expense?expense_type=${expense_type}`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const getExpensesTotal = () => {
    return Api.get({
        path: `${apiDomain}/transport/expTypeTotal`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const getPaymentType = () => {
    return Api.get({
        path: `${apiDomain}/transport/paymentType`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const addPaymentType = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/paymentType`,
        data : payload,
        options : {}
      })
}

export const addPayment = (payload) => {
    return Api.post({
        path : `${apiDomain}/transport/payment`,
        data : payload,
        options : {}
      })
}

export const getPaymentsOfType = (payment_type) => {
    return Api.get({
        path: `${apiDomain}/transport/payment?payment_type=${payment_type}`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}

export const getPaymentsTotal = () => {
    return Api.get({
        path: `${apiDomain}/transport/payTypeTotal`,
        options: {
            method: 'GET',
            timeout: 10000
        }
    })
}