import turnReducer from "./turnReducer";
import * as types from "../actions/types";

const initialState = {
  frameNo: 1,
  bowlNo: 1,
  activeGame: false,
};

describe("turn reducer", () => {
  it("should return the initial state", () => {
    expect(turnReducer(undefined, {})).toEqual(initialState);
  });

  it("should set up player queue", () => {
    expect(
      turnReducer(initialState, {
        type: types.TURN.SET_PLAYER_QUEUE,
        payload: {
          playerNames: ["peter parker", "tony stark"],
        },
      })
    ).toEqual({
      activeGame: true,
      playerArray: ["peter parker", "tony stark"],
      activePlayers: ["peter parker", "tony stark"],
      activePlayer: 0,
      frameNo: 1,
      bowlNo: 1,
    });
  });

  describe("incrementor", () => {
    it("should add extra turn if parameters dictate", () => {
      const initialState = {
        activeGame: true,
        playerArray: ["Andre 3000"],
        activePlayers: ["Andre 3000"],
        activePlayer: 0,
        frameNo: 1,
        bowlNo: 2,
      };
      expect(
        turnReducer(initialState, {
          type: types.TURN.INCREMENT,
          payload: {
            score: 0,
            extraTurn: true,
          },
        })
      ).toEqual({
        activeGame: true,
        playerArray: ["Andre 3000"],
        activePlayers: ["Andre 3000"],
        activePlayer: 0,
        frameNo: 1,
        bowlNo: 3,
      });
    });

    it("should end game if last frame, last player and last bowl", () => {
      const initialState = {
        activeGame: true,
        playerArray: ["peter parker", "tony stark"],
        activePlayers: ["tony stark"],
        activePlayer: 1,
        frameNo: 10,
        bowlNo: 2,
      };
      expect(
        turnReducer(initialState, {
          type: types.TURN.INCREMENT,
          payload: {
            score: 0,
            extraTurn: false,
          },
        })
      ).toEqual({
        activeGame: false,
        playerArray: ["peter parker", "tony stark"],
        activePlayers: [],
        activePlayer: 1,
        frameNo: 10,
        bowlNo: 2,
      });
    });

    it("should increment frame if last player and last bowl", () => {
      const initialState = {
        activeGame: true,
        playerArray: ["tony stark"],
        activePlayers: ["tony stark"],
        activePlayer: 0,
        frameNo: 1,
        bowlNo: 2,
      };
      expect(
        turnReducer(initialState, {
          type: types.TURN.INCREMENT,
          payload: {
            score: 0,
            extraTurn: false,
          },
        })
      ).toEqual({
        activeGame: true,
        playerArray: ["tony stark"],
        activePlayers: ["tony stark"],
        activePlayer: 0,
        frameNo: 2,
        bowlNo: 1,
      });
    });

    it("should increment player if last bowl", () => {
      const initialState = {
        activeGame: true,
        playerArray: ["tom", "dan"],
        activePlayers: ["tom", "dan"],
        activePlayer: 0,
        frameNo: 1,
        bowlNo: 2,
      };
      expect(
        turnReducer(initialState, {
          type: types.TURN.INCREMENT,
          payload: {
            score: 0,
            extraTurn: false,
          },
        })
      ).toEqual({
        activeGame: true,
        playerArray: ["tom", "dan"],
        activePlayers: ["tom", "dan"],
        activePlayer: 1,
        frameNo: 1,
        bowlNo: 1,
      });
    });
  });

  it("should increment bowl if first bowl non-strike", () => {
    const initialState = {
      activeGame: true,
      playerArray: ["mr miyagi"],
      activePlayers: ["mr miyagi"],
      activePlayer: 0,
      frameNo: 1,
      bowlNo: 1,
    };
    expect(
      turnReducer(initialState, {
        type: types.TURN.INCREMENT,
        payload: {
          score: 0,
          extraTurn: false,
        },
      })
    ).toEqual({
      activeGame: true,
      playerArray: ["mr miyagi"],
      activePlayers: ["mr miyagi"],
      activePlayer: 0,
      frameNo: 1,
      bowlNo: 2,
    });
  });

  describe("strike behaviour", () => {
    it("should increment frame if last player gets a strike", () => {
      const initialState = {
        activeGame: true,
        playerArray: ["tom", "dan"],
        activePlayers: ["tom", "dan"],
        activePlayer: 1,
        frameNo: 1,
        bowlNo: 1,
      };
      expect(
        turnReducer(initialState, {
          type: types.TURN.INCREMENT,
          payload: {
            score: 10,
            extraTurn: false,
          },
        })
      ).toEqual({
        activeGame: true,
        playerArray: ["tom", "dan"],
        activePlayers: ["tom", "dan"],
        activePlayer: 0,
        frameNo: 2,
        bowlNo: 1,
      });
    });

    it("should increment player if strike", () => {
      const initialState = {
        activeGame: true,
        playerArray: ["tom", "dan"],
        activePlayers: ["tom", "dan"],
        activePlayer: 0,
        frameNo: 1,
        bowlNo: 1,
      };
      expect(
        turnReducer(initialState, {
          type: types.TURN.INCREMENT,
          payload: {
            score: 10,
            extraTurn: false,
          },
        })
      ).toEqual({
        activeGame: true,
        playerArray: ["tom", "dan"],
        activePlayers: ["tom", "dan"],
        activePlayer: 1,
        frameNo: 1,
        bowlNo: 1,
      });
    });
  });
});
