import { combineReducers } from "redux";

import games from "./games";
import teams from "./teams";
import modals from "./modals";
import user from "./user";

export const reducers = combineReducers({
  games: games,
  teams: teams,
  modals: modals,
  user: user,
});
