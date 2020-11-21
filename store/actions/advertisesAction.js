import { fetchAdvertises, addAdvertise, deleteAd } from "../../db";

export const addAd = (title, advertisetext, username) => {
  return async (dispatch) => {
    try {
      const dbResult = await addAdvertise(title, advertisetext, username);
      console.log(dbResult);
      dispatch({
        type: "ADD_ADVERTISE",
        payload: {
          title: title,
          advertisetext: advertisetext,
          username: username,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const showAll = () => {
  return async (dispatch) => {
    dispatch({ type: "RESET_ADVERTISE_LIST", payload: null });
    try {
      const adResult = await fetchAdvertises();
      dispatch({ type: "SHOW_ALL", payload: adResult.rows });
    } catch (err) {
      console.log("Klaida");
      throw err;
    }
  };
};

export const removeAdvertise = (id) => {
    return async (dispatch) => {
      dispatch({type: 'RESET_ADVERTISE_LIST', payload: null});
      try {
        const dbResult = await deleteAd(id);
        console.log(dbResult);
        dispatch({type: 'DELETE_AD', payload: {id: id}});
      } catch (err) {
        throw err;
      }
    };
  };