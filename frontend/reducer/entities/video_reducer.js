import { RECEIVE_VIDEO, RECEIVE_CHANNEL_VIDEOS, CLEAR_CHANNEL_VIDEOS } from '../../actions/video/video_action';
import { REQUEST_SET_VIDEO } from '../../actions/video_player/video_player_action';
import { RECEIVE_SEARCH_VIDEOS } from '../../actions/search/search_action';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      return merge({}, state, { [action.video.id]: action.video });
    case REQUEST_SET_VIDEO:
      return merge({}, state, { [action.video.id]: action.video });
    case RECEIVE_CHANNEL_VIDEOS:
      return merge({}, state, action.videos);
    case RECEIVE_SEARCH_VIDEOS:
      return merge({}, state, action.videos);
    case CLEAR_CHANNEL_VIDEOS:
      return {}
    default:
      return state;
  }
}

export default videosReducer


/*



*/