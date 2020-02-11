import * as VideoAPI from '../../util/video_api';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_CHANNEL_VIDEOS = 'RECEIVE_CHANNEL_VIDEOS';
export const CLEAR_CHANNEL_VIDEOS = "CLEAR_CHANNEL_VIDEOS";

const receiveVideo = video => {
  return {
    type: RECEIVE_VIDEO,
    video
  }
}

const receiveChannelVideos = videos => {
  return {
    type: RECEIVE_CHANNEL_VIDEOS,
    videos
  }
}

export const clearChannelVideos = () => {
  return {
    type: CLEAR_CHANNEL_VIDEOS
  }
}

export const fetchVideo = video_id => dispatch => {
  return VideoAPI.requestVideo(video_id)
    .then(video => dispatch(receiveVideo(video)));
};

//On index page
export const fetchChannelVideos = (channel_id, limit, offset) => dispatch => {
  return VideoAPI.requestChannelVideos(channel_id, limit, offset)
    .then(videos => {
      dispatch(receiveChannelVideos(videos));
    })
    .fail( err => {
      console.log(err);
    })
    ;
}

//On video page
export const fetchRecommendedVideos = video_id => dispatch => {
  return VideoAPI.requestRecommendedVideos(video_id)
    .then(videos => {
      dispatch(receiveChannelVideos(videos))
    });
}

export const createVideo = videoPayload => dispatch => {
  return VideoAPI.uploadVideo(videoPayload)
}

export const requestDirectUpload = file => dispatch => {
  return VideoAPI.requestDirectUpload(file)
}

export const deleteDirectUpload = blob_ids => dispatch => {
  return VideoAPI.deleteDirectUpload(blob_ids)
}