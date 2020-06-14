import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// above is an example of renaming a import
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
