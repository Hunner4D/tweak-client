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
      newUser: response.newUser,
      username: response.username,
      profileImage: response.profileImage,
      category: response.category,
      about: response.about,
    },
  });
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const editProfile = (query) => async (dispatch) => {
  let response = (
    await server.post("/user/edit", {
      idToken: query.idToken,
      userInstance: query.userInstance,
      data: query.data,
    })
  ).data;
  dispatch({
    type:"EDIT",
    payload: { ...response }
  })
};

export const newUserFalse = () => {
  return {
    type: "NEW_USER_FALSE",
  };
};
