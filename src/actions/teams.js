import * as api from "../api/index.js";

export const getTeam = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTeam(id);

    return data;
  } catch (error) {
    console.log(error);
  }
};
