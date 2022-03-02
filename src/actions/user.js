import * as api from "../api/index.js";

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);

    dispatch({ type: "FETCH_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addPassedQuiz = (userID, quizID) => async (dispatch) => {
  try {
    const data = await api.addPassedQuiz(userID, { quizID: quizID });

    dispatch({ type: "ADD_PASSED_QUIZ", payload: quizID });
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);

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

export const googleAuthSuccess = (token) => async (dispatch) => {
  try {
    const { data } = await api.googleSignIn(token);
    dispatch({ type: "SIGN_IN", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SIGN_IN_ERROR", payload: true });
  }
};

export const acceptInvite = (userID, teamID) => async (dispatch) => {
  try {
    const { data } = await api.acceptInvite(userID, { teamID: teamID });
    dispatch({ type: "ACCEPT_INVITE", payload: teamID });
  } catch (error) {
    console.log(error);
  }
};
