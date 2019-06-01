import {combineReducers} from 'redux';
import usersReducer from './user_reducer';
import channelReducer from './channel_reducer';

export default combineReducers({
    users: usersReducer,
    channels: channelReducer
});





