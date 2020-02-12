import React, { memo, useRef, useState, useEffect } from 'react';
import Styled from 'styled-components';
import CommentDropdown from './comment_dropdown';
import CommentBox from './comment_box_container';
import DOMPurify from 'dompurify';


function Comment(props) {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [canReadMore, setCanReadMore] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(null);


  useEffect( () => {
    const height = contentRef.current.offsetHeight;
    if (height > 100) setCanReadMore(true);
    else setCanReadMore(false);
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

  return (
    <Wrapper>
      <CommentGrid>
        <CommentGridR1>
          <div>
            <i style={{ fontSize: '36px', paddingRight: '20px' }} className='fas fa-user-circle' />
          </div>
          <div>
            <CommentHeader>
              <HeaderMeta>
                <span>{props.post.user}</span>
                <span>{props.post.created_at}</span>
              </HeaderMeta>
              <CommentDropdown 
                openCommentBox={handleOpenCommentBox('EDIT')}
                post={props.post} 
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
              onClick={handleExpand}
            >
              { expanded ? 'Read Less' : 'Read More'}
            </CommentExpander>
            <div style={{paddingBottom: '10px'}}>
              <span style={{fontSize: '12px'}}>REPLY</span>
            </div>
            {
              openCommentBox ? 
                <CommentBoxWrapper>
                  <div style={{ fontSize: '24px' }}>
                    <i className="fas fa-user-circle" />
                  </div>
                  <CommentBox
                    type={openCommentBox}
                    cancelCommentBox={handleCloseCommentBox}
                    description={props.post.description}
                    postId={props.post.id}
                    placeholder={openCommentBox === 'EDIT' ? 'Edit your comment' : null}
                  /> 
                </CommentBoxWrapper> : null
            }
          </div>
        </CommentGridR1>
      </CommentGrid>
    </ Wrapper >
  )
}

const Wrapper = Styled.li`
  margin-bottom: 10px;
  &:hover i{ display: block !important; }
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
  display: ${ props => props.canReadMore ? 'block' : 'none' };
  font-size: 12px;
  font-weight: bold;
  margin: 3px 0;

  &:hover{
    cursor: pointer;
  }
`

const CommentBoxWrapper = Styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40px auto;
`



export default memo(Comment);