export const userLogin = (state = {isLoggedIn: false}, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        console.log(action.payload);
        const newState = {
          isLoggedIn: action.payload,
        };
        console.log(newState);
        return newState;
      default:
        return state;
    }
  };
  