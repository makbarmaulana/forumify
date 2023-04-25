/**
 * Test scenario for users action
 *
 * asyncGetAllUsers thunk,
 * asyncRegister thunk  :
 *   - should dispatch action correctly when API request is successful.
 *   - should dispatch action and call alert correctly when API request is fails.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import {
  asyncGetAllUsers, asyncRegister, getAllUsersActionCreator,
} from './action';

const fakeUsers = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeCredentials = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: 'janedoe',
};

const fakeError = new Error('Ups, something went wrong');

describe('users action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncGetAllUsers thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers);

      await asyncGetAllUsers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(getAllUsersActionCreator(fakeUsers));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      vi.spyOn(api, 'getAllUsers').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncGetAllUsers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllUsers).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  it('should dispatch action correctly when API request is successful', async () => {
    vi.spyOn(api, 'register').mockRejectedValue(fakeError);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncRegister(fakeCredentials)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalledWith(fakeCredentials);
    expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when API request is fails', async () => {
    vi.spyOn(api, 'register').mockRejectedValue(fakeError);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncRegister(fakeCredentials)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
