/**
 * Test scenario for threadsReducer
 *
 * - should return initial state when given by unknown action
 * - should return the threads when given by GET_ALL_THREADS action
 * - should return the threads with new threads when given by ADD_THREAD action
 *
 * UP_VOTE action :
 *   - should checking threadId must be the same as given by action.payload
 *   - should return the threads with toggled up vote and down vote must be not toggled
 * DOWN_VOTE action :
 *   - should checking threadId must be the same as given by action.payload
 *   - should return the threads with toggled down vote and up vote must be not toggled
 * NEUTRAL_VOTE action :
 *   - should checking threadId must be the same as given by action.payload
 *   - should return the threads with not toggled up/ down vote
 */

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by GET_ALL_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.GET_ALL_THREADS,
      payload: {
        threads: [
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
          {
            id: 'thread-2',
            title: 'Second Thread',
            body: 'This is the second thread',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with new threads when given by ADD_THREAD action', () => {
    const initialState = [
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

    const newThread = {
      id: 'thread-2',
      title: 'Second Thread',
      body: 'This is the second thread',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with toggled up vote and down vote must be not toggled', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it('should return the threads with toggled down vote and up vote must be not toggled', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with not toggled up/ down vote', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
