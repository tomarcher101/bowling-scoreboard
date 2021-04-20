import { React, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { pushScore, incrementTurn } from "../actions/actions";
import * as enums from "../enums";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import StrikeModal from "./StrikeModal";

const card = {
  padding: "60px",
  width: "500px",
};
const container = {
  display: "flex",
  flexDirection: "column",
};

const ScoreInputter = (props) => {
  const dispatch = useDispatch();
  const [showStrike, setShowStrike] = useState(false);
  const activePlayer = props.turn.playerArray[props.turn.activePlayer] || null;
  const lastBowlScore =
    props.score.frames[activePlayer][props.turn.frameNo][props.turn.bowlNo - 1];

  const possiblePins = () => {
    // Final frame edge cases
    if (props.turn.bowlNo == 1) {
      return 11;
    }
    const islastBowlStrike = lastBowlScore == 10;
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

  const extraTurn = (bowlScore) => {
    if (props.turn.frameNo != 10 || props.turn.bowlNo != 2) {
      return false;
    }
    if (lastBowlScore == 10) {
      return true;
    }
    if (lastBowlScore + bowlScore == 10) {
      return true;
    }
    return false;
  };

  const submitScore = (i) => {
    dispatch(
      pushScore(
        i,
        activePlayer,
        props.turn.frameNo,
        props.turn.bowlNo,
        props.score[activePlayer]
      )
    );
    dispatch(incrementTurn(i, extraTurn(i)));
    if (i == 10) {
      console.log("STRIKE");
      setShowStrike(true);
    }
  };

  const hideStrike = () => {
    setShowStrike(false);
  };

  const pinputButtons = [];
  for (let i = 0; i < possiblePins(); i++) {
    pinputButtons.push(
      <Button
        key={`button` + i}
        style={{ margin: "2px" }}
        size="sm"
        variant={i == 0 ? "danger" : "success"}
        onClick={() => {
          submitScore(i);
        }}
      >
        {i}
      </Button>
    );
  }

  const activeGameEle = (
    <div>
      <div>
        <h1>
          It is <b className="rm">{activePlayer}'s</b> turn!
        </h1>
        <p>Select the no. of pins you just scored.</p>
      </div>
      <div>{pinputButtons}</div>
    </div>
  );

  const gameOverEle = (
    <div>
      <div>
        <h1>Thanks for playing TomPin Bowling!</h1>
      </div>
      <div>{pinputButtons}</div>
    </div>
  );

  return (
    <div>
      <Card style={card}>
        <div style={container}></div>
        {props.turn.activeGame ? activeGameEle : gameOverEle}
      </Card>
      {/* <StrikeModal showStrike={showStrike} hideStrike={hideStrike} /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { turn: state.turn, score: state.score };
};

export default connect(mapStateToProps)(ScoreInputter);
