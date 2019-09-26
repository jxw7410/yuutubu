import { RECEIVE_POST, RECEIVE_SOME_POSTS, RECEIVE_DELETE_POST, RECEIVE_POSTS } from '../../actions/video_post/video_posts_action';
import { merge } from 'lodash';

const videoPostReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_POST:
      //
      return merge({}, state, action.post);
    case RECEIVE_SOME_POSTS:
      //
      return merge({}, state, action.response.posts)
    case RECEIVE_POSTS:
      return action.response.posts || {};
    case RECEIVE_DELETE_POST:
      const newState = merge({}, state)
      delete newState[action.post.id];
      return newState;
    default:
      return state;
  };
}




export default videoPostReducer;