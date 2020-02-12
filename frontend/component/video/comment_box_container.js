import { connect } from 'react-redux';
import { requestCreatePost, requestUpdateComment } from '../../actions/video_post/video_posts_action';
import CommentBox from './comment_box';
import { withRouter } from 'react-router-dom';

const msp = state => ({
  video: state.ui.videoPlayer.video,
  isLogin: Boolean(state.session.id),
});


const mdp = dispatch => ({
  postComment: post => dispatch(requestCreatePost(post)),
  updateComment: post => dispatch(requestUpdateComment(post)),
});


export default withRouter(connect(msp, mdp)(CommentBox));





