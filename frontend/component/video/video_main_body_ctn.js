import { connect } from 'react-redux';
import { requestCreatePost, requestDeletePost, requestPosts, requestSomePosts } from '../../actions/video_post/video_posts_action';
import VideoMainBody from './video_main_body';

const msp = state => {
    return {
        isLogin: Boolean(state.session.id),
        currentUser: state.session,
        offset: state.scrollingPaginationOffset,
        posts: Object.values(state.entities.video_posts).reverse()
    }
}

const mdp = dispatch => {
    return {
        createPost: post => dispatch(requestCreatePost(post)),
        deletePost: post_id => dispatch(requestDeletePost(post_id)),
        fetchMorePosts: (video_id, offset, limit) => dispatch(requestSomePosts(video_id, offset, limit)),
        fetchPosts: video_id => dispatch(requestPosts(video_id))
    }
}

export default connect(msp,mdp)(VideoMainBody);