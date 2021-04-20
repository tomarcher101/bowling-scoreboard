import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LiveGame from "./LiveGame";
import PlayerSelectPage from "./PlayerSelectPage";
import * as actions from "../actions/actions";

const outerContainer = {
  margin: "0px",
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
};
const innerContainer = {
  justifyItems: "center",
  gridColumnStart: "2",
  gridColumnEnd: "3",
  paddingTop: "60px",
  paddingBottom: "100px",
  paddingRight: "30px",
  paddingLeft: "30px",
};

const Play = () => {
  const dispatch = useDispatch();
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([])
  const setGameActive = (players) => {
    setPlayers(players)
    const playerNames = players.map((player) => player.name);
    dispatch(actions.initPlayerQueue(playerNames));
    dispatch(actions.initScore(playerNames));
    setGameStarted(true);
  };

  const display = gameStarted ? (
    <LiveGame players={players} />
  ) : (
    <PlayerSelectPage setGameActive={setGameActive} />
  );

  return (
    <div style={outerContainer}>
      <div style={innerContainer}>{display}</div>
    </div>
  );
};

export default Play;
