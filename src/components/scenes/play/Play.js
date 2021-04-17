import React, { useState } from "react";
import LiveGame from "./liveGame/LiveGame"
import PlayerSelectPage from "./playerSelectPage/PlayerSelectPage"

const Play = () => {
  const [gameActive, setGameActive] = useState(false);
  const [players, setPlayers] = useState([])

  if (gameActive) {
    return <LiveGame players={players}/>
  } else {
    return <PlayerSelectPage setGameActive={setGameActive} setPlayers={setPlayers}/>
  }
};

export default Play;
