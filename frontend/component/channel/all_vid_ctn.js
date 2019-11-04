import { connect } from 'react-redux';
import AllVideos from './all_videos';
import { fetchChannelVideos, clearChannelVideos } from '../../actions/video/video_action'
import { withRouter } from 'react-router-dom'

const msp = (state, props) => {
  const channelId = props.match.params.channel_id;
  return {
    channelId,
    channel: state.entities.channels[channelId] || {},
    videos: Object.values(state.entities.videos),
    isNavToggled: state.ui.navBars.toggled,
  }
}


const mdp = dispatch => {
  return {
    fetchChannelVideos: (channel_id, limit, offset) => dispatch(fetchChannelVideos(channel_id, limit, offset)),
    clearChannelVideos: () => dispatch(clearChannelVideos())
  }
}

export default withRouter(connect(msp, mdp)(AllVideos));