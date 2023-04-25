/**
 * Test scenario for leaderboards action
 *
 * asyncGetLeaderboards thunk :
 *   - should dispatch action correctly when API request is successful.
 *   - should dispatch action and call alert correctly when API request is fails.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import { asyncGetLeaderboards, getLeaderboardsActionCreator } from './action';

const fakeLeaderboards = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeError = new Error('Ups, something went wrong');

describe('Leaderboards action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncGetLeaderboards thunk', () => {
    it('should dispatch action correctly when API request is successful.', async () => {
      vi.spyOn(api, 'getLeaderboards').mockResolvedValue(fakeLeaderboards);

      await asyncGetLeaderboards()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getLeaderboards).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(getLeaderboardsActionCreator(fakeLeaderboards));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  it('should dispatch action and call alert correctly when API request is fails', async () => {
    vi.spyOn(api, 'getLeaderboards').mockRejectedValue(fakeError);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getLeaderboards).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
