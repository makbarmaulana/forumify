/**
 * Test scenario for shared action
 *
 * asyncPopulateUsersAndThreads :
 *   - should dispatch action correctly when API request is successful.
 *   - should dispatch action and call alert correctly when API request is fails.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import { getAllThreadsActionCreator } from '../threads/action';
import { getAllUsersActionCreator } from '../users/action';
import asyncPopulateUsersAndThreads from './action';

const fakeUsers = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

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

const fakeError = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when API request is successful.', async () => {
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers);
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreads);

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(getAllUsersActionCreator(fakeUsers));
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(getAllThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when API request is fails', async () => {
    vi.spyOn(api, 'getAllUsers').mockRejectedValue(fakeError);
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(fakeError);

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
