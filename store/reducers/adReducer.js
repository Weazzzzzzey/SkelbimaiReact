const initialState = {
  advertises: [],
};

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return {
        advertises: [...state.advertises],
      };
    case "ADD_AD":
      return {
        advertises: [
          ...state.advertises,
          {
            title: action.title,
            text: action.text,
            adid: action.adid,
            userid: action.userid,
          },
        ],
      };
    default:
      return state;
  }
};
