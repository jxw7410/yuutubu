import { connect } from 'react-redux';
import AllVideos from './all_videos';
import { fetchChannelVideos, clearChannelVideos } from '../../actions/video/video_action'

const msp = (state, props) => {
  return {
    channel: state.entities.channels[props.channelId],
    videos: Object.values(state.entities.videos)
  }
}


const mdp = dispatch => {
  return {
    fetchChannelVideos: (channel_id, limit, offset) => dispatch(fetchChannelVideos(channel_id, limit, offset)),
    clearChannelVideos: () => dispatch(clearChannelVideos())
  }
}

export default connect(msp, mdp)(AllVideos);