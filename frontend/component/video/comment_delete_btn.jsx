import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestDeletePost } from '../../actions/video_post/video_posts_action'

const CommentDeleteBtn = props => {

  function handleDelete(postId) {
    return e => {
      props.deletePost(postId)
    }
  }

  return (
    <>
      {
        props.isOwner ?
          <button
            className="form-del-btn"
            onClick={handleDelete(props.post.id)}>
            Delete
          </button> : null
      }
    </>
  )
}

const msp = (state, props) => ({
  isOwner: state.session.id == props.post.user_id
})

const mdp = dispatch => ({
  deletePost: postId => dispatch(requestDeletePost(postId)),
})

export default withRouter(connect(msp, mdp)(CommentDeleteBtn));