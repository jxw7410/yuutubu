import { connect } from 'react-redux';
import { sideBarTwo } from '../../actions/nav/nav_bar_action'
import { removeVideoPlayer } from '../../actions/video_player/video_player';
import UploadVideo from './video_upload';
import { requestUpdatePrevPath } from '../../actions/history/prev_path_action';

const msp = state => ({
  user: state.session,
})

const mdp = dispatch => ({
  sideBarTwo: () => dispatch(sideBarTwo()),
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
  updatePrevPath: path => dispatch(requestUpdatePrevPath(path)),
})

export default connect(msp, mdp)(UploadVideo);