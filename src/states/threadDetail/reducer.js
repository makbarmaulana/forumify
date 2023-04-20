import { ActionType } from './action';

const threadDetailReducer = (threadDetail = null, action = {}) => {
  const { threadId = null, commentId = null, userId = null } = action.payload ?? {};
  const isThreadUpVoted = threadDetail?.upVotesBy.includes(userId);
  const isThreadDownVoted = threadDetail?.downVotesBy.includes(userId);
  const isCurrentComment = threadDetail?.comments.find((comment) => comment.id === commentId);
  const isCommentUpVoted = isCurrentComment?.upVotesBy.includes(userId);
  const isCommentDownVoted = isCurrentComment?.downVotesBy.includes(userId);

  switch (action.type) {
    case ActionType.GET_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.UP_VOTE_THREAD_DETAIL:
      // if not voted, add userId to array upVotesBy & delete userId from downVotesBy
      if (threadDetail.id === threadId && !isThreadUpVoted) {
        return {
          ...threadDetail,
          upVotesBy: [userId, ...threadDetail.upVotesBy],
          downVotesBy: threadDetail.downVotesBy.filter((id) => id !== userId),
        };
      }
      return threadDetail;
    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      // if not voted, add userId to array downVotesBy & delete userId from upVotesBy
      if (threadDetail.id === threadId && !isThreadDownVoted) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter((id) => id !== userId),
          downVotesBy: [userId, ...threadDetail.downVotesBy],
        };
      }
      return threadDetail;
    case ActionType.NEUTRAL_VOTE_THREAD_DETAIL:
      // delete userId from upVotesBy or downVotesBy
      if (threadDetail.id === threadId) {
        return {
          ...threadDetail,
          upVotesBy: isThreadUpVoted
            ? threadDetail.upVotesBy.filter((id) => id !== userId)
            : threadDetail.upVotesBy,
          downVotesBy: isThreadDownVoted
            ? threadDetail.downVotesBy.filter((id) => id !== userId)
            : threadDetail.downVotesBy,
        };
      }
      return threadDetail;
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === commentId && !isCommentUpVoted) {
            return {
              ...comment,
              upVotesBy: [userId, ...comment.upVotesBy],
              downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === commentId && !isCommentDownVoted) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
              downVotesBy: [userId, ...comment.downVotesBy],
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRAL_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy: isCommentUpVoted
                ? comment.upVotesBy.filter((id) => id !== userId)
                : comment.upVotesBy,
              downVotesBy: isCommentDownVoted
                ? comment.downVotesBy.filter((id) => id !== userId)
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
};

export default threadDetailReducer;
