import {combineReducers} from 'redux';
import usersReducer from './user_reducer';
import channelsReducer from './channel_reducer';
import videosReducer from './video_reducer';

export default combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    videos: videosReducer
});





