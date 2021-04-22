import * as actions from "./actions";
import * as types from "./types";

describe("actions", () => {
  describe("alerts", () => {
    it("should create an action to add an alert", () => {
      const expectedAction = {
        type: types.ALERT.UPDATE,
        payload: {
          title: "test_title",
          variant: "test_variant",
          message: "test_message",
        },
      };
      expect(
        actions.setAlert("test_title", "test_variant", "test_message")
      ).toEqual(expectedAction);
    });
  });
  describe("turn", () => {
    it("should create an action to increment turn and extraTurn defaults to false", () => {
      const expectedAction = {
        type: types.TURN.INCREMENT,
        payload: {
          score: 100,
          extraTurn: false,
        },
      };
      expect(actions.incrementTurn(100)).toEqual(expectedAction);
    });
  });
});
