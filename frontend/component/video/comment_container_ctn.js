import { connect } from 'react-redux';
import { requestPosts, removePosts } from '../../actions/video_post/video_posts_action';
import CommentContainer from './comment_container';

const msp = state => ({
  isLogin: Boolean(state.session.id),
  currentUser: state.session,
  posts: Object.values(state.entities.video_posts).reverse()
})

const mdp = dispatch => ({
  fetchPosts: params => dispatch(requestPosts(params)),
  clearPosts: () => dispatch(removePosts)
})

export default connect(msp, mdp)(CommentContainer);