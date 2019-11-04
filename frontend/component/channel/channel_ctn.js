import { connect } from 'react-redux';
import { sideBarOne } from '../../actions/nav/nav_bar_action';
import { removeVideoPlayer } from '../../actions/video_player/video_player';
import Channel from './channel';
import { fetchChannel } from '../../actions/channel/channel_action';
import { requestUpdatePrevPath } from '../../actions/history/prev_path_action';


const msp = state => {
  return {
    isNavToggled: state.ui.navBars.toggled,
    videoPlayer: state.ui.videoPlayer
  }
}

const mdp = dispatch => ({
  sideBarOne: () => dispatch(sideBarOne()),
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
  updatePrevPath: path => dispatch(requestUpdatePrevPath(path)),
  fetchChannel: channelId => dispatch(fetchChannel(channelId)),
})


export default connect(msp, mdp)(Channel);