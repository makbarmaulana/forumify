export const ActionType = {
  GET_LEADERBOARDS: 'leaderboards/getLeaderboards',
};

export const getLeaderboardsActionCreator = (leaderboards) => ({
  type: ActionType.GET_LEADERBOARDS,
  payload: {
    leaderboards,
  },
});
