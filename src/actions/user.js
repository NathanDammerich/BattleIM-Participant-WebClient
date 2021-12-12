import * as api from "../api/index.js";

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    console.log(data);

    dispatch({ type: "FETCH_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
