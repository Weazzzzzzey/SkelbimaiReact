const initialState = {
  advertisesdb: [],
};

export const advertisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ADVERTISE":
      const newAd = {
        title: action.payload.title,
        advertisetext: action.payload.advertisetext,
        url: action.payload.url,
        price: action.payload.price,
        username: action.payload.username,
      };
      return {
        advertisesdb: state.advertisesdb.concat(newAd),
      };
    case "SHOW_ALL":
      const advertiseList = [];
      for (let i = 0; i < action.payload.length; ++i) {
        advertiseList.push(action.payload.item(i));
        console.log(action.payload.item(i));
      }
      return { advertisesdb: [...state.advertisesdb, ...advertiseList] };
    case "SHOW_ALL_USER":
      const advertiseList = [];
      for (let i = 0; i < action.payload.length; ++i) {
        advertiseList.push(action.payload.item(i));
        console.log(action.payload.item(i));
      }
      return { advertisesdb: [...state.advertisesdb, ...advertiseList] };
    case "DELETE_AD":
      const index = state.advertisesdb.findIndex(
        (advertise) => advertise.id === action.payload.id
      );
      return {
        advertisesdb: [
          ...state.advertisesdb.slice(0, index),
          ...state.advertisesdb.slice(index + 1),
        ],
      };
    case "RESET_ADVERTISE_LIST":
      return { advertisesdb: [] };
    default:
      return state;
  }
};
