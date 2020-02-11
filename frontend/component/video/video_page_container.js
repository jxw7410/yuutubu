import VideoPage from './video_page';
import { connect } from 'react-redux'
import { fetchChannel } from '../../actions/channel/channel_action'
import { sideBarTwo } from '../../actions/nav/nav_bar_action';
import { requestDefaultPlayer, fetchVideo } from '../../actions/video_player/video_player_action';
import { fetchRecommendedVideos } from '../../actions/video/video_action';
import { requestUpdatePrevPath } from '../../actions/history/prev_path_action';

const msp = (state, props) => {
  const video = state.entities.videos[props.match.params.video_id] || {}
  const channel = state.entities.channels[video.channel_id] || {};
  return {
    video,
    channel,
    videoPlayer: state.ui.videoPlayer
  }
}

const mdp = dispatch => ({
  fetchVideo: videoId => dispatch(fetchVideo(videoId)),
  fetchRecommendedVideos: videoId => dispatch(fetchRecommendedVideos(videoId)),
  fetchChannel: channelId => dispatch(fetchChannel(channelId)),
  sideBarTwo: () => dispatch(sideBarTwo()),
  requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
  updatePrevPath: path => dispatch(requestUpdatePrevPath(path)),
})

export default connect(msp, mdp)(VideoPage);