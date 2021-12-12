import { useState, useEffect } from "react";
import { getLeague, getGame, getTeam, getQuiz } from "../api";

export default function useFetchData(dataFromParent, dataID, identifier) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataFromParent) {
      setData(dataFromParent);
    } else {
      fetchData(dataID).then((res) => setData(res.data));
    }
  }, []);

  const fetchData = async (dataID) => {
    let data = null;
    if (identifier === "league") {
      data = await getLeague(dataID);
    } else if (identifier === "game") {
      data = await getGame(dataID);
    } else if (identifier === "team") {
      data = await getTeam(dataID);
    } else if (identifier === "quiz") {
      data = await getQuiz(dataID);
    }
    return data;
  };

  return [data, setData];
}
