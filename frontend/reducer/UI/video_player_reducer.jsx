import {
  REMOVE_VIDEO_PLAYER,
  REQUEST_MINI_PLAYER,
  REQUEST_THEATER_PLAYER,
  REQUEST_DEFAULT_PLAYER,
  REQUEST_SET_VIDEO,
} from '../../actions/video_player/video_player';

import { MINI, THEATER, DEFAULT } from '../../util/constants';

import { merge } from 'lodash'

const defaultState = {
  type: null,
  video: {}
}


const videoPlayerReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case REQUEST_MINI_PLAYER:
      return merge({}, state, { type: MINI })
    case REQUEST_THEATER_PLAYER:
      return merge({}, state, { type: THEATER })
    case REQUEST_DEFAULT_PLAYER:
      return merge({}, state, { type: DEFAULT })
    case REQUEST_SET_VIDEO:
      const newState = merge({}, state)
      newState.video = action.video
      return newState;
    case REMOVE_VIDEO_PLAYER:
      return defaultState
    default:
      return state;
  }
}

export default videoPlayerReducer;