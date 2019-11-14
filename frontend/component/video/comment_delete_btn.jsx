import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestDeletePost } from '../../actions/video_post/video_posts_action'

const CommentDeleteBtn = props => {
  const dropdownRef = React.useRef();
  const [openDropdown, setOpenDropdown] = React.useState(false);
  
  React.useEffect(()=>{
    if (openDropdown){
      dropdownRef.current.focus();
    } 
  }, [openDropdown]);

  function handleDelete(postId) {
    return e => props.deletePost(postId)
  }


  return (
    <>
      {
        props.isOwner ?
          <i 
            style={{
              position: 'relative',
              width: '30px',
              height: '30px',
              background: 'black'
            }}
            onClick={(e) => setOpenDropdown(!openDropdown)}
            className='fas fa-ellipsis-v'>
            <ul
              ref={dropdownRef}
              className='post-delete-dropdown'
              tabIndex='0' 
              onBlur={() => setOpenDropdown(false)}
              style={openDropdown ? null : { display: 'none' }}>
              <li
                className='post-delete-dropdown-item flexh-1'
                onClick={handleDelete(props.post.id)}>
                Delete
            </li>
            </ul>
          </i> : null
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