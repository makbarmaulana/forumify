/**
 * Test scenario for authUser action
 *
 * asyncLogin thunk :
 *   - should dispatch action correctly when API request is successful.
 *   - should dispatch action and call alert correctly when API request is fails.
 *
 * asyncLogOut thunk :
 *   - should dispatch action correctly.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import {
  asyncLogin,
  asyncLogOut,
  removeAuthUserActionCreator,
  setAuthUserActionCreator,
} from './action';

const token = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

const fakeCredentials = {
  email: 'john@example.com',
  password: 'jhondoe',
};

const fakeAuthUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeError = new Error('Ups, something went wrong');

describe('authUser action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncLogin thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      vi.spyOn(api, 'login').mockResolvedValue(token);
      vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeAuthUser);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      const setAccessTokenSpy = vi.spyOn(api, 'setAccessToken').mockImplementation(() => {});

      await asyncLogin(fakeCredentials)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith(fakeCredentials);
      expect(setAccessTokenSpy).toHaveBeenCalledWith(token);
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
      expect(alertSpy).toHaveBeenCalledWith(`Welcome back "${fakeAuthUser.name}"!`);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      vi.spyOn(api, 'login').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncLogin(fakeCredentials)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith(fakeCredentials);
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncLogOut thunk', () => {
    it('should dispatch action correctly', () => {
      const removeAccessTokenSpy = vi.spyOn(api, 'removeAccessToken').mockImplementation(() => {});

      asyncLogOut()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(removeAuthUserActionCreator());
      expect(removeAccessTokenSpy).toHaveBeenCalled();
    });
  });
});
