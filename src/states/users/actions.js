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
  try {
    const users = await api.getAllUsers();
    dispatch(getAllUsersActionCreator(users));
  } catch (error) {
    console.error(error.message);
  }
};

export const asyncRegister = ({ name, email, password }) => async () => {
  try {
    await api.register({ name, email, password });
  } catch (error) {
    console.error(error.message);
  }
};
