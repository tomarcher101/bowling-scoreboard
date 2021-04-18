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
export const setNoOfPlayers = (noOfPlayers) => {
  return {
    type: actions.TURN.SET_NO_OF_PLAYERS,
    payload: {
      noOfPlayers: noOfPlayers,
    },
  };
};

export const incrementTurn = () => {
  return {
    type: actions.TURN.INCREMENT,
  };
};

// Score Actions
export const createIntialScore = (playerNames) => {
  return {
    type: actions.SCORE.CREATE,
    payload: {
      playerNames: playerNames,
    },
  };
};

export const updateScore = (playerName, scoreInput, frameNo, bowlNo) => {
  return {
    type: actions.SCORE.UPDATE,
    payload: {
      playerName: playerName,
      scoreInput: scoreInput,
      frameNo: frameNo,
      bowlNo: bowlNo,
    },
  };
};
