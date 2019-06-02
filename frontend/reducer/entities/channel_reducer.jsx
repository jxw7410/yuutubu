import {RECEIVE_CHANNEL, RECEIVE_CHANNELS, CLEAR_CHANNELS} from '../../actions/channel/channel_action';
import {merge} from 'lodash';

const channelsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CHANNEL:
            return merge({}, state, { [action.channel.id] : action.channel });
        case RECEIVE_CHANNELS:
            return merge({} ,state , action.channels);
        case CLEAR_CHANNELS:
            return {};
        default:
            return state;
    }
}

export default channelsReducer;