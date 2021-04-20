import * as type from "./types";

// Alert action
export const removeAlert = () => {
  return {
    type: type.ALERT.REMOVE,
  };
};

export const setAlert = (title, variant, message) => {
  return {
    type: type.ALERT.UPDATE,
    payload: {
      title: title,
      variant: variant,
      message: message,
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

export const incrementTurn = (score, extraTurn = false) => {
  return {
    type: type.TURN.INCREMENT,
    payload: {
      score: score,
      extraTurn: extraTurn,
    },
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

export const pushScore = (score, player, frame, bowl) => {
  return {
    type: type.SCORE.PUSH,
    payload: {
      score: score,
      player: player,
      frame: frame,
      bowl: bowl,
    },
  };
};

export const submitFinalScore = (playerName, finalScore) => {
  return {
    type: type.SCORE.SUBMIT_FINAL_SCORE,
    payload: {
      playerName: playerName,
      finalScore: finalScore,
    },
  };
};
