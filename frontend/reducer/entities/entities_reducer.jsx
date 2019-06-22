import {combineReducers} from 'redux';
import usersReducer from './user_reducer';
import channelsReducer from './channel_reducer';
import videosReducer from './video_reducer';
import likeReducer from './like_dislike_reducer';
import videoPostReducer from './video_post_reducer';
import searchReducer from './search_reducer';
import searchHistory from './history_reducer';

export default combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    videos: videosReducer,
    like: likeReducer,
    video_posts: videoPostReducer,
    searches: searchReducer,
    history: searchHistory,
});





