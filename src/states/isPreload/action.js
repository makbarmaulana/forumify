import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

export const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(setIsPreloadActionCreator(false));
  }

  dispatch(hideLoading());
};
