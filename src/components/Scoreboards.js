import { findLastIndex } from "lodash-es";
import React from "react";
import { connect } from "react-redux";

import PlayerScoreboard from "./PlayerScoreboard";

const container = {
  display: "flex",
};
const name = {
  display: "flex",
  alignItems: "center",
}

const Scoreboards = (props) => {
  const playerScoreboards = Object.keys(props.score.frames).map((player) => {
    return (
      <div style={container}>
        <div style={name}>
          <h2>{player}</h2>
        </div>
        <PlayerScoreboard
          score={props.score.frames[player]}
          playerName={player}
        />
      </div>
    );
  });

  return <div>{playerScoreboards}</div>;
};

const mapStateToProps = (state) => {
  return { score: state.score };
};

export default connect(mapStateToProps)(Scoreboards);
