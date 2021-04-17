import * as actions from "../actions/types";

const initialState = {
  active: false,
  title: undefined,
  colour: undefined,
  message: undefined,
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ALERT.UPDATE:
      return {
        active: true,
        title: action.payload.title,
        message: action.payload.message,
      };
    case actions.ALERT.REMOVE:
      return Object.assign({}, state, {active: false})
    default:
      return state;
  }
};

export default alertReducer;