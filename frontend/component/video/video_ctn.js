import Video from './video';
import { connect } from 'react-redux'
import { fetchChannel } from '../../actions/channel/channel_action'
import { sideBarTwo } from '../../actions/nav/nav_bar_action';
import { requestDefaultPlayer, requestSetVideo } from '../../actions/video_player/video_player';
import { fetchVideo } from '../../actions/video/video_action';
import { requestUpdatePrevPath } from '../../actions/history/prev_path_action';
import { videoLikeDislike } from '../../actions/like/like_dislike_action';

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
  fetchChannel: channelId => dispatch(fetchChannel(channelId)),
  sideBarTwo: () => dispatch(sideBarTwo()),
  requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
  requestSetVideo: video => dispatch(requestSetVideo(video)),
  updatePrevPath: path => dispatch(requestUpdatePrevPath(path)),
  videoLikeDislike: video_like_dislike => dispatch(videoLikeDislike(video_like_dislike))
})

export default connect(msp, mdp)(Video);