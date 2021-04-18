import * as actions from "./actionTypes";

// Alert Actions
export const playerNameBad = () => {
  return {
    type: actions.ALERT.UPDATE,
    payload: {
      type: "Error",
      colour: "danger",
      message: `Player name must be between 1 and 20 characters long.`,
    },
  };
};

export const playerNameTaken = (name) => {
  return {
    type: actions.ALERT.UPDATE,
    payload: {
      type: "Error",
      colour: "danger",
      message: `Player name "${name}" has already been taken`,
    },
  };
};

export const colourTaken = (colour) => {
  return {
    type: actions.ALERT.UPDATE,
    payload: {
      type: "Error",
      colour: "danger",
      message: `Colour ${colour} has already been taken`,
    },
  };
};

export const removeAlert = () => {
  return {
    type: actions.ALERT.REMOVE,
  };
};

export const minimumPlayersNotMet = () => {
  return {
    type: actions.ALERT.UPDATE,
    payload: {
      type: "Error",
      colour: "danger",
      message: "You need at least one player to start a game.",
    },
  };
};

export const invalidScoreSubmission = (scoreInput) => {
  return {
    type: actions.ALERT.UPDATE,
    payload: {
      type: "Error",
      colour: "danger",
      message: `"${scoreInput}" is not a valid score.`,
    },
  };
};

// Turn Actions
export const createTurn = (players) => {
  return {
    type: actions.TURN.CREATE,
    payload: {
      players: players
    }
  }
}

export const nextTurn = (turn) => {
  return {
    type: actions.TURN.NEXT,
  }
}

// Score Actions
export const createPlayer = (playerName) => {
  return {
    type: actions.SCORE.CREATE,
    payload: {
      name: playerName,
    }
  }
}

export const submitScore = (scoreInput, turn) => {
  return {
    type: actions.SCORE.SUBMIT,
    payload: {
      playerName: turn.players[turn.activePlayer],
      frame: turn.frame,
      bowl: turn.bowl,
      score: scoreInput,
    }
  }
}