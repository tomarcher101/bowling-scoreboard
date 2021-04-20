import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as actions from "../actions/actions";

// Components
import Scoreboards from "./Scoreboards";
import ScoreInputter from "./ScoreInputter";

const titleDiv = {
  marginBottom: "60px",
};

const LiveGame = (props) => {
  const activeGame = useSelector((state) => state.turn.activeGame);
  const finalScores = useSelector((state) => state.score.finalScores);
  const [winnerInfo, setWinner] = useState({
    topScore: 0,
    topScorer: undefined,
    draw: false,
  });

  useEffect(() => {
    if (Object.keys(finalScores).length == 0) {
      return
    }
    getWinner()
  }, [finalScores])

  const getWinner = () => {
    for (let [name, score] of Object.entries(finalScores)) {
      if (name == winnerInfo.topScorer) {
        continue
      }
      if (score == winnerInfo.topScore) {
        setWinner({
          ...winnerInfo,
          draw: true,
          topScore: score,
        });
        continue
      }
      if (score > winnerInfo.topScore) {
        setWinner({
          ...winnerInfo,
          topScore: score,
          topScorer: name,
        });
        continue
      }
    }
  };

  const gameOverText = winnerInfo.draw ? (
    <h2>Wow. What a draw! Truly neck and neck!</h2>
  ) : (
    <h2>Congratulations to {winnerInfo.topScorer} for winning! What a game!</h2>
  )

  const gameOverEle = (
    <div>
      <h1 className="rl" style={{ fontSize: "40px" }}>
        Game Over!
      </h1>
      {gameOverText}
    </div>
  );
  const activeGameEle = (
    <div>
      <h1 className="rl" style={{ fontSize: "40px" }}>
        Let's play TomPin Bowling!
      </h1>
      <div style={{ display: "inline-block", marginTop: "20px" }}>
        <ScoreInputter />
      </div>
    </div>
  );
  const displayEle = activeGame ? activeGameEle : gameOverEle;

  return (
    <div>
      <div style={titleDiv}>
        {displayEle}
        <div style={{ marginTop: "60px", marginBottom: "60px" }}>
          <Scoreboards players={props.players} />
        </div>
      </div>
    </div>
  );
};

export default LiveGame;
