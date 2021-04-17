import React, { useState } from "react";

// Components
import Button from "react-bootstrap/Button";
import PlayerSelectCard from "./PlayerSelectCard";
import SelectedPlayersTable from "./SelectedPlayersTable";

import {useDispatch} from "react-redux"
import * as actions from "../actions/actions";
import * as enums from "../enums";


const PayerSelectPage = (props) => {
  const dispatch = useDispatch()
  const [players, setPlayers] = useState([]);
  const [playerColours, setPlayerColours] = useState(enums.BOOTSRAP_COLOURS);

  const addNewPlayer = (event) => {
    event.preventDefault();
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
      dispatch(actions.minimumPlayersNotMet())
      return;
    }
    props.setGameActive(true);
    props.setPlayers(players);
  };

  return (
    <div>
      <div style={{marginBottom: "60px"}}>
        <h1>Player Select Screen</h1>
      </div>
      <div style={{marginBottom: "60px"}}>
        <PlayerSelectCard players={players} addNewPlayer={addNewPlayer} playerColours={playerColours}/>
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