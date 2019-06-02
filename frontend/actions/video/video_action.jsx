import * as VideoAPI from '../../util/video_api';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';




const receiveVideo = video => {
    return {
        type: RECEIVE_VIDEO,
        video
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


