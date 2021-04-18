import React from "react";
import { connect } from "react-redux";

import PlayerScoreboard from "./PlayerScoreboard";

const Scoreboards = (props) => {
  const playerScoreboards = Object.keys(props.score.frames).map(player => {
    return (
      <div>
        <h2>{player}</h2>
        <PlayerScoreboard score={props.score.frames[player]} />
      </div>
    )
  })

  return <div>{playerScoreboards}</div>;
};

const mapStateToProps = (state) => {
  return { score: state.score };
};

export default connect(mapStateToProps)(Scoreboards);
