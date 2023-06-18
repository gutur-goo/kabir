export const initialState = {
    customerName: "asfs",
    invoiceNumber: "VAT_5_202",
    amount: 22946.0,
    amountInWords: "twenty two thousand nine hundred forty six dirhams",
    date: "04-06-2023",
    methodReference: "payment done by check"
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PAYMENT_DATA':
            console.log("INSIDE OUTSTANDING REDUCER -----> ",action.item);
            return null;
        default:
            return state;
    }
};

export default paymentReducer;
