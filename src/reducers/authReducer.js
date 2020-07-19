const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.bytes,
        userInstance: action.payload.userInstance,
        newUser: action.payload.newUser
      };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null, userInstance: null };
    default:
      return state;
  }
};
