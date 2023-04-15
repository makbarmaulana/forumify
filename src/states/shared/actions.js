import { api } from '../../utils/api';
import { getAllUsersActionsCreator } from '../users/actions';
import { getAllThreadsActionsCreator } from '../threads/actions';
import { getLeaderboardsActionCreator } from '../leaderboards/action';

export const asyncPopulateStates = () => async (dispatch) => {
  try {
    const users = await api.getAllUsers();
    dispatch(getAllUsersActionsCreator(users));

    const threads = await api.getAllThreads();
    dispatch(getAllThreadsActionsCreator(threads));

    const leaderboards = await api.getLeaderboards();
    dispatch(getLeaderboardsActionCreator(leaderboards));
  } catch (error) {
    throw new Error(error.message);
  }
};
