import React, { useState, useEffect } from "react";
import Scoreboards from "../../../Scoreboards";

import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../../../store/actions";
import ScoreInputter from "./ScoreInputter";

const LiveGame = (props) => {
  const dispatch = useDispatch();
  const playerNames = props.players.map((player) => player.name);
  dispatch(actions.setNoOfPlayers(playerNames.length));
  dispatch(actions.createIntialScore(playerNames));


  return (
    <div>
      <h1>Let's Plaaaay!</h1>
      <Scoreboards players={props.players} />
      <ScoreInputter players={props.players} />
    </div>
  );
};

export default LiveGame;
