import React from "react";
import Table from "react-bootstrap/Table";

import { useSelector } from "react-redux"

const Scoreboard = (props) => {
  const colourMap = {
    blue: "table-primary",
    green: "table-success",
    yellow: "table-warning",
    red: "table-danger",
    teal: "table-info",
  }

  return (
    <div>
      <div>
        <h1>{props.player.name}</h1>
        <Table striped bordered hover>
          <tbody>
            <tr className={colourMap[props.colour]}>
              <th>Frame</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Bowl 1</th>
              <td>{props.score.scores.frame1.bowl1}</td>
              <td>{props.score.scores.frame2.bowl1}</td>
              <td>{props.score.scores.frame3.bowl1}</td>
              <td>{props.score.scores.frame4.bowl1}</td>
              <td>{props.score.scores.frame5.bowl1}</td>
              <td>{props.score.scores.frame6.bowl1}</td>
              <td>{props.score.scores.frame7.bowl1}</td>
              <td>{props.score.scores.frame8.bowl1}</td>
              <td>{props.score.scores.frame9.bowl1}</td>
              <td>{props.score.scores.frame10.bowl1}</td>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Bowl 2</th>
              <td>{props.score.scores.frame1.bowl2}</td>
              <td>{props.score.scores.frame2.bowl2}</td>
              <td>{props.score.scores.frame3.bowl2}</td>
              <td>{props.score.scores.frame4.bowl2}</td>
              <td>{props.score.scores.frame5.bowl2}</td>
              <td>{props.score.scores.frame6.bowl2}</td>
              <td>{props.score.scores.frame7.bowl2}</td>
              <td>{props.score.scores.frame8.bowl2}</td>
              <td>{props.score.scores.frame9.bowl2}</td>
              <td>{props.score.scores.frame10.bowl2}</td>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Bowl 3</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{props.score.scores.frame10.bowl3}</td>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Score</th>
              <td>{props.score.scores.frame1.runningScore}</td>
              <td>{props.score.scores.frame2.runningScore}</td>
              <td>{props.score.scores.frame3.runningScore}</td>
              <td>{props.score.scores.frame4.runningScore}</td>
              <td>{props.score.scores.frame5.runningScore}</td>
              <td>{props.score.scores.frame6.runningScore}</td>
              <td>{props.score.scores.frame7.runningScore}</td>
              <td>{props.score.scores.frame8.runningScore}</td>
              <td>{props.score.scores.frame9.runningScore}</td>
              <td className={colourMap[props.colour]}>{props.score.scores.frame10.runningScore}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Scoreboard;
