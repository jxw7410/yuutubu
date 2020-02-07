import React, { memo, useRef, useState, useEffect } from 'react';
import Styled from 'styled-components';
import CommentDeleteButton from './comment_delete_button';
import DOMPurify from 'dompurify';


function Comment(props) {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [canReadMore, setCanReadMore] = useState(false);


  useEffect( () => {
    const height = contentRef.current.offsetHeight;
    if (height > 100) setCanReadMore(true);
  }, [])

  const handleExpand = e => {
    e.preventDefault();
    setExpanded(!expanded)
  }

  return (
    <Wrapper>
      <CommentGrid>
        <CommentGridR1>
          <div>
            <i style={{ fontSize: '32px' }} className='fas fa-user-circle' />
          </div>
          <div>
            <CommentHeader>
              <HeaderMeta>
                <span>{props.post.user}</span>
                <span>{props.post.created_at}</span>
              </HeaderMeta>
              <CommentDeleteButton post={props.post} />
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
          </div>
        </CommentGridR1>
      </CommentGrid>
    </ Wrapper >
  )
}

const Wrapper = Styled.li`
  margin-bottom: 10px;
`

const CommentGrid = Styled.div`
  min-height: 78px;
  display: grid;
  grid-template-rows: auto auto;
`

const CommentGridR1 = Styled.div`
  display: grid;
  grid-template-columns: 55px auto;
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



export default memo(Comment);