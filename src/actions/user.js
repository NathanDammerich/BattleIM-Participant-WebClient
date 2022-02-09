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

export const addPassedQuiz = (userID, quizID) => async (dispatch) => {
  try {
    //const data = await api.addPassedQuiz(userID, { quizID: quizID });
    //console.log(data);
    dispatch({ type: "ADD_PASSED_QUIZ", payload: quizID });
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    console.log(data);

    dispatch({ type: "SIGN_IN", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SIGN_IN_ERROR", payload: true });
  }
};

export const attemptRefresh = () => async (dispatch) => {
  try {
    const { data } = await api.refreshUser();
    dispatch({ type: "SIGN_IN", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SIGN_IN_ERROR", payload: true });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
  }
};
