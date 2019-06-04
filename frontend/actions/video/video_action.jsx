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
        .then( video => 
            {
                //debugger
                dispatch(receiveVideo(video))
            });
};


export const fetchChannelVideos = (channel_id, limit, offset) => dispatch => {
    return VideoAPI.requestChannelVideos(channel_id, limit, offset)
        .then( videos => {
            dispatch(receiveChannelVideos(videos));
        });
}