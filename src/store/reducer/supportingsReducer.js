export const initialState = {
  customerName: "",
  invoiceNo: "",
  rowData: [],
};

const supportingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUPPORTINGS_DATA":
      console.log("INSIDE SUPPORTINGS REDUCER -----> ", action.item);
      return {
        ...state,
        ...action.item
      };
    default:
      return state;
  }
};

export default supportingsReducer;
