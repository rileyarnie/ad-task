const AuthReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
        dispatch: action.type,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
        dispatch: action.type,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
