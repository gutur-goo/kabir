
import axios from 'axios';
import { apiDomain } from './constants';

const DEFAULT_TIMEOUT = 5000; //3seconds

const defaults = {
  baseURL: apiDomain,
  method: 'GET',
  // mode: 'cors',
  // credentials: 'same-origin',
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status === 200
};

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
    false : true
}

class Api {

  constructor() {

    let client = axios.create(defaults);

    // Add a request interceptor
    client.interceptors.request.use(
      request => this.requestHandler(request)
    )

    // Add a response interceptor
    client.interceptors.response.use(
      response => this.successHandler(response),
      error => this.errorHandler(error)
    )

    this.client = client;
  }

  requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
      // Modify request here

    }
    return request
  }

  successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
      // Handle responses
    }
    return { 'headers': { ...response.headers }, 'data': response.data };
  }

  errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
      // Handle errors
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.error('Status:',  error.response.status);
      // console.error('Data:',    error.response.data);
      // console.error('Headers:', error.response.headers);
      return Promise.reject({ code: error.response.status, msg: error.response.statusText || error.message });

    } else {
      // Something else happened while setting up the request
      // triggered the error
      //console.error('Error Message:', error.message);
      return Promise.reject({ code: 500, msg: error.message });
    }

  }

  get({ path, options }) {
    return this.client.get(path, options).then((response) => typeof options.callback === 'function' ? options.callback(response) : response);
  }

  post({ path, data, options }) {
    return this.client.post(path, data, options).then((response) => typeof options.callback === 'function' ? options.callback(response) : response);
  }
}

export default new Api;
