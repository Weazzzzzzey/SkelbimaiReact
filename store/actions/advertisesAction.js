import { fetchAdvertises, addAdvertise, deleteAd, fetchByUserName } from "../../db";

export const addAd = (title, advertisetext, url, price, username) => {
  return async (dispatch) => {
    try {
      const dbResult = await addAdvertise(title, advertisetext, url, price, username);
      console.log(dbResult);
      dispatch({
        type: "ADD_ADVERTISE",
        payload: {
          title: title,
          advertisetext: advertisetext,
          url: url,
          price: price,
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

export const showAllByUser = (username) => {
    return async (dispatch) => {
      dispatch({ type: "RESET_ADVERTISE_LIST", payload: null });
      try {
        const adResult = await fetchByUserName(username);
        dispatch({ type: "SHOW_ALL",payload: adResult.rows });
      } catch (err) {
        console.log("Klaida");
        throw err;
      }
    };
  };

export const removeAdvertise = (id) => {
    return async (dispatch) => {
      //dispatch({type: 'RESET_ADVERTISE_LIST', payload: null});
      try {
        const dbResult = await deleteAd(id);
        console.log(dbResult);
        dispatch({type: 'DELETE_AD', payload: {id: id}});
      } catch (err) {
        throw err;
      }
      
    };
  };