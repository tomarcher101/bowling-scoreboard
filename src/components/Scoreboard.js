import React from "react";

// Components
import Table from "react-bootstrap/Table";

const Scoreboard = (props) => {
  const colourMap = {
    blue: "table-primary",
    green: "table-success",
    yellow: "table-warning",
    red: "table-danger",
    teal: "table-info",
  };

  const formatFrameScore = (frame) => {
    if (frame.frameScore == undefined) {
      return null
    }
    if (frame.bowls[0] == 10) {
      return "X";
    }
    if (frame.frameScore == 10) {
      return "/";
    }
    return frame.frameScore;
  };

  const runningScore = (frames, currentFrame) => {
    if (props.turn.frameNo < currentFrame) {
      return null
    }
    var counter = 0;
    for (let i = 1; i < currentFrame + 1; i++) {
      if (frames[i].frameTotal == undefined) {
        return null;
      }
      counter += frames[i].frameTotal
    }
    return counter;
  };

  return (
    <div>
      <div>
        <h1>{props.player}</h1>
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
              <td>{props.score.scores.frames[1].bowls[1]}</td>
              <td>{props.score.scores.frames[2].bowls[1]}</td>
              <td>{props.score.scores.frames[3].bowls[1]}</td>
              <td>{props.score.scores.frames[4].bowls[1]}</td>
              <td>{props.score.scores.frames[5].bowls[1]}</td>
              <td>{props.score.scores.frames[6].bowls[1]}</td>
              <td>{props.score.scores.frames[7].bowls[1]}</td>
              <td>{props.score.scores.frames[8].bowls[1]}</td>
              <td>{props.score.scores.frames[9].bowls[1]}</td>
              <td>{props.score.scores.frames[10].bowls[1]}</td>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Bowl 2</th>
              <td>{props.score.scores.frames[1].bowls[2]}</td>
              <td>{props.score.scores.frames[2].bowls[2]}</td>
              <td>{props.score.scores.frames[3].bowls[2]}</td>
              <td>{props.score.scores.frames[4].bowls[2]}</td>
              <td>{props.score.scores.frames[5].bowls[2]}</td>
              <td>{props.score.scores.frames[6].bowls[2]}</td>
              <td>{props.score.scores.frames[7].bowls[2]}</td>
              <td>{props.score.scores.frames[8].bowls[2]}</td>
              <td>{props.score.scores.frames[9].bowls[2]}</td>
              <td>{props.score.scores.frames[10].bowls[2]}</td>
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
              <td>{props.score.scores.frames[10].bowls[3]}</td>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Frame Score</th>
              <td>{formatFrameScore(props.score.scores.frames[1])}</td>
              <td>{formatFrameScore(props.score.scores.frames[2])}</td>
              <td>{formatFrameScore(props.score.scores.frames[3])}</td>
              <td>{formatFrameScore(props.score.scores.frames[4])}</td>
              <td>{formatFrameScore(props.score.scores.frames[5])}</td>
              <td>{formatFrameScore(props.score.scores.frames[6])}</td>
              <td>{formatFrameScore(props.score.scores.frames[7])}</td>
              <td>{formatFrameScore(props.score.scores.frames[8])}</td>
              <td>{formatFrameScore(props.score.scores.frames[9])}</td>
              <td>{formatFrameScore(props.score.scores.frames[10])}</td>
            </tr>
            <tr>
              <th className={colourMap[props.colour]}>Running Score</th>
              <td>{runningScore(props.score.scores.frames, 1)}</td>
              <td>{runningScore(props.score.scores.frames, 2)}</td>
              <td>{runningScore(props.score.scores.frames, 3)}</td>
              <td>{runningScore(props.score.scores.frames, 4)}</td>
              <td>{runningScore(props.score.scores.frames, 5)}</td>
              <td>{runningScore(props.score.scores.frames, 6)}</td>
              <td>{runningScore(props.score.scores.frames, 7)}</td>
              <td>{runningScore(props.score.scores.frames, 8)}</td>
              <td>{runningScore(props.score.scores.frames, 9)}</td>
              <td>{runningScore(props.score.scores.frames, 10)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Scoreboard;
