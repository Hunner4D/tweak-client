import streams from "../apis/streams";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

// embedded function makes use of redux-thunk
export const createStream = (formValues) => async (dispatch) => {
  streams.post("/streams", formValues);
};
