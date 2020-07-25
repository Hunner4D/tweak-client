import server from "../apis/server";

//          encoding guide
// let bytes = Base64.encode(userId);
// let decoded = Base64.atob(bytes);

export const signIn = (query) => async (dispatch) => {
  let response = (await server.post("/user", { idToken: query })).data;

  dispatch({
    type: "SIGN_IN",
    payload: {
      token: query,
      userInstance: response.instance,
      stream_key: response.stream_key,
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

export const generateStreamKey = (query) => async (dispatch) => {
  let response = (await server.post("/user/settings/stream_key", query)).data.stream_key;
  
  dispatch({
    type: "GENERATE_STREAM_KEY",
    payload: response,
  });
};
