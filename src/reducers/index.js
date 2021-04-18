import { combineReducers } from "redux";
import { alertReducer } from "./alertReducer"
import { turnReducer } from "./turnReducer"
import { scoreReducer } from "./scoreReducer"

const allReducers = combineReducers({
  alert: alertReducer,
  score: scoreReducer,
  turn: turnReducer,
});

export default allReducers;