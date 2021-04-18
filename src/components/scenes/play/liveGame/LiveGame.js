import React, { useState, useEffect } from "react";
import Scoreboards from "../../../Scoreboards";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../../../store/actions";

const LiveGame = (props) => {
  const dispatch = useDispatch();

  const playerNameArray = props.players.map(player => player.name)
  const [turn, setTurn] = useState({
    frame: 1,
    activePlayer: 0,
    bowl: 1,
    playerArray: playerNameArray,
  })

  playerNameArray.forEach((player) => {
    dispatch(actions.createPlayer(player));
  });

  // update scoreboard when score updates
  useEffect(() => {

  }, )

  const possiblePins = () => {
    if (turn.bowl == 1) {
      return 10;
    } else if (turn.bowl == 2) {
      return 10;
      // Number(
      //   score[turn.player.active].scores[`frame${turn.frame}`][
      //     `bowl${turn.bowl}`
      //   ]
      //   )
      // );
    }
  };

  const submitScore = (event) => {
    event.preventDefault(); // Stop default form submission behaviour (page refresh)
    const input = event.target.inputScore.value;
    const scoreInput = parseInt(input);
    if (isNaN(scoreInput)) {
      dispatch(actions.invalidScoreSubmission(input));
      return;
    }
    if (scoreInput < 0 || scoreInput > possiblePins()) {
      dispatch(actions.invalidScoreSubmission(scoreInput));
      return;
    }
    dispatch(actions.submitScore(scoreInput, turn));
    setTurn(state => {
      return {
        frame: state.frame += 1,
        activePlayer: 0,
        bowl: 1,
        playerArray: playerNameArray,
      }
    })
  };

  return (
    <div>
      <h1>Let's bowl!</h1>
      <div>
        <Card>
          <Card.Header as="h5">
            It's {turn.playerArray[turn.activePlayer]}'s Turn
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
      </div>
      <Scoreboards players={props.players}/>
    </div>
  );
};

export default LiveGame;
