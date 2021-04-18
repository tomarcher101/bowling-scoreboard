import React from "react";
import { connect, useDispatch } from "react-redux";
import { pushScore } from "../actions/actions";

const gbg = {
  backgroundColor: "green"
}

const ScoreInputter = (props) => {
  const dispatch = useDispatch();
  const possiblePins = () => {
    if (props.turn.bowlNo == 0) {
      return 10;
    }
    return 10;
  };
  const activePlayer = props.turn.playerQueue[0]

  const pinputButtons = [];
  for (let i = 0; i < possiblePins(); i++) {
    pinputButtons.push(
      <button
        key={`button` + (i + 1)}
        onClick={() => {
          dispatch(pushScore(i + 1, activePlayer));
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div style={gbg}>
      <div>
        <h1>It is {activePlayer}'s turn!</h1>
        <p>Select the no. of pins you just scored.</p>
      </div>
      <div>{pinputButtons}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { turn: state.turn, score: state.score };
};

export default connect(mapStateToProps)(ScoreInputter);
