import {RECEIVE_LIKE_DISLIKE, CLEAR_LIKE_DISLIKE} from '../../actions/like/like_dislike_action';
import {RECEIVE_VIDEO} from '../../actions/video/video_action'


const likeReducer = (state = {}, action)=>{
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_VIDEO:
           if (!state.id){
                const res = action.video.like_dislike;
                if (res)
                    return res
                else 
                    return {} 
           } else 
                return state;
        case RECEIVE_LIKE_DISLIKE:
            return action.likeDislike;
        case CLEAR_LIKE_DISLIKE:
            return {}
        default:
            return state;
    }
}

export default likeReducer;