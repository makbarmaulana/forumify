/**
 * Test scenario for threadDetailReducer
 *
 * ThreadDetail :
 * - should return initial state when given by unknown action
 * - should return threadDetail when given by GET_THREAD_DETAIL action
 *
 * Comments :
 *   - should return threadDetail with new comment when given by ADD_COMMENT action
 *
 * ThreadDetail & Comments :
 *   UP_VOTE action :
 *     - checking threadId must be the same as given by action.payload
 *     - return threadDetail with toggled up vote and down vote must be not toggled
 *   DOWN_VOTE action :
 *      - checking threadId must be the same as given by action.payload
 *      - return threadDetail with toggled down vote and up vote must be not toggled
 *   NEUTRAL_VOTE action :
 *      - checking threadId must be the same as given by action.payload
 *      - return threadDetail with not toggled up/ down vote
 */

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return threadDetail when given by GET_THREAD_DETAIL action', () => {
    const initialState = [];
    const action = {
      type: ActionType.GET_THREAD_DETAIL,
      payload: {
        threadDetail: {
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
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return threadDetail with new comment when given by ADD_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
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

    const newComment = {
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

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [...initialState.comments, action.payload.comment],
    });
  });

  it('should return threadDetail with toggled up vote and down vote must be not toggled', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
      body: 'This is the first thread',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['users-2'],
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

    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });
  });

  it('should return threadDetail with toggled down vote and up vote must be not toggled', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
      body: 'This is the first thread',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
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

    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });
  });

  it('should return threadDetail with not toggled up/ down vote', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
      body: 'This is the first thread',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: ['users-2'],
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

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return comment with toggled up vote and down vote must be not toggled', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
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
          downVotesBy: ['users-2'],
        },
      ],
    };

    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should return comment with toggled down vote and up vote must be not toggled', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
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
          upVotesBy: ['users-2'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it('should return comment with not toggled up/ down vote', () => {
    const initialState = {
      id: 'thread-1',
      title: 'First thread',
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
          upVotesBy: ['users-2'],
          downVotesBy: ['users-2'],
        },
      ],
    };

    const action = {
      type: ActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
