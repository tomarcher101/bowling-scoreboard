import React, { useState } from "react";

// Components
import Button from "react-bootstrap/Button";
import CustomAlert from "../../../CustomAlert";
import Form from "react-bootstrap/Form";
import SelectedPlayersTable from "./SelectedPlayersTable";

import {useDispatch} from "react-redux"
import * as actions from "../../../../store/actions";
import * as enums from "../../../../enums";


const PayerSelectPage = (props) => {
  const dispatch = useDispatch()

  // Players state
  const [players, setPlayers] = useState([]);
  const addNewPlayer = (event) => {
    event.preventDefault(); // Stop default form submission behaviour (page refresh)
    // Add player to player array
    let name = event.target.playerName.value;
    let colour = event.target.colour.value;
    if (name < 1 || name > 20) {
      dispatch(actions.playerNameBad())
      return;
    }
    if (players.map((player) => player.name).includes(name)) {
      dispatch(actions.playerNameTaken(name))
      return;
    }
    if (players.map((player) => player.colour).includes(colour)) {
      dispatch(actions.colourTaken(colour))
      return;
    }
    setPlayers([
      ...players,
      {
        name: name,
        colour: colour,
      },
    ]);
    // Remove the chosen colour
    changeColour(colour, "remove");
  };
  const removePlayer = (event) => {
    const newPlayers = players.filter(
      (player) => player.name !== event.target.dataset.name
    );
    changeColour(event.target.dataset.colour, "add");
    setPlayers(newPlayers);
  };

  // Colour state
  const [playerColours, setPlayerColours] = useState(enums.BOOTSRAP_COLOURS);
  const changeColour = (colour, action) => {
    if (action == "add") {
      setPlayerColours([...playerColours, colour]);
    } else {
      let filteredArray = playerColours.filter((c) => c != colour);
      setPlayerColours(filteredArray);
    }
  };
  const availableColourJSX = playerColours.map((colour) => {
    return <option key={colour}>{colour}</option>;
  });

  // Other functions
  const startGame = () => {
    if (players.length < 1) {
      dispatch(actions.minimumPlayersNotMet())
      return;
    }
    props.setGameActive(true);
    props.setPlayers(players);
  };

  return (
    <div>
      <h1>Player Select Screen</h1>

      {players.length < 2 ? (
        <div className="create-player-container">
          <h2>Create Player</h2>
          <Form onSubmit={addNewPlayer}>
            <Form.Group controlId="playerName">
              <Form.Label>Player Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="colour">
              <Form.Label>Player Colour</Form.Label>
              <Form.Control as="select">{availableColourJSX}</Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Player
            </Button>
          </Form>
        </div>
      ) : (
        <div></div>
      )}

      <div>
        <h2>Players</h2>
        <SelectedPlayersTable players={players} removePlayer={removePlayer} />
      </div>
      <div>
        <Button variant="success" onClick={startGame}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default PayerSelectPage;
