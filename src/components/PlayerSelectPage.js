import React, { useState } from "react";

// Components
import Button from "react-bootstrap/Button";
import PlayerSelectCard from "./PlayerSelectCard";
import SelectedPlayersTable from "./SelectedPlayersTable";

import { useDispatch } from "react-redux";
import * as actions from "../actions/actions";
import * as enums from "../enums";

const PayerSelectPage = (props) => {
  const dispatch = useDispatch();
  const [players, setPlayers] = useState({});
  const [playerColours, setPlayerColours] = useState(enums.BOOTSRAP_COLOURS);

  const addNewPlayer = (event) => {
    event.preventDefault();
    let name = event.target.playerName.value;
    let colour = event.target.colour.value;
    if (name < 1 || name > 20) {
      dispatch(
        actions.setAlert(
          "error",
          "danger",
          "Player name must be between 1 and 20 characters long."
        )
      );
      return;
    }
    if (Object.keys(players).includes(name)) {
      dispatch(
        actions.setAlert(
          "error",
          "danger",
          `Player name "${name}" has already been taken`
        )
      );
      return;
    }
    if (Object.values(players).includes(colour)) {
      dispatch(
        actions.setAlert(
          "error",
          "danger",
          `colour "${colour}" has already been taken`
        )
      );
      return;
    }
    setPlayers({
      ...players,
      [name]: colour,
    });
    changeColour(colour, "remove");
  };

  const removePlayer = (event) => {
    const newPlayers = players.filter(
      (player) => player.name !== event.target.dataset.name
    );
    changeColour(event.target.dataset.colour, "add");
    setPlayers(newPlayers);
  };

  const changeColour = (colour, action) => {
    if (action == "add") {
      setPlayerColours([...playerColours, colour]);
    } else {
      let filteredArray = playerColours.filter((c) => c != colour);
      setPlayerColours(filteredArray);
    }
  };

  const startGame = () => {
    if (players.length < 1) {
      dispatch(
        actions.setAlert("error", "danger", "There must be at least 1 player")
      );
      return;
    }
    props.setGameActive(players);
  };

  return (
    <div>
      <div style={{ marginBottom: "60px" }}>
        <h1>Player Select Screen</h1>
      </div>
      <div style={{ marginBottom: "60px" }}>
        <PlayerSelectCard
          players={players}
          addNewPlayer={addNewPlayer}
          playerColours={playerColours}
        />
      </div>
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
