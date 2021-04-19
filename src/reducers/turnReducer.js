import * as actions from "../actions/types";
import * as enums from "../enums";

const initialState = {
  frameNo: 1,
  bowlNo: 1,
  activeGame: false,
};

export const turnReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TURN.SET_PLAYER_QUEUE:
      return {
        ...state,
        playerArray: action.payload.playerNames,
        activeGame: true,
        activePlayer: 0,
      };
    case actions.TURN.ADD_EXTRA_TURN:
      return {
        ...state,
        bowlNo: 3,
      }
    case actions.TURN.INCREMENT:
      // Figure out what needs to be done
      const isLastFrame = state.frameNo == enums.FRAME_COUNT ? true : false;
      const isLastPlayer = state.activePlayer == state.playerArray.length - 1;
      const noOfBowlsInFrame = 2;
      const isLastBowl = state.bowlNo == noOfBowlsInFrame;
      const isStrike = action.payload.score == 10;

      // Handle extra turn edge case
      if (state.bowlNo == 3 && isLastPlayer) {
        // End game
        return {
          ...state,
          activeGame: false,
        };
      }
      if (state.bowlNo == 3) {
        return {
          ...state,
          activePlayer: state.activePlayer + 1,
          bowlNo: 1,
        }
      }

      if (isLastFrame && isLastPlayer && isLastBowl) {
        // End Game
        return {
          ...state,
        };
      }
      if (isLastFrame && isStrike) {
        return {
          ...state,
          bowlNo: state.bowlNo += 1
        };
      }
      if (isLastPlayer && isLastBowl) {
        // Go to next frame
        return {
          ...state,
          frameNo: state.frameNo + 1,
          activePlayer: 0,
          bowlNo: 1,
        };
      }
      if (isLastBowl) {
        // Go to next player
        return {
          ...state,
          activePlayer: state.activePlayer + 1,
          bowlNo: 1,
        };
      }
      if (isStrike && isLastPlayer) {
        // Go to next frame
        return {
          ...state,
          frameNo: state.frameNo + 1,
          activePlayer: 0,
          bowlNo: 1,
        }
      }
      if (isStrike) {
        // Go to next player
        return {
          ...state,
          activePlayer: state.activePlayer + 1,
          bowlNo: 1,
        };
      }
      // else just incrememnt bowlNo
      return { ...state, bowlNo: state.bowlNo + 1 };

    default:
      return state;
  }
};

export default turnReducer;
