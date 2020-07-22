import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";
import headerReducer from "./headerReducer";

export default combineReducers({
  replaceMe: () => "dummy reducer",
  form: formReducer,
  auth: authReducer,
  streams: streamReducer,
  header: headerReducer,
});
