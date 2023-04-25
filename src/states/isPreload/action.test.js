/**
 * Test scenario for isPreload action
 *
 * asyncPreloadProcess thunk :
 *   - should dispatch action correctly when API request is successful.
 *   - should dispatch action and call alert correctly when API request is fails.
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';

const fakeAuthUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeError = new Error('Ups, something went wrong');

describe('isPreload action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncPreloadProcess thunk', () => {
    it('should dispatch action correctly when API request is successful', async () => {
      vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeAuthUser);

      await asyncPreloadProcess()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
      expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when API request is fails', async () => {
      vi.spyOn(api, 'getOwnProfile').mockRejectedValue(fakeError);
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await asyncPreloadProcess()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(fakeError.message);
      expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
