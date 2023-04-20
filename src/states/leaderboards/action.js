import api from '../../utils/api';

export const ActionType = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

export const getLeaderboardsActionCreator = (leaderboards) => ({
  type: ActionType.GET_LEADERBOARDS,
  payload: {
    leaderboards,
  },
});

export const asyncGetLeaderboards = () => async (dispatch) => {
  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(getLeaderboardsActionCreator(leaderboards));
  } catch (error) {
    console.error(error.message);
  }
};
