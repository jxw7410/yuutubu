import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import navBarsReducer from './nav_bar_reducer';
import videoPlayerReducer from './video_player_reducer';
import prevPathReducer from './prev_path_reducer';

export default combineReducers({
  modal: modalReducer,
  navBars: navBarsReducer,
  videoPlayer: videoPlayerReducer,
  prevPath: prevPathReducer,
});



