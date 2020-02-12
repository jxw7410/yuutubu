import { RECEIVE_POST, RECEIVE_DELETE_POST, RECEIVE_POSTS, REMOVE_POSTS } from '../../actions/video_post/video_posts_action';
import { merge } from 'lodash';

const videoPostReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_POST:
      return merge({}, state, action.post);
    case RECEIVE_POSTS:
      return merge({}, state, action.response.posts)
    case RECEIVE_DELETE_POST:
      const newState = merge({}, state)
      delete newState[action.post.id];
      return newState;
    case REMOVE_POSTS:
      return {}
    default:
      return state;
  };
}




export default videoPostReducer;