/**
 * Test scenario for threadDetail action
 *
 * asyncGetThreadDetail thunk :
 *   - should Get Thread Detail correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncUpVoteThreadDetail thunk :
 *   - should Up Vote Thread Detail correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncDownVoteThreadDetail thunk :
 *   - should Down Vote Thread Detail correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncNeutralVoteThreadDetail thunk :
 *   - should Neutral Vote Thread Detail correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncAddComment thunk :
 *   - should Add Comment correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncUpVoteComment thunk :
 *   - should Up Vote Comment correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncDownVoteComment thunk :
 *   - should Down Vote Comment correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 * asyncNeutralVoteComment thunk :
 *   - should Neutral Vote Comment correctly when API request is successful.
 *   - should call alert correctly when API request is fails.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import {
  addCommentActionCreator,
  asyncAddComment,
  asyncDownVoteComment,
  asyncDownVoteThreadDetail,
  asyncGetThreadDetail,
  asyncNeutralVoteComment,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
  downVoteCommentActionCreator,
  downVoteThreadDetailActionCreator,
  getThreadDetailActionCreator,
  neutralVoteCommentActionCreator,
  neutralVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  upVoteThreadDetailActionCreator,
} from './action';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'First Thread',
  body: 'This is the first thread',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'This is the first comment',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const fakeNewComment = {
  id: 'comment-2',
  content: 'This is the second comment',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeError = new Error('Ups, something went wrong');

describe('threadDetail action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncGetThreadDetail thunk', () => {
    it('should Get Thread Detail correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      vi.spyOn(api, 'getThreadDetail').mockResolvedValue(fakeThreadDetail);

      await asyncGetThreadDetail(threadId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);
      expect(dispatch).toHaveBeenCalledWith(getThreadDetailActionCreator(fakeThreadDetail));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should call alert correctly when API request is fails', async () => {
      vi.spyOn(api, 'getThreadDetail').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncGetThreadDetail()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getThreadDetail).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncUpVoteThreadDetail thunk', () => {
    it('should Up Vote Thread Detail correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'up-vote';

      vi.spyOn(api, 'voteThread').mockResolvedValueOnce();

      await asyncUpVoteThreadDetail(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'up-vote';

      vi.spyOn(api, 'voteThread').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncUpVoteThreadDetail(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncDownVoteThreadDetail thunk', () => {
    it('should Down Vote Thread Detail correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'down-vote';

      vi.spyOn(api, 'voteThread').mockResolvedValueOnce();

      await asyncDownVoteThreadDetail(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'down-vote';

      vi.spyOn(api, 'voteThread').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncDownVoteThreadDetail(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncNeutralVoteThreadDetail thunk', () => {
    it('should Neutral Vote Thread Detail correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'neutral-vote';

      vi.spyOn(api, 'voteThread').mockResolvedValueOnce();

      await asyncNeutralVoteThreadDetail(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'neutral-vote';

      vi.spyOn(api, 'voteThread').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncNeutralVoteThreadDetail(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncAddComment thunk', () => {
    it('should Add Comment correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const content = fakeNewComment;

      vi.spyOn(api, 'createComment').mockResolvedValue(fakeNewComment);

      await asyncAddComment({ threadId, content })(dispatch);

      expect(api.createComment).toHaveBeenCalledWith({ threadId, content });
      expect(dispatch).toHaveBeenCalled(addCommentActionCreator(content));
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const content = fakeNewComment;

      vi.spyOn(api, 'createComment').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncAddComment({ threadId, content })(dispatch);

      expect(api.createComment).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncUpVoteComment thunk', () => {
    it('should Up Vote Comment correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'up-vote';

      vi.spyOn(api, 'voteComment').mockResolvedValueOnce();

      await asyncUpVoteComment({ threadId, commentId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
      expect(api.voteComment).toHaveBeenCalledWith({ threadId, commentId, voteType });
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'up-vote';

      vi.spyOn(api, 'voteComment').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncUpVoteComment({ threadId, commentId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
      expect(api.voteComment).toHaveBeenCalledWith({ threadId, commentId, voteType });
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncDownVoteComment thunk', () => {
    it('should Down Vote Comment correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'down-vote';

      vi.spyOn(api, 'voteComment').mockResolvedValueOnce();

      await asyncDownVoteComment({ threadId, commentId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        downVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
      expect(api.voteComment).toHaveBeenCalledWith({ threadId, commentId, voteType });
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'down-vote';

      vi.spyOn(api, 'voteComment').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncDownVoteComment({ threadId, commentId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        downVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
      expect(api.voteComment).toHaveBeenCalledWith({ threadId, commentId, voteType });
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncNeutralVoteComment thunk', () => {
    it('should Neutral Vote Comment correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'neutral-vote';

      vi.spyOn(api, 'voteComment').mockResolvedValueOnce();

      await asyncNeutralVoteComment({ threadId, commentId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
      expect(api.voteComment).toHaveBeenCalledWith({ threadId, commentId, voteType });
    });

    it('should call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'neutral-vote';

      vi.spyOn(api, 'voteComment').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncNeutralVoteComment({ threadId, commentId })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
      expect(api.voteComment).toHaveBeenCalledWith({ threadId, commentId, voteType });
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });
});
