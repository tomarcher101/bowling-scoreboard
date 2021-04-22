import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions/actions";

// Components
import LiveGame from "./LiveGame";
import PlayerSelectPage from "./PlayerSelectPage";

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
  const [players, setPlayers] = useState({})
  const setGameActive = (players) => {
    Object.entries(players).forEach(([name, colour]) => {
      setPlayers({
        ...players,
        [name]: colour
      })
    });
    dispatch(actions.initPlayerQueue(Object.keys(players)));
    dispatch(actions.initScore(Object.keys(players)));
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
