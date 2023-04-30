/**
 * Test scenario for threads action
 *
 * asyncGetAllThreads thunk,
 * asyncAddThread thunk,
 * asyncUpVoteThread thunk,
 * asyncDownVoteThread thunk,
 * asyncNeutralVoteThread thunk  :
 *   - should dispatch action correctly when API request is successful.
 *   - should dispatch action and call alert correctly when API request is fails.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import {
  addThreadActionCreator,
  asyncAddThread,
  asyncDownVoteThread,
  asyncGetAllThreads,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
  downVoteThreadActionCreator,
  getAllThreadsActionCreator,
  neutralVoteThreadActionCreator,
  upVoteThreadActionCreator,
} from './action';

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'First Thread',
    body: 'This is the first thread',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeNewThread = {
  title: 'Second Thread',
  body: 'This is the second thread',
  category: 'General',
};

const fakeError = new Error('Ups, something went wrong');

describe('threads action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncGetAllThreads thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreads);

      await asyncGetAllThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllThreads).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(getAllThreadsActionCreator(fakeThreads));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      vi.spyOn(api, 'getAllThreads').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncGetAllThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllThreads).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncAddThread thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      vi.spyOn(api, 'createThread').mockResolvedValue(fakeThreads);

      await asyncAddThread(fakeNewThread)(dispatch);

      expect(api.createThread).toHaveBeenCalledWith(fakeNewThread);
      expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreads));
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      vi.spyOn(api, 'createThread').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncAddThread(fakeNewThread)(dispatch);

      expect(api.createThread).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncUpVoteThread thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'up-vote';

      vi.spyOn(api, 'voteThread').mockResolvedValueOnce();

      await asyncUpVoteThread(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'up-vote';

      vi.spyOn(api, 'voteThread').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncUpVoteThread(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        upVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncDownVoteThread thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'down-vote';

      vi.spyOn(api, 'voteThread').mockResolvedValueOnce();

      await asyncDownVoteThread(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        downVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'down-vote';

      vi.spyOn(api, 'voteThread').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncDownVoteThread(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        downVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncNeutralVoteThread thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'neutral-vote';

      vi.spyOn(api, 'voteThread').mockResolvedValueOnce();

      await asyncNeutralVoteThread(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      const threadId = 'thread-1';
      const authUser = { id: 'users-1' };
      const getState = () => ({ authUser });
      const voteType = 'neutral-vote';

      vi.spyOn(api, 'voteThread').mockRejectedValueOnce(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncNeutralVoteThread(threadId)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
      expect(api.voteThread).toHaveBeenCalledWith(threadId, voteType);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    });
  });
});
