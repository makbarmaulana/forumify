import { api } from '../../utils/api';

export const ActionTypes = {
  GET_ALL_USERS: 'users/getAllUsers',
};

export const getAllUsersActionsCreator = (users) => ({
  type: ActionTypes.GET_ALL_USERS,
  payload: {
    users,
  },
});

export const asyncGetAllUsers = () => async (dispatch) => {
  try {
    const users = await api.getAllUsers();
    dispatch(getAllUsersActionsCreator(users));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const asyncRegister = (registerForm) => async () => {
  try {
    await api.register(registerForm);
  } catch (error) {
    throw new Error(error.message);
  }
};
