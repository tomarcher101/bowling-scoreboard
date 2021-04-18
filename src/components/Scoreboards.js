import React from "react";
import Table from "react-bootstrap/Table";

import Scoreboard from "./Scoreboard";

import { useSelector } from "react-redux";

const Scoreboards = (props) => {
  const score = useSelector((state) => state.score);
  debugger
  const scoreboardArray = props.players.map((player) => {
    return <Scoreboard player={player.name} score={score[player.name]} colour={player.colour}/>;
  });

  return scoreboardArray;
};

export default Scoreboards;
