import { ActionTypes } from './actions';

export const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_THREADS:
      return action.payload.threads;
    case ActionTypes.ADD_THREAD:
      return threads.concat(action.payload.thread);
    case ActionTypes.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy
              : thread.upVotesBy.concat(action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    case ActionTypes.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy
              : thread.downVotesBy.concat(action.payload.userId),
          };
        }
        return thread;
      });
    case ActionTypes.CLEAR_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
};
