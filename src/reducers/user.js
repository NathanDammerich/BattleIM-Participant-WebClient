const userReducer = (user = null, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload;
    case "UPDATE_USER":
      return action.payload;
    case "SIGN_IN":
      return action.payload;
    case "ADD_PASSED_QUIZ":
      return {
        ...user,
        quizzesPassed: [...user.quizzesPassed, action.payload],
      };
    case "ADD_TEAM_USER":
      return {
        ...user,
        teams: [...user.teams, action.payload],
      };
    case "LOGOUT":
      return null;
    case "ACCEPT_INVITE":
      return {
        ...user,
        invites: user.invites.filter((invite) => invite !== action.payload),
        teams: [...user.teams, action.payload],
      };
    default:
      return user;
  }
};

export default userReducer;
