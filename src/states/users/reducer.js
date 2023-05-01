import { ActionType } from './action';

const usersReducers = (users = [], action = {}) => {
  switch (action.type) {
    case ActionType.GET_ALL_USERS:
      return action.payload.users;
    default:
      return users;
  }
};

export default usersReducers;
