import React, { memo, useRef, useState, useEffect } from 'react';
import Styled from 'styled-components';
import CommentDropdown from './comment_dropdown';
import CommentBox from './comment_box_container';
import DOMPurify from 'dompurify';
import {connect} from 'react-redux';
import { requestReplies } from '../../actions/video_post/video_posts_action';

function Comment(props) {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [canReadMore, setCanReadMore] = useState(false);
  const [expandedReplies, setExpandReplies] = useState(false);
  const [fetchedReplies, setFetchedReplies] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(null);


  useEffect(() => {
    if (!expandedReplies || fetchedReplies) return;
    props.fetchReplies(props.post.id);
    setFetchedReplies(true);
  }, [expandedReplies])

  useEffect(() => {
    setTimeout(() => {
      const height = contentRef.current.offsetHeight;
      if (height > 100) setCanReadMore(true);
      else setCanReadMore(false);
    }, 0);
  }, [props.post.description])

  const handleExpand = e => {
    e.preventDefault();
    setExpanded(!expanded)
  }

  const handleOpenCommentBox = type => e => {
    e.preventDefault();
    setOpenCommentBox(type);
  }

  const handleCloseCommentBox = e => {
    setOpenCommentBox(null);
  }

  const replies = props.post.replies ? Object.values(props.post.replies) : [];
 
  return (
    <Wrapper>
      <CommentGrid>
        <CommentGridR1>
          <div>
            <i style={{ fontSize: '36px', paddingRight: '20px' }} className='fas fa-user-circle' />
          </div>
          <Content>
            <div style={{ display: openCommentBox === 'EDIT' ? null : 'none' }}>
              <CommentBox
                type={openCommentBox}
                cancelCommentBox={handleCloseCommentBox}
                description={props.post.description}
                postId={props.post.id}
                parentId={props.parentId}
                placeholder='Edit your comment'
              />
            </div>
            <div style={{ display: openCommentBox === 'EDIT' ? 'none' : null }}>
              <CommentHeader>
                <HeaderMeta>
                  <span>{props.post.user}</span>
                  <span>{props.post.created_at}</span>
                </HeaderMeta>
                <CommentDropdown
                  openCommentBox={handleOpenCommentBox('EDIT')}
                  post={props.post}
                  parentId={props.parentId}
                />
              </CommentHeader>
              <CommentContent expanded={expanded}>
                <div ref={contentRef}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(props.post.description),
                  }}
                />
              </CommentContent>
              <CommentExpander
                canReadMore={canReadMore}
                onClick={handleExpand}>
                {expanded ? 'Read Less' : 'Read More'}
              </CommentExpander>
              <TextContainer >
                <Reply onClick={handleOpenCommentBox('REPLY')}>
                  REPLY
                </Reply>
              </TextContainer>
              <>
                {
                  openCommentBox === 'REPLY' ?
                    <CommentBoxWrapper>
                      <div style={{ fontSize: '24px' }}>
                        <i className="fas fa-user-circle" />
                      </div>
                      <CommentBox
                        type={openCommentBox}
                        cancelCommentBox={handleCloseCommentBox}
                        postId={props.post.id}
                        parentId={props.parentId || props.post.id}
                      />
                    </CommentBoxWrapper> : null
                }
              </>
            </div>
            <>
              {
                props.post.repliesCount || replies.length ?
                  <TextContainer>
                    <CommentShower onClick={ e => setExpandReplies(!expandedReplies)}> 
                      { expandedReplies ? 'Hide' : 'View'} {Math.max(replies.length, (props.post.repliesCount || 0))} replies
                    </CommentShower>
                  </TextContainer> : null
              }
            </>
            <>
              {
                props.post.replies && expandedReplies ?
                  replies.map(reply => 
                    <Comment key={reply.id} post={reply} parentId={props.parentId || props.post.id} />
                  ) : null
              }
            </>
          </Content>
        </CommentGridR1>
      </CommentGrid>
    </ Wrapper >
  )
}

const Wrapper = Styled.div`
  margin-bottom: 10px;
`

const CommentGrid = Styled.div`
  min-height: 78px;
  display: grid;
  grid-template-rows: repeat(4, min-content);
`

const CommentGridR1 = Styled.div`
  display: grid;
  grid-template-columns: min-content auto;
`
const Content = Styled.div`
   &:hover i{ display: block !important; }
`

const CommentHeader = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const HeaderMeta = Styled.div`
  display: flex;
  align-items: center;

  & > span:last-child {
    font-size: 12px;
    color: rgb(126,126,126);
    margin-left: 5px;
  }
`

const CommentContent = Styled.div`
  overflow: hidden;
  margin: 5px 0;
  max-height: ${ props => props.expanded ? 'max-content' : '100px'}

  & > div {
    width: 95%;
    height: fit-content;
    font-size: 14px;
    line-height: 14px;
  }
`

const CommentExpander = Styled.span`
  display: ${ props => props.canReadMore ? 'block' : 'none'};
  font-size: 12px;
  font-weight: bold;
  margin: 3px 0;

  &:hover{ cursor: pointer;}
`

const CommentBoxWrapper = Styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40px auto;
`

const TextContainer = Styled.div`
  padding-bottom: 5px;
`

const Reply = Styled.span`
  font-size: 12px;
  color: gray;
  &:hover{ cursor: pointer }
`

const CommentShower = Styled.span`
  font-size: 14px;
  color: royalblue;
  &:hover{ cursor: pointer }
`

const mdp = dispatch => ({
  fetchReplies: postId => dispatch(requestReplies(postId)),
});

export default connect(null, mdp)(memo(Comment));