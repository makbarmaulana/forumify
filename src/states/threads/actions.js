import { api } from '../../utils/api';

export const ActionTypes = {
  GET_ALL_THREADS: 'threads/getAllThreads',
  ADD_THREAD: 'threads/addThread',
  UP_VOTE_THREAD: 'threads/upVote',
  DOWN_VOTE_THREAD: 'threads/downVote',
  CLEAR_VOTE_THREAD: 'threads/clearVote',
};

export const getAllThreadsActionsCreator = (threads) => ({
  type: ActionTypes.GET_ALL_THREADS,
  payload: {
    threads,
  },
});

export const addThreadsActionsCreator = (thread) => ({
  type: ActionTypes.ADD_THREAD,
  payload: {
    thread,
  },
});

export const upVoteThreadActionsCreator = ({ threadId, userId }) => ({
  type: ActionTypes.UP_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const downVoteThreadActionsCreator = ({ threadId, userId }) => ({
  type: ActionTypes.DOWN_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const clearVoteThreadActionsCreator = ({ threadId, userId }) => ({
  type: ActionTypes.CLEAR_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const asyncGetAllThreads = () => async (dispatch) => {
  try {
    const threads = await api.getAllThreads();
    dispatch(getAllThreadsActionsCreator(threads));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThreadsActionsCreator(thread));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const asyncUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const prevState = { threadId, userId: authUser.id };

  dispatch(upVoteThreadActionsCreator({ threadId, userId: authUser.id }));

  try {
    await api.upVoteThread(threadId);
    dispatch(upVoteThreadActionsCreator(prevState));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const asyncDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const prevState = { threadId, userId: authUser.id };

  dispatch(downVoteThreadActionsCreator({ threadId, userId: authUser.id }));

  try {
    await api.downVoteThread(threadId);
    dispatch(downVoteThreadActionsCreator(prevState));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const asyncClearVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const prevState = { threadId, userId: authUser.id };

  dispatch(clearVoteThreadActionsCreator({ threadId, userId: authUser.id }));

  try {
    await api.clearVoteThread(threadId);
    dispatch(clearVoteThreadActionsCreator(prevState));
  } catch (error) {
    throw new Error(error.message);
  }
};
