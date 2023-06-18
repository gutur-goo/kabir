export const initialState = {
    customerId: 1,
    customerName: "asfs",
    customerTRN: "fasdfas",
    customerAddress: "df",
    rowData: [
        {
            "invoiceNo": "VAT_5_202",
            "invoiceDate": "04-04-2023",
            "amount": 22946.0,
            "noOfDays": "2 months 1 day"
        }
    ],
    total: 22946.0
};

const outstandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OUTSTANDING_DATA':
            console.log("INSIDE OUTSTANDING REDUCER -----> ",action.item);
            return null;
        default:
            return state;
    }
};

export default outstandingReducer;
