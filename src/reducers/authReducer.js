const INITIAL_STATE = {
  isSignedIn: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const { token, userInstance, username, profileImage, newUser, category, about } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        token,
        userInstance,
        username,
        profileImage,
        newUser,
        category,
        about
      };
    case "SIGN_OUT":
      return { isSignedIn: false, userInstance: null };

    case "EDIT":
      return { ...state, ...action.payload };

    case "NEW_USER_FALSE":
      return { ...state, newUser: false };

    default:
      return state;
  }
};
