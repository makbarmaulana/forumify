import { ActionTypes } from './action';

export const isPreloadReducer = (isPreload = [], action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
};
