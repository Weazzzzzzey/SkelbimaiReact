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
      case 'DELETE_AD':
        const index = state.advertises.findIndex((advertise) => advertise.adid === action.adid);
        return {
          advertises: [...state.advertises.slice(0, index), ...state.advertises.slice(index + 1)],
        };
    default:
      return state;
  }
};
