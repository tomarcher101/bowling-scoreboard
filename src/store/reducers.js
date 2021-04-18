import * as actions from "./actionTypes";
import * as enums from "../enums";
import { combineReducers } from "redux";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

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
const turnInitialState = {
  frameNo: 1,
  activePlayer: 0,
  bowlNo: 1,
  noOfPlayers: 0,
  activeGame: true,
};

const turnReducer = (state = turnInitialState, action) => {
  switch (action.type) {
    case actions.TURN.SET_NO_OF_PLAYERS:
      return {
        frameNo: state.frameNo,
        activePlayer: state.activePlayer,
        bowlNo: state.bowlNo,
        noOfPlayers: action.payload.noOfPlayers,
        gameOver: false,
      };
    case actions.TURN.INCREMENT:
      const newTurn = {
        frameNo: state.frameNo,
        activePlayer: state.activePlayer,
        bowlNo: state.bowlNo,
        noOfPlayers: state.noOfPlayers,
        gameOver: false,
      };
      const isLastFrame = state.frameNo == enums.FRAME_COUNT ? true : false;
      const isLastPlayer = state.activePlayer == state.noOfPlayers - 1;
      const noOfBowlsInFrame = isLastFrame ? 3 : 2;
      const isLastBowl = state.bowlNo == noOfBowlsInFrame;
      if (isLastFrame && isLastPlayer && isLastBowl) {
        return {
          gameOver: true,
        };
      }
      if (isLastPlayer && isLastBowl) {
        // Go to next frame
        newTurn.frameNo += 1;
        newTurn.activePlayer = 0;
        newTurn.bowlNo = 1;
        return newTurn;
      }
      if (isLastBowl) {
        // Go to next player
        newTurn.activePlayer += 1;
        newTurn.bowlNo = 1;
        return newTurn;
      }
      // else just incrememnt bowlNo
      newTurn.bowlNo += 1;
      return newTurn;
    default:
      return state;
  }
};

// Score Reducer
const scoreInitialState = {};

const scoreReducer = (state = scoreInitialState, action) => {
  switch (action.type) {
    // Create initial scoreboard
    case actions.SCORE.CREATE:
      const newScoreState = clonedeep(state);
      action.payload.playerNames.map((name) => {
        newScoreState[name] = {
          name: name,
          scores: {
            frames: {
              1: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              2: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              3: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              4: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              5: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              6: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              7: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              8: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              9: {
                bowls: {
                  1: undefined,
                  2: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
              10: {
                bowls: {
                  1: undefined,
                  2: undefined,
                  3: undefined,
                },
                frameTotal: undefined,
                runningScore: undefined,
              },
            },
          },
          totalScore: undefined,
        };
      });
      return newScoreState;
    // Update the score
    case actions.SCORE.UPDATE:
      let updatedScore = clonedeep(state);
      const playerName = action.payload.playerName;
      const frameNo = action.payload.frameNo;
      const bowlNo = action.payload.bowlNo;
      const scoreInput = action.payload.scoreInput;
      const frames = updatedScore[playerName].scores.frames;

      // Update current bowl
      frames[frameNo].bowls[bowlNo] = action.payload.scoreInput;
      return updatedScore;

      // Update frameTotals
      
      
    default:
      return state;
  }
};

const getFrameScore = (frames, currentFrameNo) => {
  let frameScore = 0;
  // Get base score
  frameScore += Object.values(frames[currentFrameNo].bowls).reduce(
    (acc, curr) => acc + curr
  );

  const isStrike = frames[currentFrameNo].bowls[1] == 10
  const isSpare = Object.values(frames[currentFrameNo].bowls).reduce((acc, curr) => acc + curr) == 10
  const isNextBowlComplete = frames[currentFrameNo + 1].bowls[1] != undefined
  const areNext2BowlsComplete = !(Object.values(frames[currentFrameNo + 1].bowls).includes(undefined))
  
  // If no strike / spare => get score
  debugger
  if (!(isStrike || isSpare)) {
    return frameScore
  }
  if (isSpare && isNextBowlComplete) {
    frameScore += frames[currentFrameNo + 1].bowls[1];
    return frameScore 
  }
  if (isStrike && areNext2BowlsComplete) {
    frameScore += frames[currentFrameNo + 1].bowls[1];
    frameScore += frames[currentFrameNo + 1].bowls[2];
    return frameScore
  }
  throw `frame (${currentFrameNo}) is not stirke, spare or open frame`

  // if (
  //   frames[currentFrameNo].bowls[1] == 10 &&
  //   !Object.values(frames[currentFrameNo + 1].bowls).includes(undefined)
  // ) {
  //   // If thisFrame==strike and next frame is filled => add next 2 bowls
  //   frameScore += frames[currentFrameNo + 1].bowls[1];
  //   frameScore += frames[currentFrameNo + 1].bowls[2];
  // } else if (
  //   // If spare and next bowl is filled => add the bowl
  //   frames[currentFrameNo].bowls[1] + frames[currentFrameNo].bowls[2] ==
  //   10 && !frames[currentFrameNo + 1].bowls[1].inclues(undefined)
  // ) {
  //   // If spare add next bowl
  // }
  debugger;
  return frameScore;
};

const allReducers = combineReducers({
  alert: alertReducer,
  score: scoreReducer,
  turn: turnReducer,
});

export default allReducers;
