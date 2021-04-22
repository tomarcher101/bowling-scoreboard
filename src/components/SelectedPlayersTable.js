// Components
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const SelectedPlayersTable = (props) => {
  const playerRows = [];
  for (let player in props.players) {
    playerRows.push(
      <tr key={player}>
        <td>{player}</td>
        <td>{props.players[player]}</td>
        <td>
          <Button
            variant="danger"
            data-name={player}
            data-colour={props.players[player]}
            onClick={props.removePlayer}
          >
            Remove Player
          </Button>
        </td>
      </tr>
    );
  }

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

export default SelectedPlayersTable;
