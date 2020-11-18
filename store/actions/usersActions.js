import {createUser, fetchUsers} from '../../db';

export const addUser = (username, email, password) => {
  return async (dispatch) => {
    dispatch({type: 'RESET_USER_LIST', payload: null});
    try {
      const dbResult = await createUser(username, email, password);
      console.log(dbResult);
      dispatch({
        type: 'CREATE_USER',
        payload: {
          username: username,
          email: email,
          password: password,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const showAllUsers = () => {
  return async (dispatch) => {
    try {
      const usersResult = await fetchUsers();
      dispatch({type: 'SHOW_ALL_USERS', payload: usersResult.rows});
    } catch (err) {
      console.log('Klaida');
      throw err;
    }
  };
};