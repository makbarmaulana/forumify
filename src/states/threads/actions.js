import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  GET_ALL_THREADS: 'GET_ALL_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

export const getAllThreadsActionCreator = (threads) => ({
  type: ActionType.GET_ALL_THREADS,
  payload: {
    threads,
  },
});

export const addThreadsActionCreator = (thread) => ({
  type: ActionType.ADD_THREAD,
  payload: {
    thread,
  },
});

export const upVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.UP_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const downVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.DOWN_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const neutralVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.NEUTRAL_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const asyncGetAllThreads = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const threads = await api.getAllThreads();
    dispatch(getAllThreadsActionCreator(threads));
  } catch (error) {
    console.error(error.message);
  }

  dispatch(hideLoading());
};

export const asyncAddThread = ({ title, body, category = '' }) => async (dispatch) => {
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThreadsActionCreator(thread));
  } catch (error) {
    console.error(error.message);
  }
};

export const asyncUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'up-vote';

  dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.voteThread(threadId, voteType);
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'down-vote';

  dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.voteThread(threadId, voteType);
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncNeutralVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'neutral-vote';

  dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.voteThread(threadId, voteType);
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};
