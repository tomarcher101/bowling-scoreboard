import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../actions/actions";

// Components
import Scoreboards from "./Scoreboards";
import ScoreInputter from "./ScoreInputter";

const titleDiv = {
  marginBottom: "60px",
}

const LiveGame = (props) => {
  const dispatch = useDispatch();
  const playerNames = props.players.map((player) => player.name);
  dispatch(actions.initPlayerQueue(playerNames));
  dispatch(actions.initScore(playerNames));

  return (
        <div>
          <div style={titleDiv}>
            <h1 className="rm">Let's play TomPin Bowling!</h1>
          </div>
          <div>
            <ScoreInputter />
          </div>
          <div>
            <Scoreboards />
          </div>
        </div>
  );
};

export default LiveGame;
