import * as actions from "../actions/types";

const initialState = {
  active: false,
  title: undefined,
  variant: undefined,
  message: undefined,
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ALERT.UPDATE:
      return {
        active: true,
        title: action.payload.title,
        variant: action.payload.variant,
        message: action.payload.message,
      };
    case actions.ALERT.REMOVE:
      return { active: false };
    default:
      return state;
  }
};

export default alertReducer;
