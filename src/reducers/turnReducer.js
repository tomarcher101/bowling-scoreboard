import * as actions from "../actions/types";
import * as enums from "../enums";

const initialState = {
  frameNo: 0,
  bowlNo: 0,
  playerQueue: [],
  activeGame: false,
};

export const turnReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.TURN.SET_PLAYER_QUEUE:
      return { ...state, playerQueue: action.payload.playerNames  };
    case actions.TURN.INCREMENT:
    // const newTurn = {
    //   frameNo: state.frameNo,
    //   activePlayer: state.activePlayer,
    //   bowlNo: state.bowlNo,
    //   noOfPlayers: state.noOfPlayers,
    //   gameOver: false,
    // };
    // const isLastFrame = state.frameNo == enums.FRAME_COUNT ? true : false;
    // const isLastPlayer = state.activePlayer == state.noOfPlayers - 1;
    // const noOfBowlsInFrame = isLastFrame ? 3 : 2;
    // const isLastBowl = state.bowlNo == noOfBowlsInFrame;
    // if (isLastFrame && isLastPlayer && isLastBowl) {
    //   return {
    //     gameOver: true,
    //   };
    // }
    // if (isLastPlayer && isLastBowl) {
    //   // Go to next frame
    //   newTurn.frameNo += 1;
    //   newTurn.activePlayer = 0;
    //   newTurn.bowlNo = 1;
    //   return newTurn;
    // }
    // if (isLastBowl) {
    //   // Go to next player
    //   newTurn.activePlayer += 1;
    //   newTurn.bowlNo = 1;
    //   return newTurn;
    // }
    // // else just incrememnt bowlNo
    // newTurn.bowlNo += 1;
    // return newTurn;
    default:
      return state;
  }
};

export default turnReducer;
