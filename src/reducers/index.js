import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// above is an example of renaming a import
import authReducer from "./authReducer";

export default combineReducers({
  replaceMe: () => "dummy reducer",
  auth: authReducer,
  form: formReducer,
});
