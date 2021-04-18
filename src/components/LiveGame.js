import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions/actions";

// Components
import Scoreboards from "./Scoreboards";
import ScoreInputter from "./ScoreInputter";

const LiveGame = (props) => {
  const dispatch = useDispatch();
  const playerNames = props.players.map((player) => player.name);
  dispatch(actions.initPlayerQueue(playerNames));
  dispatch(actions.initScore(playerNames));


  return (
    <div>
      <h1>Let's Plaaaay!</h1>
      <ScoreInputter />
      <Scoreboards />
    </div>
  );
};

export default LiveGame;
