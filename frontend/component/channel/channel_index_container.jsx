import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { fetchChannels, clearChannels } from '../../actions/channel/channel_action';
import { sideBarOne } from '../../actions/nav_bar_action';
import { removeVideoPlayer } from '../../actions/video_player';
const msp = state => {
    return {
        channels: Object.values(state.entities.channels),
        user_id: state.session.id,
        navBar: state.ui.navBars,
        videoPlayer: state.ui.videoPlayer
    }
}


const mdp = dispatch => {
    return {
        fetchChannels: (offset, num, user_id) => dispatch( fetchChannels(offset, num, user_id)),
        clearChannels: () => dispatch( clearChannels() ),
        sideBarOne: () => dispatch( sideBarOne() ),
        removeVideoPlayer: () => dispatch( removeVideoPlayer() ),
    }
}


export default connect(msp, mdp)(ChannelIndex)