const reportModalReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_REPORT_MODAL":
      return !state;
    default:
      return state;
  }
};

export default reportModalReducer;
