import {connect} from 'react-redux';
import Search from './search';
import { updateSearchHistory, requestSearchVideos } from '../../actions/search/search_action';
import { clearChannelVideos } from '../../actions/video/video_action';
import { removeVideoPlayer } from '../../actions/video_player';
import { sideBarOne } from '../../actions/nav_bar_action';


const msp = (store,props) => {
    return {
        videos: Object.values(store.entities.videos),
        sideNav: store.ui.navBars
    }
} 


const mdp = dispatch => {
    return {
        updateSearchHistory: query =>  dispatch(updateSearchHistory(query)),
        requestSearchVideos: (query, limit, offset) => dispatch(requestSearchVideos(query, limit, offset)),
        clearVideos: () => dispatch(clearChannelVideos()),
        fetchSideBarOne: () => dispatch(sideBarOne()),
        removeVideoPlayer: () => dispatch( removeVideoPlayer()),
    }
}


export default connect(msp, mdp)(Search);