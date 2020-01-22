import {
  APP_INTRO_COMPLETED,
  APP_INTRO_SKIPPED
} from './ActionTypes';

export function markIntroAsCompleted() {
  return { type: APP_INTRO_COMPLETED };
}

export function markIntroAsSkipped() {
  return { type: APP_INTRO_SKIPPED };
}
