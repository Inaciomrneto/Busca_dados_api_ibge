import { combineReducers } from "redux";
import infoReducer from "./infoReducer";

const rootReducer = combineReducers({ infoReducer });

export default rootReducer;