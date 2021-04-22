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
        activePlayers: action.payload.playerNames,
        activeGame: true,
        activePlayer: 0,
      };
    case actions.TURN.INCREMENT:
      const currentPlayerName = state.playerArray[state.activePlayer];
      // If player finished go straight to the next player
      if (!state.activePlayers.includes(currentPlayerName)) {
        return {
          ...state,
          activePlayer: state.activePlayer + 1,
          bowlNo: 1,
        };
      }

      const isLastFrame = state.frameNo == enums.FRAME_COUNT ? true : false;
      const isLastPlayer = state.activePlayer >= state.playerArray.length - 1;
      const isLastBowl = state.bowlNo >= 2;
      const isStrike = action.payload.score == 10;

      if (action.payload.extraTurn) {
        // Handle extra turn
        return {
          ...state,
          bowlNo: (state.bowlNo += 1),
        };
      }
      if (isLastFrame && isLastPlayer && isLastBowl) {
        return {
          ...state,
          activePlayers: state.activePlayers.filter(player => player != currentPlayerName),
          activeGame: false,
        };
      }
      if (isLastFrame && isLastBowl) {
        return {
          ...state,
          activePlayers: state.activePlayers.filter(player => player != currentPlayerName),
          activePlayer: (state.activePlayer += 1),
          bowlNo: state.bowlNo = 1
        };
      }
      if (isLastFrame && isStrike) {
        return {
          ...state,
          bowlNo: (state.bowlNo += 1),
        };
      }
      if (isLastPlayer && isLastBowl) {
        return {
          ...state,
          frameNo: state.frameNo + 1,
          activePlayer: 0,
          bowlNo: 1,
        };
      }
      if (isLastBowl) {
        return {
          ...state,
          activePlayer: state.activePlayer + 1,
          bowlNo: 1,
        };
      }
      if (isStrike && isLastPlayer) {
        return {
          ...state,
          frameNo: state.frameNo + 1,
          activePlayer: 0,
          bowlNo: 1,
        };
      }
      if (isStrike) {
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
