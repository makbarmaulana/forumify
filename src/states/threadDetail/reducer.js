import { ActionTypes } from './action';

export const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
    case ActionTypes.GET_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionTypes.UP_VOTE_THREAD_DETAIL:
      if (threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
            ? threadDetail.upVotesBy
            : threadDetail.upVotesBy.concat(action.payload.userId),
          downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return threadDetail;
    case ActionTypes.DOWN_VOTE_THREAD_DETAIL:
      if (threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
            ? threadDetail.downVotesBy
            : threadDetail.downVotesBy.concat(action.payload.userId),
        };
      }
      return threadDetail;
    case ActionTypes.CLEAR_VOTE_THREAD_DETAIL:
      if (threadDetail.id === action.payload.threadId) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return threadDetail;
    case ActionTypes.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.concat(action.payload.comment),
      };
    case ActionTypes.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy
                : comment.upVotesBy.concat(action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return comment;
        }),
      };
    case ActionTypes.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy
                : comment.downVotesBy.concat(action.payload.userId),
            };
          }
          return comment;
        }),
      };
    case ActionTypes.CLEAR_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => ({
          ...comment,
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
        })),
      };
    default:
      return threadDetail;
  }
};
