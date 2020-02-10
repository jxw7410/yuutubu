import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestDeletePost } from '../../actions/video_post/video_posts_action'
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { centerFlex } from '../common/flex_styles';

const CommentDeleteButton = props => {
  const [openDropdown, setOpenDropdown] = React.useState(false);

  function handleDelete(postId) {
    return e => {
      e.stopPropagation();
      props.deletePost(postId)
    }
  }

  function handleOpenDropdown(bool) {
    return e => {
      e.currentTarget.focus();
      setOpenDropdown(bool);
    }
  }

  return (
    <>
      {
        props.isOwner ?
          <ThemeProvider theme={{ background: 'white' }}>
            <IconButton
              onClick={handleOpenDropdown(!openDropdown)}
              onBlur={() => setOpenDropdown(false)}
            >
              <DropDown
                onClick={e => e.stopPropagation()}
                style={openDropdown ? null : { display: 'none' }}>
                <DropDownItem
                  onClick={handleDelete(props.post.id)}>
                  Delete
              </DropDownItem>
              </DropDown>
            </IconButton>
          </ThemeProvider>
          : null
      }
    </>
  )
}


const EllipsisV = props => (
  <i className={`fas fa-ellipsis-v ${props.className}`}
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
  background: ${props => props.theme.background || 'white'};

  &:focus{
    outline: none;
  }

  &:hover{
    color: gray;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  z-index: 1000;
  border: 1px solid gray;
  border-radius: 3px;
  width: 80px;
  padding: 5px 0px;
  background: inherit;
`;

const DropDownItem = styled.li`
  ${centerFlex}
  width: 100%;
  height: 20px;
  font-size: 14px;
  color: black;

  &:hover{
    background: lightgray;
  }
`;


const msp = (state, props) => ({
  isOwner: state.session.id == props.post.user_id
})

const mdp = dispatch => ({
  deletePost: postId => dispatch(requestDeletePost(postId)),
})

export default withRouter(connect(msp, mdp)(CommentDeleteButton));