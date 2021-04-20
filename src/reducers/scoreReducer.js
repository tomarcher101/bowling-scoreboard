import * as type from "../actions/types";
import * as enums from "../enums";

const initialState = {
  currentUser: null,
  frames: {},
  finalScores: {},
};

export const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SCORE.INIT:
      const newFrames = {
        ...state,
        currentUser: action.payload.playerNames[0],
      };
      action.payload.playerNames.forEach((name) => {
        newFrames.frames[name] = {
          1: { 1: undefined, 2: undefined },
          2: { 1: undefined, 2: undefined },
          3: { 1: undefined, 2: undefined },
          4: { 1: undefined, 2: undefined },
          5: { 1: undefined, 2: undefined },
          6: { 1: undefined, 2: undefined },
          7: { 1: undefined, 2: undefined },
          8: { 1: undefined, 2: undefined },
          9: { 1: undefined, 2: undefined },
          10: { 1: undefined, 2: undefined },
        };
      });
      return newFrames;
    case type.SCORE.SUBMIT_FINAL_SCORE:
      return {
        ...state,
        finalScores: {
          ...state.finalScores,
          [action.payload.playerName]: action.payload.finalScore,
        },
      };
    case type.SCORE.PUSH:
      debugger
      const isStrike = action.payload.score == 10;
      if (isStrike && action.payload.frame == enums.FRAME_COUNT) {
        // In last frame strikes behave differently
        return {
          ...state,
          frames: {
            ...state.frames,
            [action.payload.player]: {
              ...state.frames[action.payload.player],
              [action.payload.frame]: {
                ...state.frames[action.payload.player][action.payload.frame],
                [action.payload.bowl]: 10,
              },
            },
          },
        };
      }
      if (isStrike) {
        return {
          ...state,
          frames: {
            ...state.frames,
            [action.payload.player]: {
              ...state.frames[action.payload.player],
              [action.payload.frame]: {
                ...state.frames[action.payload.player][action.payload.frame],
                [action.payload.bowl]: 10,
                [action.payload.bowl + 1]: null,
              },
            },
          },
        };
      }
      return {
        ...state,
        frames: {
          ...state.frames,
          [action.payload.player]: {
            ...state.frames[action.payload.player],
            [action.payload.frame]: {
              ...state.frames[action.payload.player][action.payload.frame],
              [action.payload.bowl]: action.payload.score,
            },
          },
        },
      };
    default:
      return state;
  }
};

export default scoreReducer;
