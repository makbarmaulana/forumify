import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  REMOVE_AUTH_USER: 'REMOVE_AUTH_USER',
};

export const setAuthUserActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

export const removeAuthUserActionCreator = () => ({
  type: ActionType.REMOVE_AUTH_USER,
});

export const asyncLogin = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const token = await api.login({ email, password });
    api.setAccessToken(token);

    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));

    alert(`Welcome back "${authUser.name}"!`);
  } catch (error) {
    console.error(error.message);
  }

  dispatch(hideLoading());
};

export const asyncLogOut = () => (dispatch) => {
  dispatch(removeAuthUserActionCreator());
  api.removeAccessToken();
};
