import React from "react";
import { connect } from "react-redux";

// Components
import PlayerScoreboard from "./PlayerScoreboard";

const container = {
  margin: "40px",
};
const name = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "10px",
};

const Scoreboards = (props) => {
  const playerScoreboards = Object.entries(props.players).map(
    ([playerName, colour]) => {
      return (
        <div style={container} key={playerName}>
          <div style={name} key={playerName}>
            <h2 className="rm" key={playerName}>{playerName}</h2>
          </div>
          <div className="ps-container">
            <PlayerScoreboard
              colour={colour}
              score={props.score.frames[playerName]}
              playerName={playerName}
              key={playerName}
            />
          </div>
        </div>
      );
    }
  );

  return <div className="scoreboards">{playerScoreboards}</div>;
};

const mapStateToProps = (state) => {
  return { score: state.score };
};

export default connect(mapStateToProps)(Scoreboards);
