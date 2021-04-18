import * as type from "./types";

// Alert action
export const removeAlert = () => {
  return {
    type: type.ALERT.REMOVE,
  };
};

export const playerNameBad = () => {
  return {
    type: type.ALERT.UPDATE,
    payload: {
      title: "error",
      message: `Player name must be between 1 and 20 characters long.`,
    },
  };
};

export const playerNameTaken = (name) => {
  return {
    type: type.ALERT.UPDATE,
    payload: {
      title: "error",
      message: `Player name "${name}" has already been taken`,
    },
  };
};

export const colourTaken = (colour) => {
  return {
    type: type.ALERT.UPDATE,
    payload: {
      title: "error",
      message: `Colour ${colour} has already been taken`,
    },
  };
};

export const minimumPlayersNotMet = () => {
  return {
    type: type.ALERT.UPDATE,
    payload: {
      title: "error",
      message: "You need at least one player to start a game.",
    },
  };
};

// Turn actions
export const initPlayerQueue = (playerNames) => {
  return {
    type: type.TURN.SET_PLAYER_QUEUE,
    payload: {
      playerNames: playerNames,
    },
  };
};

export const incrementTurn = () => {
  return {
    type: type.TURN.INCREMENT,
  };
};

// Score actions
export const initScore = (playerNames) => {
  return {
    type: type.SCORE.INIT,
    payload: {
      playerNames: playerNames,
    },
  };
};

export const invalidScoreSubmission = (scoreInput) => {
  return {
    type: type.ALERT.UPDATE,
    payload: {
      title: "error",

      message: `"${scoreInput}" is not a valid score.`,
    },
  };
};

export const pushScore = (score, player, frame, bowl) => {
  return {
    type: type.SCORE.PUSH,
    payload: {
      score: score,
      frame: frame,
      bowl: bowl,
    },
  };
};
