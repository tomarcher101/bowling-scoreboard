import React from "react";
import { connect, useDispatch } from "react-redux";
import { pushScore, incrementTurn } from "../actions/actions";

const gbg = {
  backgroundColor: "green",
};

const ScoreInputter = (props) => {
  const dispatch = useDispatch();
  const possiblePins = () => {
    if (props.turn.bowlNo == 1) {
      return 10;
    } else if (props.turn.bowlNo == 2) {
      const previousBowlScore =
        props.score.frames[props.turn.playerArray[props.turn.activePlayer]][
          props.turn.frameNo
        ][props.turn.bowlNo - 1];
      return 10 - previousBowlScore;
    } else {
      return 10;
    }
  };
  const activePlayer = props.turn.playerArray[props.turn.activePlayer];

  const pinputButtons = [];
  for (let i = 0; i < possiblePins(); i++) {
    pinputButtons.push(
      <button
        key={`button` + (i + 1)}
        onClick={() => {
          dispatch(
            pushScore(
              i + 1,
              activePlayer,
              props.turn.frameNo,
              props.turn.bowlNo
            )
          );
          dispatch(incrementTurn(i + 1));
        }}
      >
        {i + 1}
      </button>
    );
  }

  if (props.turn.activeGame) {
    return (
      <div style={gbg}>
        <div>
          <h1>It is {activePlayer}'s turn!</h1>
          <p>Select the no. of pins you just scored.</p>
        </div>
        <div>{pinputButtons}</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Game Over</h1>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { turn: state.turn, score: state.score };
};

export default connect(mapStateToProps)(ScoreInputter);
