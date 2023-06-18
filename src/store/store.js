import { combineReducers , createStore } from "redux";
import invoiceReducer from "./reducer/invoiceReducer";
import supportingsReducer from "./reducer/supportingsReducer";
import outstandingReducer from "./reducer/outstandingReducer";
import paymentReducer from "./reducer/paymentReducer";

const rootReducer = combineReducers({
    invoiceReducer : invoiceReducer,
    supportingsReducer : supportingsReducer,
    outstandingReducer : outstandingReducer,
    paymentReducer : paymentReducer
})

export const store = createStore(rootReducer);
