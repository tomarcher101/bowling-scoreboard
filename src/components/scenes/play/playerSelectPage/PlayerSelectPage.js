import React, { useState } from "react";

// Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PlayerTable from "./PlayerTable";

const PayerSelectPage = (props) => {
  // Alert state
  const [alerts, setAlert] = useState({});
  const clearAlerts = () => {
    setAlert(null);
  };

  // Players state
  const [players, setPlayers] = useState([]);
  const addNewPlayer = (event) => {
    event.preventDefault(); // Stop default form submission behaviour (page refresh)
    // Add player to player array
    let name = event.target.playerName.value;
    let colour = event.target.colour.value;
    // Check for errors
    if (players.map((player) => player.name).includes(name)) {
      setAlert({
        type: "Error",
        colour: "danger",
        message: `Player name "${name}" has already been taken`,
      });
      return;
    }
    if (players.map((player) => player.colour).includes(colour)) {
      setAlert({
        type: "Error",
        colour: "danger",
        message: `Colour ${colour} has already been taken`,
      });
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
    const newPlayers = players.filter(player => player.name !== event.target.dataset.name)
    changeColour(event.target.dataset.colour, "add")
    setPlayers(newPlayers)
  }

  // Colour state
  const [playerColours, setPlayerColours] = useState([
    "Blue",
    "Red",
    "Yellow",
    "Green",
    "Orange",
    "Purple",
  ]);
  const changeColour = (colour, action) => {
    if (action == "add") {
      setPlayerColours([...playerColours, colour]);
    } else {
      let filteredArray = playerColours.filter((c) => c != colour);
      setPlayerColours(filteredArray);
    }
  };
  const availableColourJSX = playerColours.map((colour) => {
    return <option>{colour}</option>;
  });

  const startGame = () => {
    if (players.length < 1) {
      setAlert({
        type: "Error",
        colour: "danger",
        message: "You need at least one player to start a game."
      })
      return
    }
    props.setGameActive(true)
    props.setPlayers(players)
  }

  return (
    <div>
      {alerts && Object.keys(alerts).length != 0 ? (
        <Alert variant={alerts.colour}>
          <div>
            {alerts.type}: {alerts.message}
          </div>
          <div>
            <Button size="sm" variant="outline-light" onClick={clearAlerts}>x</Button>
          </div>
        </Alert>
      ) : (<div></div>)}
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
        <PlayerTable players={players} removePlayer={removePlayer}/>
      </div>
      <div>
        <Button variant="success" onClick={startGame}>Start Game</Button>
      </div>
    </div>
  );
};

export default PayerSelectPage;
