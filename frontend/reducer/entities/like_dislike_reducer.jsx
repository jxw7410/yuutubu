import {RECEIVE_LIKE_DISLIKE} from '../../actions/like/like_dislike_action';
import {RECEIVE_VIDEO} from '../../actions/video/video_action'


const likeReducer = (state = {}, action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_VIDEO:
            const res = action.video.like_dislike;
            if (res)
                return res 
            else 
                return {}
        case RECEIVE_LIKE_DISLIKE:
            return action.likeDislike
        default:
            return state;
    }
}

export default likeReducer;