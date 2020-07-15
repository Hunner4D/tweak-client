import { Base64 } from 'js-base64';
import server from "../apis/server";

export const signIn = (userId) => {
  let bytes = Base64.encode(userId);
  // let uuidInstance = server.post("/user", bytes).then(res => { return res});
  // console.log(uuidInstance);
  return {
    type: "SIGN_IN",
    payload: bytes,
  };
};

export const signInInstance = (userId) => async (dispatch) => {
  server.post("/user", userId);
}

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

// embedded function makes use of redux-thunk
export const createStream = (formValues) => async (dispatch) => {
  server.post("/streams", formValues);
};








//          encoding guide
// let bytes = Base64.encode(userId);
// let decoded = Base64.atob(bytes);