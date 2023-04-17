import { api } from '../../utils/api';

export const ActionTypes = {
  SET_AUTH_USER: 'authUser/setAuthUser',
  REMOVE_AUTH_USER: 'authUser/removeAuthUser',
};

export const setAuthUserActionCreator = (authUser) => ({
  type: ActionTypes.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

export const removeAuthUserActionCreator = () => ({
  type: ActionTypes.REMOVE_AUTH_USER,
});

export const asyncLogin = (loginForm) => async (dispatch) => {
  try {
    const token = await api.login(loginForm);
    api.setAccessToken(token);

    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    // api.removeAccessToken();
    // dispatch(removeAuthUserActionCreator());
    throw new Error(error.message);
  }
};

export const asyncLogOut = () => (dispatch) => {
  dispatch(removeAuthUserActionCreator());
  api.removeAccessToken();
};
