import * as actions from "./actionTypes";
import { combineReducers } from "redux";

const clonedeep = require("lodash.clonedeep");

// Alert Reducer
const alertInitialState = {
  active: false,
  type: null,
  colour: null,
  message: null,
};

const alertReducer = (state = alertInitialState, action) => {
  switch (action.type) {
    case actions.ALERT.UPDATE:
      return {
        active: true,
        type: action.payload.type,
        colour: action.payload.colour,
        message: action.payload.message,
      };
    case actions.ALERT.REMOVE:
      const newAlert = clonedeep(state);
      newAlert.active = false;
      return newAlert;
    default:
      return state;
  }
};

// Turn Reducer
const turnInitialState = {};

const turnReducer = (state = turnInitialState, action) => {
  switch (action.type) {
    case actions.TURN.CREATE:
      return {
        frame: 1,
        activePlayer: 0,
        bowl: 1,
        players: action.payload.players,
      }
    case actions.TURN.NEXT:
      const newTurn = {
        frame: state.frame,
        players: state.players,
        activePlayer: state.activePlayer,
        bowl: state.bowl,
      };
      if (state.bowl < 2) {
        newTurn.bowl += 1;
      } else if (state.bowl < 3 && state.frame == 10) {
        newTurn.bowl += 1;
      } else if (
        state.bowl >= 2 &&
        state.activePlayer < state.players.length - 1
      ) {
        newTurn.activePlayer += 1;
        newTurn.bowl = 1;
      } else if (
        state.bowl >= 2 &&
        state.activePlayer == state.players.length - 1
      ) {
        newTurn.frame += 1;
        newTurn.activePlayer = 0;
        newTurn.bowl = 1;
      }
      return newTurn;
    default:
      return state;
  }
};

// Score Reducer
const scoreInitialState = {};

const scoreReducer = (state = scoreInitialState, action) => {
  switch (action.type) {
    case actions.SCORE.CREATE:
      const intialScore = clonedeep(state);
      intialScore[action.payload.name] = {
        name: action.payload.name,
        scores: {
          frame1: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame2: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame3: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame4: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame5: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame6: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame7: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame8: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame9: {
            bowl1: null,
            bowl2: null,
            runningScore: null,
          },
          frame10: {
            bowl1: null,
            bowl2: null,
            bowl3: null,
            runningScore: null,
          },
        },
        totalScore: null,
      };
      return intialScore;
    case actions.SCORE.SUBMIT:
      const updatedScore = clonedeep(state);
      debugger;
      updatedScore[action.payload.playerName].scores[
        `frame${action.payload.frame}`
      ][`bowl${action.payload.bowl}`] = action.payload.score;
      return updatedScore;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  alert: alertReducer,
  score: scoreReducer,
  turn: turnReducer,
});

export default allReducers;
