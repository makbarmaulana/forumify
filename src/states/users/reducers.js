import { ActionTypes } from './actions';

export const usersReducers = (users = [], action = {}) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_USERS:
      return action.payload.users;
    default:
      return users;
  }
};
