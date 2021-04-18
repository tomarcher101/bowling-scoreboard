import * as type from "../actions/types";

const initialState = {
  currentUser: undefined,
  frames: {},
};

export const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SCORE.INIT:
      const newFrames = {...state, currentUser: action.payload.playerNames[0]}
      action.payload.playerNames.forEach((name) => {
        newFrames.frames[name] = {}
      });
      return newFrames;
    case type.SCORE.PUSH:
      return [...state];
    default:
      return state;
  }
};

export default scoreReducer;
