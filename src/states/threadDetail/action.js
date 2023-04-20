import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  GET_THREAD_DETAIL: 'GET_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

export const getThreadDetailActionCreator = (threadDetail) => ({
  type: ActionType.GET_THREAD_DETAIL,
  payload: {
    threadDetail,
  },
});

export const upVoteThreadDetailActionCreator = ({ threadId, userId }) => ({
  type: ActionType.UP_VOTE_THREAD_DETAIL,
  payload: {
    threadId,
    userId,
  },
});

export const downVoteThreadDetailActionCreator = ({ threadId, userId }) => ({
  type: ActionType.DOWN_VOTE_THREAD_DETAIL,
  payload: {
    threadId,
    userId,
  },
});

export const neutralVoteThreadDetailActionCreator = ({ threadId, userId }) => ({
  type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
  payload: {
    threadId,
    userId,
  },
});

export const addCommentActionCreator = (comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    comment,
  },
});

export const upVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.UP_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

export const downVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.DOWN_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

export const neutralVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.NEUTRAL_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

export const asyncGetThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(getThreadDetailActionCreator(threadDetail));
  } catch (error) {
    console.error(error.message);
  }

  dispatch(hideLoading());
};

export const asyncUpVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'up-vote';

  dispatch(upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.voteThread(threadId, voteType);
    dispatch(upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncDownVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'down-vote';

  dispatch(downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.voteThread(threadId, voteType);
    dispatch(downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncNeutralVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'neutral-vote';

  dispatch(neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.voteThread(threadId, voteType);
    dispatch(neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  try {
    const comment = await api.createComment({ threadId, content });
    dispatch(addCommentActionCreator(comment));
  } catch (error) {
    console.error(error.message);
  }
};

export const asyncUpVoteComment = ({ threadId, commentId }) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'up-vote';

  dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

  try {
    await api.voteComment({ threadId, commentId, voteType });
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncDownVoteComment = ({ threadId, commentId }) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'down-vote';

  dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

  try {
    await api.voteComment({ threadId, commentId, voteType });
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};

export const asyncNeutralVoteComment = ({ threadId, commentId }) => async (dispatch, getState) => {
  const { authUser } = getState();
  const voteType = 'neutral-vote';

  dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

  try {
    await api.voteComment({ threadId, commentId, voteType });
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
  } catch (error) {
    alert(error.message);
  }
};
