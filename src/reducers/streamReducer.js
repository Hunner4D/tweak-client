import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_STREAMS":
      return action.payload;

    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload };

    case "FETCH_MY_STREAMS":
      return action.payload;

    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload };

    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };

    case "DELETE_STREAM":
      let stateCopy = _.remove(state, (obj) => {
        return obj.uuid !== action.payload;
      });
      return stateCopy;

    case "CLEAR":
      return action.payload;

    default:
      return state;
  }
};
