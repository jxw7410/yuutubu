import {RECEIVE_CHANNEL} from '../../actions/channel/channel_action';
import {merge} from 'lodash';

const channelReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CHANNEL:
            return merge({}, state, { [action.channel.id] : action.channel })
        default:
            return state;
    }
}

export default channelReducer;