import { api } from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

export const ActionTypes = {
  SET_IS_PRELOAD: 'authUser/setIsPreload',
};

export const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionTypes.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

export const asyncPreloadProcess = () => async (dispatch) => {
  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    throw new Error(error.message);
  } finally {
    dispatch(setIsPreloadActionCreator(false));
  }
};
