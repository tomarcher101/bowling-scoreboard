import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Components
import Button from "react-bootstrap/Button";

const SplashPage = () => {
  return (
    <div style={{padding: "100px"}}>
      <div>
        <h1>This is Tom Pin Bowling!</h1>
      </div>
      <div>
        <Button style={{margin: "20px"}}>
          <Link to="/play">Play</Link>
        </Button>
        <Button style={{margin: "20px"}}>
          <Link to="/leaderboard">Leaderboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default SplashPage;
