import api from '../../utils/api';
import { getAllUsersActionCreator } from '../users/actions';
import { getAllThreadsActionCreator } from '../threads/actions';

const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  try {
    const users = await api.getAllUsers();
    dispatch(getAllUsersActionCreator(users));

    const threads = await api.getAllThreads();
    dispatch(getAllThreadsActionCreator(threads));
  } catch (error) {
    throw new Error(error.message);
  }
};

export default asyncPopulateUsersAndThreads;
