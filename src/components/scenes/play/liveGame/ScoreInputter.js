import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";

import * as actions from "../../../../store/actions";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const ScoreInputter = (props) => {
  const dispatch = useDispatch();
  const activePlayerName = props.players.map((player) => player.name)[
    props.turn.activePlayer
  ];
  const lastScore = () => {
    return props.score[activePlayerName].scores.frames[props.turn.frameNo]
      .bowls[props.turn.bowlNo - 1];
  };

  const possiblePins = () => {
    if (props.turn.bowlNo == 1) {
      return 10;
    } else if (props.turn.bowlNo == 2) {
      return 10 - lastScore();
    }
  };

  const submitScore = (event) => {
    event.preventDefault(); // Stop default form submission behaviour (page refresh)
    const scoreInput = event.target.inputScore.value;
    event.target.reset();

    const scoreNumber = parseInt(scoreInput);
    if (isNaN(scoreNumber)) {
      dispatch(actions.invalidScoreSubmission(scoreInput));
      return;
    }
    if (scoreNumber < 0 || scoreNumber > possiblePins()) {
      dispatch(actions.invalidScoreSubmission(scoreInput));
      return;
    }
    dispatch(
      actions.updateScore(
        activePlayerName,
        scoreNumber,
        props.turn.frameNo,
        props.turn.bowlNo
      )
    );
    dispatch(actions.incrementTurn());
  };

  if (!props.turn.gameOver) {
    return (
      <Card>
        <Card.Header as="h5">
          It's{" "}
          {props.players.map((player) => player.name)[props.turn.activePlayer]}
          's Turn
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitScore}>
            <Form.Group controlId="inputScore">
              <Form.Label>How many pins did you knock down?</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter a number between 1 and ${possiblePins()}`}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit Score
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  } else {
    return <Card>Game Over!</Card>;
  }
};

const mapStateToProps = (state) => {
  return { turn: state.turn, score: state.score };
};

export default connect(mapStateToProps)(ScoreInputter);
