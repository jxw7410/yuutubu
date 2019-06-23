import { connect } from 'react-redux';
import { sideBarOne } from '../../actions/nav_bar_action';
import { removeVideoPlayer } from '../../actions/video_player';

import Channel from './channel';


const msp = (state, props) => {
    const channel = state.entities.channels[props.match.params.channel_id] || {}
    //
    return {
        channel,
        userId: state.session.id,
        isLogin: Boolean(state.session.id),
        navBar: state.ui.navBars,
        videoPlayer: state.ui.videoPlayer
    }
}

const mdp = dispatch => {
    return {
        sideBarOne: () => dispatch(sideBarOne()),
        removeVideoPlayer: () => dispatch( removeVideoPlayer())
    }
}


export default connect(msp, mdp)(Channel);