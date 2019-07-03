import {RECEIVE_LIKE_DISLIKE, CLEAR_LIKE_DISLIKE, RECEIVE_VIDEO_LIKE_DISLIKE} from '../../actions/like/like_dislike_action';
import {RECEIVE_VIDEO} from '../../actions/video/video_action'


const likeReducer = (state = {}, action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_VIDEO_LIKE_DISLIKE:
            if (action.videoLikeDislike)
                return action.videoLikeDislike;
            else 
                return {}
        case RECEIVE_LIKE_DISLIKE:
            return action.likeDislike;
        case CLEAR_LIKE_DISLIKE:
            return {}
        default:
            return state;
    }
}

export default likeReducer;