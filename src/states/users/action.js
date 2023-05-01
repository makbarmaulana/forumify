import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  GET_ALL_USERS: 'GET_ALL_USERS',
};

export const getAllUsersActionCreator = (users) => ({
  type: ActionType.GET_ALL_USERS,
  payload: {
    users,
  },
});

export const asyncGetAllUsers = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await api.getAllUsers();
    dispatch(getAllUsersActionCreator(users));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

export const asyncRegister = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    await api.register({ name, email, password });
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};
