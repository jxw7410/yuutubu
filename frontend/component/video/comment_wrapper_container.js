import { connect } from 'react-redux';
import { requestPosts, requestRemovePost } from '../../actions/video_post/video_posts_action';
import CommentWrapper from './comment_wrapper';

const msp = state => ({
  isLogin: Boolean(state.session.id),
  currentUser: state.session,
  posts: Object.values(state.entities.video_posts).reverse()
})

const mdp = dispatch => ({
  fetchPosts: params => dispatch(requestPosts(params)),
  clearPosts: () => dispatch(requestRemovePost())
})

export default connect(msp, mdp)(CommentWrapper);