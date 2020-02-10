import DefaultVideoUI from './default_video_ui';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestMiniPlayer } from '../../actions/video_player/video_player';
import { withVideoPlayerContext } from './video_player_context';

const msp = state => ({
  video: state.ui.videoPlayer.video,
  prevPath: state.ui.prevPath.path,
})

const mdp = dispatch => ({
  requestMiniPlayer: () => dispatch(requestMiniPlayer()),
})

export default withRouter(connect(msp, mdp)(withVideoPlayerContext(DefaultVideoUI)));