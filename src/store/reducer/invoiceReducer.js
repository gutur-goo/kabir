export const initialState = {
    rowData: [],
    invoiceAmount: 0,
    taxableValue: 0,
    totalVatAmount: 0,
    grossAmount: 0,
    customer: "",
    customerTRN: "",
    invoiceDate: "",
    invoiceNo: ""
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INVOICE_DATA':
            console.log("INSIDE INVOICE REDUCER -----> ",action.item);
            const newState =  {
                ...state,
                ...action.item
            }
            console.log("NEW STATE ---> ",newState);
            return newState;
        default:
            return state;
    }
};

export default invoiceReducer;
