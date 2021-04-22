import React, { useState } from "react";

// Components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const card = {
  padding: "40px",
};

const PlayerSelectCard = (props) => {
  const availableColourJSX = props.playerColours.map((colour) => {
    return <option key={colour} className={colour}>{colour}</option>;
  });

  if (Object.keys(props.players).length < 2) {
    return (
      <div>
        <Card style={card}>
          <h2>Create Player</h2>
          <Form onSubmit={props.addNewPlayer}>
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
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PlayerSelectCard;
