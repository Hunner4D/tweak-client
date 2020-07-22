const INITIAL_STATE = {
  isSignedIn: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const { token, userInstance, username, profileImage, newUser } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        token,
        userInstance,
        username,
        profileImage,
        newUser,
      };
    case "SIGN_OUT":
      return { isSignedIn: false, userInstance: null };

    case "NEW_USER_FALSE":
      return { ...state, newUser: false };

    case "GENERATE_STREAM_KEY":
      return { ...state, stream_key: action.payload };

    default:
      return state;
  }
};
