/**
 * Test scenario for isPreloadReducer
 *
 * - should return initial state when given by unknown action
 * - should return true when given by SET_IS_PRELOAD action
 */

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    const initialState = false;
    const action = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return true when given by SET_IS_PRELOAD action', () => {
    const initialState = false;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: true },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
