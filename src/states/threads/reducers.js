import { ActionType } from './actions';

const threadsReducer = (threads = [], action = {}) => {
  const { userId = null, threadId = null } = action.payload ?? {};
  const isCurrentThread = threads?.find((thread) => thread.id === threadId);
  const isUpVoted = isCurrentThread?.upVotesBy.includes(userId);
  const isDownVoted = isCurrentThread?.downVotesBy.includes(userId);

  switch (action.type) {
    case ActionType.GET_ALL_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        // if not voted, add userId to array upVotesBy & delete userId from downVotesBy
        if (thread.id === threadId && !isUpVoted) {
          return {
            ...thread,
            upVotesBy: [userId, ...thread.upVotesBy],
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        // if not voted, add userId to array downVotesBy & delete userId from upVotesBy
        if (thread.id === threadId && !isDownVoted) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
            downVotesBy: [userId, ...thread.downVotesBy],
          };
        }
        return thread;
      });
    case ActionType.NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        // delete userId from upVotesBy or downVotesBy
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: isUpVoted
              ? thread.upVotesBy.filter((id) => id !== userId)
              : thread.upVotesBy,
            downVotesBy: isDownVoted
              ? thread.downVotesBy.filter((id) => id !== userId)
              : thread.downVotesBy,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
};

export default threadsReducer;
