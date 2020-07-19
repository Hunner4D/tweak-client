import { Base64 } from "js-base64";
import server from "../apis/server";

//          encoding guide
// let bytes = Base64.encode(userId);
// let decoded = Base64.atob(bytes);

export const signIn = (query) => async (dispatch) => {
  let bytes = Base64.encode(query.id);
  let response = (
    await server.post("/user", {
      bytes,
      username: query.username,
      profileImage: query.profileImage,
    })
  ).data;
  dispatch({
    type: "SIGN_IN",
    payload: {
      bytes,
      userInstance: response.instance,
      username: response.username,
      profileImage: response.profileImage,
      newUser: response.newUser,
    },
  });
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const newUserFalse = () => {
  return {
    type: "NEW_USER_FALSE",
  };
};
