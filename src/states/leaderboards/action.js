import { hideLoading, showLoading } from 'react-redux-loading-bar';
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
  dispatch(showLoading());

  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(getLeaderboardsActionCreator(leaderboards));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};
