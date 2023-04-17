import { ActionTypes } from './action';

export const authUserReducer = (authUser = null, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_USER:
      return action.payload.authUser;
    case ActionTypes.REMOVE_AUTH_USER:
      return null;
    default:
      return authUser;
  }
};
