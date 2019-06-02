import { RECEIVE_VIDEO } from '../../actions/video/video_action';
import {merge} from 'lodash';

const videosReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_VIDEO:
            return merge({}, state, { [action.video.id] : action.video })
        default:
            return state;
    }
}

export default videosReducer

