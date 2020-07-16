import { Base64 } from 'js-base64';
import server from "../apis/server";

export const signIn = (userId) => async (dispatch) => {
  let bytes = Base64.encode(userId);
  let userInstance = (await server.post("/user", {bytes})).data;
  console.log("instance from sign in:", userInstance);
  dispatch({
    type: "SIGN_IN",
    payload: { bytes, userInstance }
  });
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

// embedded function makes use of redux-thunk
export const createStream = (formValues) => async (dispatch) => {
  const response = server.post("/streams", formValues);

  dispatch({ type: "CREATE_STREAM", payload: response.data })
};




//          encoding guide
// let bytes = Base64.encode(userId);
// let decoded = Base64.atob(bytes);