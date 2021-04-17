import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"

const PlayerTable = (props) => {
  const playerRows = props.players.map((player) => {
    return (
      <tr key={player.name}>
        <td>{player.name}</td>
        <td>{player.colour}</td>
        <td>
          <Button variant="danger" data-name={player.name} data-colour={player.colour} onClick={props.removePlayer}>Remove Player</Button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Colour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{playerRows}</tbody>
      </Table>
    </div>
  );
};

export default PlayerTable;
