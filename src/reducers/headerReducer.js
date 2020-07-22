const INITIAL_STATE = {
  activeItem: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_PATH":
      return {activeItem: action.payload};

    default:
      return state;
  }
};
