//import { UPCOMING, LEAGUES, TEAMS } from "../constants/actionTypes";

export default (games = [], action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return action.payload;
    default:
      return games;
  }
};
