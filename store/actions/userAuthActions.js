import {userLogin} from '../../db';
export const loginUser = (username, password, callback) => {
  return async (dispatch) => {
    try {
      const dbResult = await userLogin(username, password);
      console.log(dbResult.rows.length);
      if (dbResult.rows.length > 0) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: true,
        });
      } else {
        console.log('Blogi duomenys');
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: false,
        });
      }
      callback();
    } catch (err) {
      console.log('Klaida');
      throw err;
    }
  };
};
