import MiniPlayerUI from './mini_player_ui';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeVideoPlayer } from '../../actions/video_player/video_player_action';
import { withVideoPlayerContext } from './video_player_context';

const mdp = dispatch => ({
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
});

export default withVideoPlayerContext(withRouter(connect(null, mdp)(MiniPlayerUI)));