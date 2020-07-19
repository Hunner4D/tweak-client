import { Base64 } from "js-base64";
import server from "../apis/server";

//          encoding guide
// let bytes = Base64.encode(userId);
// let decoded = Base64.atob(bytes);

export const signIn = (userId) => async (dispatch) => {
  let bytes = Base64.encode(userId);
  let response = (await server.post("/user", { bytes })).data;
  dispatch({
    type: "SIGN_IN",
    payload: {
      bytes,
      userInstance: response.instance,
      newUser: response.newUser,
    },
  });
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
