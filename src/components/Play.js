import React, { useState } from "react";
import { connect } from "react-redux";
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
  maxWidth: "1920px",
  paddingTop: "60px",
  paddingBottom: "100px",
  paddingRight: "30px",
  paddingLeft: "30px",
};

const Play = () => {
  const [gameActive, setGameActive] = useState(false);
  const [players, setPlayers] = useState([]);

  const display = gameActive ? (
    <LiveGame players={players} />
  ) : (
    <PlayerSelectPage setGameActive={setGameActive} setPlayers={setPlayers} />
  );

  return (
    <div style={outerContainer}>
      <div style={innerContainer}>{display}</div>
    </div>
  );
};

export default Play;
