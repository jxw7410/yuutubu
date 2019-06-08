import Video from './video';
import { connect } from 'react-redux'
import {fetchChannel} from '../../actions/channel/channel_action'
import { sideBarTwo } from '../../actions/nav_bar_action';
import { requestDefaultPlayer, requestSetVideo } from '../../actions/video_player';


const msp = (state, props) => {
    const video = state.entities.videos[props.match.params.video_id] || {}
    return {
        video,
        channels: state.entities.channels,
        videoPlayer: state.ui.videoPlayer
    }
}

const mdp = dispatch => {
    return {
        fetchChannel: channel_id => dispatch(fetchChannel(channel_id)),
        sideBarTwo: () => dispatch(sideBarTwo()),
        requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
        requestSetVideo: video => dispatch( requestSetVideo(video) )
    }
}

export default connect(msp, mdp)(Video);