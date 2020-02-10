import VideoThumbnail from './_video_thumbnail';
import { connect } from 'react-redux';
import { fetchVideo } from '../../actions/video/video_action';
import { withRouter } from 'react-router-dom';

const mdp = dispatch => ({
  fetchVideo: videoId => dispatch(fetchVideo(videoId)),
});

export default withRouter(connect(null, mdp)(VideoThumbnail));