import {connect} from 'react-redux';
import Search from './search';
import { updateSearchHistory, requestSearchVideos } from '../../actions/search/search_action';
import { clearChannelVideos } from '../../actions/video/video_action';
import { removeVideoPlayer } from '../../actions/video_player';
import { sideBarOne } from '../../actions/nav_bar_action';
import { requestUpdatePrevPath } from '../../actions/prev_path_action';


const msp = (state) => {
    return {
        videos: Object.values(state.entities.videos),
        sideNav: state.ui.navBars,
        videoPlayer: state.ui.videoPlayer
    }
} 


const mdp = dispatch => {
    return {
        updateSearchHistory: query =>  dispatch(updateSearchHistory(query)),
        requestSearchVideos: (query, limit, offset) => dispatch(requestSearchVideos(query, limit, offset)),
        clearVideos: () => dispatch(clearChannelVideos()),
        fetchSideBarOne: () => dispatch(sideBarOne()),
        removeVideoPlayer: () => dispatch( removeVideoPlayer()),
        updatePrevPath: path => dispatch(requestUpdatePrevPath(path))
    }
}


export default connect(msp, mdp)(Search);