import { ActionType } from './action';

export const leaderboardsReducer = (leaderboards = null, action = {}) => {
  switch (action.type) {
    case ActionType.GET_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
};
