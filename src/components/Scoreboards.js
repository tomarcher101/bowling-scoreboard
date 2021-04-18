import React from "react";
import { useSelector, connect } from "react-redux";

// Components
import Scoreboard from "./Scoreboard";


const Scoreboards = (props) => {
  const scoreboardArray = props.players.map((player) => {
    return <Scoreboard player={player.name} score={props.score[player.name]} turn={props.turn} colour={player.colour} key={player.name}/>;
  });

  return scoreboardArray;
};

const mapStateToProps = state => {
  return {score: state.score, turn: state.turn}
}

export default connect(mapStateToProps)(Scoreboards);
