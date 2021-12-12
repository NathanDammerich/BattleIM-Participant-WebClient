import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getGames = () => API.get("/games");
export const getGame = (id) => API.get(`/games/${id}`);
export const updateGame = (id, updatedGame) =>
  API.patch(`/games/${id}`, updatedGame);
export const createGame = (newGame) => API.post("/games", newGame);

export const getTeam = (id) => API.get(`/teams/${id}`);
export const updateTeam = (id, updatedTeam) =>
  API.patch(`/teams/${id}`, updatedTeam);
export const createTeam = (newTeam) => API.post("/teams", newTeam);

export const getUser = (id) => API.get(`/users/${id}`);
export const createUser = (newUser) => API.get("/users", newUser);

export const getLeague = (id) => API.get(`/leagues/${id}`);
export const updateLeague = (id, updatedLeague) =>
  API.patch(`/leagues/${id}`, updatedLeague);
export const createLeague = (newLeague) => API.post("/leagues", newLeague);

export const getOrg = (id) => API.get(`/orgs/${id}`);
export const updateOrg = (id, updatedOrg) => API.get(`/orgs/${id}`, updatedOrg);
export const createOrg = (newOrg) => API.get("/orgs", newOrg);

export const getSport = (id) => API.get(`/sports/${id}`);
export const updateSport = (id, updatedSport) =>
  API.patch(`/sports/${id}`, updatedSport);
export const createSport = (newSport) => API.post("/sports", newSport);

export const getQuiz = (id) => API.get(`/quizzes/${id}`);
export const createQuiz = (newQuiz) => API.post("/quizzes", newQuiz);