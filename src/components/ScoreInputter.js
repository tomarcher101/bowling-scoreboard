import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { pushScore, incrementTurn } from "../actions/actions";
import * as enums from "../enums";

const gbg = {
  backgroundColor: "green",
};

const ScoreInputter = (props) => {
  const dispatch = useDispatch();
  const activePlayer = props.turn.playerArray[props.turn.activePlayer];
  const islastBowlStrike = props.score.frames[activePlayer][props.turn.frameNo][props.turn.bowlNo - 1] == 10;

  const possiblePins = () => {
    // Final frame edge cases
    if (props.turn.bowlNo == 1) {
      return 11;
    }
    if (props.turn.frameNo == enums.FRAME_COUNT && islastBowlStrike) {
      return 11;
    }
    if (props.turn.bowlNo == 2) {
      const previousBowlScore =
        props.score.frames[props.turn.playerArray[props.turn.activePlayer]][
          props.turn.frameNo
        ][props.turn.bowlNo - 1];
      return 11 - previousBowlScore;
    }
    return 11;
  };

  const pinputButtons = [];
  for (let i = 0; i < possiblePins(); i++) {
    pinputButtons.push(
      <button
        key={`button` + i}
        onClick={() => {
          dispatch(
            pushScore(i, activePlayer, props.turn.frameNo, props.turn.bowlNo)
          );
          dispatch(incrementTurn(i));
        }}
      >
        {i}
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
