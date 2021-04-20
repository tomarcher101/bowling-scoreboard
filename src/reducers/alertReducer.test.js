import alertReducer from "./alertReducer";
import * as types from "../actions/types";

describe("alert reducer", () => {
  it("should return the initial state", () => {
    expect(alertReducer(undefined, {})).toEqual({
      active: false,
      title: undefined,
      variant: undefined,
      message: undefined,
    });
  });

  it("should handle UPDATE", () => {
    expect(
      alertReducer([], {
        type: types.ALERT.UPDATE,
        payload: {
          title: "test_title",
          variant: "test_variant",
          message: "test_message",
        },
      })
    ).toEqual({
      active: true,
      title: "test_title",
      variant: "test_variant",
      message: "test_message",
    });
  });
  it("should handle REMOVE", () => {
    expect(
      alertReducer(
        {
          active: true,
          title: "test_title",
          variant: "test_variant",
          message: "test_message",
        },
        {
          type: types.ALERT.REMOVE,
        }
      )
    ).toEqual({
      active: false,
    });
  });
});
