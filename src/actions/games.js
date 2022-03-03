import * as api from "../api/index.js";

export const getGames = () => async (dispatch) => {
  try {
    const { data } = await api.getGames();

    dispatch({ type: "FETCH_GAMES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getGame = (id) => async (dispatch) => {
  try {
    const { data } = await api.getGame(id);
    return data;
  } catch (error) {
    console.log("getGame error");
    console.log(error);
  }
};
