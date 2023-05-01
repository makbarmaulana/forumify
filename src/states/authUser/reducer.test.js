/**
 * Test scenario for authUserReducer
 *
 * - should return initial state when given by unknown action
 * - should return Authed User when given by SET_AUTH_USER action
 * - should return null when given by REMOVE_AUTH_USER action
 */

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return authed User when given by SET_AUTH_USER action', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given by REMOVE_AUTH_USER action', () => {
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.REMOVE_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });
});
