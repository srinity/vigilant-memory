import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
  skipped: false,
  completed: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.APP_INTRO_COMPLETED:
      return { ...state, completed: true };
    case ActionTypes.APP_INTRO_SKIPPED:
      return { ...state, skipped: true };
    default:
      return state;
  }
}
