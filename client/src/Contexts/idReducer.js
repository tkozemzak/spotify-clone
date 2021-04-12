const idReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_ID":
      return {
        ...state,
        clientId: action.payload,
      };
    default:
      return state;
  }
};

export default idReducer;
