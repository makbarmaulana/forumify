import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { getAllUsersActionCreator } from '../users/action';
import { getAllThreadsActionCreator } from '../threads/action';

const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await api.getAllUsers();
    dispatch(getAllUsersActionCreator(users));

    const threads = await api.getAllThreads();
    dispatch(getAllThreadsActionCreator(threads));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export default asyncPopulateUsersAndThreads;
