import scoreReducer from "./scoreReducer";
import rootReducer from "./index";
import * as types from "../actions/types";

const initialState = {
  currentUser: null,
  frames: {},
  finalScores: {},
};

describe("score reducer", () => {
  it("should return the initial state", () => {
    expect(scoreReducer(undefined, {})).toEqual({
      currentUser: null,
      frames: {},
      finalScores: {},
    });
  });

  it("should set up players score objects", () => {
    expect(
      scoreReducer(initialState, {
        type: types.SCORE.INIT,
        payload: { playerNames: ["player1", "player2"] },
      })
    ).toEqual({
      currentUser: "player1",
      frames: {
        player1: {
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
        },
        player2: {
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
        },
      },
      finalScores: {},
    });
  });

  it("should be able to push a score", () => {
    expect(
      scoreReducer(
        {
          frames: {
            player1: {
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
            },
          },
        },
        {
          type: types.SCORE.PUSH,
          payload: {
            score: 2,
            player: "player1",
            frame: 1,
            bowl: 1,
          },
        }
      )
    ).toEqual({
      frames: {
        player1: {
          1: { 1: 2, 2: undefined },
          2: { 1: undefined, 2: undefined },
          3: { 1: undefined, 2: undefined },
          4: { 1: undefined, 2: undefined },
          5: { 1: undefined, 2: undefined },
          6: { 1: undefined, 2: undefined },
          7: { 1: undefined, 2: undefined },
          8: { 1: undefined, 2: undefined },
          9: { 1: undefined, 2: undefined },
          10: { 1: undefined, 2: undefined },
        },
      },
    });
  });

  it("should push a null for bowl 2 if strike", () => {
    expect(
      scoreReducer(
        {
          frames: {
            player1: {
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
            },
          },
        },
        {
          type: types.SCORE.PUSH,
          payload: {
            score: 2,
            player: "player1",
            frame: 1,
            bowl: 1,
          },
        }
      )
    ).toEqual({
      frames: {
        player1: {
          1: { 1: 2, 2: undefined },
          2: { 1: undefined, 2: undefined },
          3: { 1: undefined, 2: undefined },
          4: { 1: undefined, 2: undefined },
          5: { 1: undefined, 2: undefined },
          6: { 1: undefined, 2: undefined },
          7: { 1: undefined, 2: undefined },
          8: { 1: undefined, 2: undefined },
          9: { 1: undefined, 2: undefined },
          10: { 1: undefined, 2: undefined },
        },
      },
    });
  });
});
