import { 
  RECEIVE_POST, 
  RECEIVE_DELETE_POST, 
  RECEIVE_POSTS, 
  REMOVE_POSTS, 
  RECEIVE_REPLIES,
  RECEIVE_REPLY,
} from '../../actions/video_post/video_posts_action';
import { merge } from 'lodash';

const videoPostReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  let oldReplies;

  switch (action.type) {
    case RECEIVE_POST:
      return merge({}, state, action.post);
    case RECEIVE_POSTS:
      return merge({}, state, action.posts)
    case RECEIVE_REPLY:
      oldReplies = newState[action.parentId].replies || {};
      newState[action.parentId].replies = merge({}, oldReplies, action.reply);
      return newState;
    case RECEIVE_REPLIES:
      oldReplies = newState[action.parentId].replies || {};
      newState[action.parentId].replies = merge({}, oldReplies, action.replies);
      return newState;
    case RECEIVE_DELETE_POST:
      if (action.parentId) delete newState[action.parentId].replies[action.postId]
      else delete newState[action.postId];
      return newState;
    case REMOVE_POSTS:
      return {}
    default:
      return state;
  };
}




export default videoPostReducer;