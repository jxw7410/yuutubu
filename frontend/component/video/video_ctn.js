import Video from './video';
import { connect } from 'react-redux'
import {fetchChannel} from '../../actions/channel/channel_action'
import { sideBarTwo } from '../../actions/nav/nav_bar_action';
import { requestDefaultPlayer, requestSetVideo } from '../../actions/video_player/video_player';
import { fetchVideo } from '../../actions/video/video_action';
import { requestUpdatePrevPath } from '../../actions/history/prev_path_action';
import { videoLikeDislike } from '../../actions/like/like_dislike_action';

const msp = (state, props) => {
    const video = state.entities.videos[props.match.params.video_id] || {}
    return {
        video,
        channels: state.entities.channels,
        videoPlayer: state.ui.videoPlayer
    }
}

const mdp = dispatch => ({
        fetchVideo: video_id => dispatch(fetchVideo(video_id)),
        fetchChannel: channel_id => dispatch(fetchChannel(channel_id)),
        sideBarTwo: () => dispatch(sideBarTwo()),
        requestDefaultPlayer: () => dispatch(requestDefaultPlayer()),
        requestSetVideo: video => dispatch( requestSetVideo(video)),
        updatePrevPath: path => dispatch( requestUpdatePrevPath(path)),
        videoLikeDislike: video_like_dislike => dispatch(videoLikeDislike(video_like_dislike))
})

export default connect(msp, mdp)(Video);