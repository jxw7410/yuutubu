import { connect } from 'react-redux';
import {  requestDeletePost, requestPosts, removePosts } from '../../actions/video_post/video_posts_action';
import CommentContainer from './comment_container';

const msp = state => ({
  isLogin: Boolean(state.session.id),
  currentUser: state.session,
  posts: Object.values(state.entities.video_posts).reverse()
})

const mdp = dispatch => ({
  deletePost: post_id => dispatch(requestDeletePost(post_id)),
  fetchPosts: params => dispatch(requestPosts(params)),
  clearPosts: () => dispatch(removePosts)
})

export default connect(msp, mdp)(CommentContainer);