import { requestVideo } from '../../util/video_api';

export const REMOVE_VIDEO_PLAYER = "REMOVE_VIDEO_PLAYER";
export const REQUEST_MINI_PLAYER = "REQUEST_MINI_PLAYER";
export const REQUEST_THEATER_PLAYER = 'REQUEST_THEATHER_PLAYER';
export const REQUEST_DEFAULT_PLAYER = 'REQUEST_DEFAULT_PLAYER';
export const REQUEST_SET_VIDEO = 'REQUEST_SET_VIDEO';

export const removeVideoPlayer = () => {
  return {
    type: REMOVE_VIDEO_PLAYER
  }
}

export const requestMiniPlayer = () => {
  return {
    type: REQUEST_MINI_PLAYER
  }
}

export const requestTheaterPlayer = () => {
  return {
    type: REQUEST_THEATER_PLAYER
  }
}

export const requestDefaultPlayer = () => {
  return {
    type: REQUEST_DEFAULT_PLAYER
  }
}

export const requestSetVideo = video => {
  return {
    type: REQUEST_SET_VIDEO,
    video
  }
}

export const fetchVideo = videoId => dispatch => {
  return requestVideo(videoId)
    .then(video => dispatch(requestSetVideo(video)));
};