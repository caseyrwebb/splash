const boatModalReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_BOAT_MODAL":
      return !state;
    default:
      return state;
  }
};

export default boatModalReducer;
