import {RECEIVE_CHANNEL, RECEIVE_CHANNELS, CLEAR_CHANNELS} from '../../actions/channel/channel_action';
import {RECEIVE_SUBSCRIPTION, DELETE_SUBSCRIPTION} from '../../actions/subscribe/subscribe_action'
import {merge} from 'lodash';

const channelsReducer = (state = {}, action) => {
    let newState;
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_CHANNEL:
            return merge({}, state, { [action.channel.id] : action.channel });
        case RECEIVE_CHANNELS:
            return merge({} ,state , action.channels);
        case CLEAR_CHANNELS:
            return {};
        case RECEIVE_SUBSCRIPTION:    
           newState = merge({}, state);
            newState[action.sub.channel_id].subscriptionCount = action.sub.subscriptionCount;
            return newState;      
        case DELETE_SUBSCRIPTION:
            newState = merge({}, state);
            newState[action.sub.channel_id].subscriptionCount = action.sub.subscriptionCount;
            return newState;  
        default:
            return state;
    }
}

export default channelsReducer;