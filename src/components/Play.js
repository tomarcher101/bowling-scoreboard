import React, { useState } from "react";
import { connect } from "react-redux";
import LiveGame from "./LiveGame"
import PlayerSelectPage from "./PlayerSelectPage"

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
