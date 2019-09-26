import { RECEIVE_POST, RECEIVE_SOME_POSTS, RECEIVE_POSTS, RECEIVE_DELETE_POST } from '../../actions/video_post/video_posts_action';



const scrollingPaginationOffsetReducer = (state = 0, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POST:
      return state + 1;
    case RECEIVE_DELETE_POST:
      return state - 1;
    case RECEIVE_POSTS:
      return action.response.offset
    case RECEIVE_SOME_POSTS:
      return state + action.response.offset;
    default:
      return state
  }
}


export default scrollingPaginationOffsetReducer;