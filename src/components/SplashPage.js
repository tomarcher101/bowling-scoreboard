import React from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";

const SplashPage = () => {
  return (
    <div>
      <div>
        <h1>Welcome to Tom Pin Bowling!</h1>
      </div>
      <div>
        <Button>
          <Link to="/play">Play</Link>
        </Button>
        <Button>
          <Link to="/leaderboard">Leaderboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default SplashPage;
