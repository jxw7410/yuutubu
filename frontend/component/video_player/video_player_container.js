import { connect } from 'react-redux';
import VideoPlayer from './_video_player';

const msp = state =>({
    channels: Object.values(state.entities.channels),
    videoPlayer: state.ui.videoPlayer,
});

export default connect(msp, null)(VideoPlayer);
