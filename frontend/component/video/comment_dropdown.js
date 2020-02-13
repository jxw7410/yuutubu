import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestDeletePost } from '../../actions/video_post/video_posts_action'
import styled from 'styled-components';
import { centerFlex } from '../common/flex_styles';

const CommentDropdown = props => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  function handleDelete(e) {
    e.stopPropagation();
    props.deletePost(props.post.id, props.parentId)
  }

  function handleOpenDropdown(bool) {
    return e => {
      e.currentTarget.focus();
      setOpenDropdown(bool);
    }
  }

  const openCommentBox = e => {
    e.preventDefault();
    props.openCommentBox(e);
    setOpenDropdown(false);
  }

  return (
    <>
      {
        props.isOwner ?
          <IconButton
            onClick={handleOpenDropdown(!openDropdown)}
            onBlur={() => setOpenDropdown(false)}
          >
            <DropDown
              onClick={e => e.stopPropagation()}
              style={openDropdown ? null : { display: 'none' }}>
              <DropDownItem
                onClick={handleDelete}>
                Delete
              </DropDownItem>
              <DropDownItem onClick={openCommentBox}>
                Edit
              </DropDownItem>
            </DropDown>
          </IconButton>
          : null
      }
    </>
  )
}


const EllipsisV = props => (
  <i
    style={{ display: 'none' }}
    className={`fas fa-ellipsis-v ${props.className}`}
    tabIndex='0'
    onBlur={props.onBlur}
    onClick={props.onClick}>
    {props.children}
  </i>
)

const IconButton = styled(EllipsisV)`
  position: relative;
  text-align: center;
  width: 30px;
  background: rgb(249,249,249);

  &:focus{ outline: none; }
  &:hover{ color: gray; }
`;

const DropDown = styled.ul`
  position: absolute;
  z-index: 1000;
  border-radius: 3px;
  width: 80px;
  padding: 5px 0px;
  background: inherit;
  box-shadow: 0px 0px 3px gray;
`;

const DropDownItem = styled.li`
  ${centerFlex}
  width: 100%;
  height: 20px;
  font-size: 14px;
  color: black;

  &:hover{ background: lightgray; }
`;


const msp = (state, props) => ({
  isOwner: state.session.id == props.post.user_id
})

const mdp = dispatch => ({
  deletePost: (postId, parentId) => dispatch(requestDeletePost(postId, parentId)),
})

export default withRouter(connect(msp, mdp)(CommentDropdown));