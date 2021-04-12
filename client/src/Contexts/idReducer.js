const idReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_ID":
      localStorage.setItem("spotify_clone_client_id", action.payload);
      return {
        ...state,
        clientId: action.payload,
      };
    default:
      return state;
  }
};

export default idReducer;
