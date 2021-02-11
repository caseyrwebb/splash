import { combineReducers } from "redux";
import modalReducer from "./modal";
import reportModalReducer from "./report";
import boatModalReducer from "./boat";

const allReducers = combineReducers({
  modalReducer,
  reportModalReducer,
  boatModalReducer,
});

export default allReducers;
