import { connect } from 'react-redux';
import { fetchChannelVideos } from '../../actions/video/video_action';
import { getVideosForChannel } from '../../util/selectors';
import ChannelIndex from './channel_index';

const msp = (state, ownProps) => {
  return {
    channel: ownProps.channel,
    videos: getVideosForChannel(state.entities.videos, ownProps.channel.video_ids)
  }
}


const mdp = dispatch => {
  return {
    fetchChannelVideos: (channel_id, limit, offset) => dispatch(fetchChannelVideos(channel_id, limit, offset)),
  }
}


export default connect(msp, mdp)(ChannelIndex);