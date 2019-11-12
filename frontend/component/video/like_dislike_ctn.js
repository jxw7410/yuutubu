import LikeDislike from './like_dislike';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  createLikeDislike,
  updateLikeDislike,
  deleteLikeDislike,
  requestClearLikeDislike
} from '../../actions/like/like_dislike_action';



const msp = state => ({
  video: state.ui.videoPlayer.video,
  isLogin: Boolean(state.session.id),
  likeDislike: state.entities.like,
});

const mdp = dispatch => ({
  createLikeDislike: (video_id, bool) => dispatch(createLikeDislike(video_id, bool)),
  updateLikeDislike: (id, bool) => dispatch(updateLikeDislike(id, bool)),
  deleteLikeDislike: id => dispatch(deleteLikeDislike(id)),
  clearLikeDislike: () => dispatch(requestClearLikeDislike())
})


export default withRouter(connect(msp, mdp)(LikeDislike));