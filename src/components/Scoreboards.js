import { findLastIndex } from "lodash-es";
import React from "react";
import { connect } from "react-redux";

import PlayerScoreboard from "./PlayerScoreboard";

const container = {
  display: "flex",
  margin: "40px",
};
const name = {
  display: "flex",
  alignItems: "center",
}

const Scoreboards = (props) => {
  const playerScoreboards = props.players.map((player) => {
    return (
      <div style={container} key={player.name}>
          <h2 style={{alignItems: "center", padding: "30px"}} key={player.name}>{player.name}</h2>
        <div style={name} key={player.name}>
        </div>
        <PlayerScoreboard
          colour={player.colour}
          score={props.score.frames[player.name]}
          playerName={player.name}
          key={player.name}
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
