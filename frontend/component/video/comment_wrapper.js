import React, { useEffect } from 'react';
import Comment from './comment';
import Styled from 'styled-components';
import { useInfiniteScrolling } from '../../util/custom_hooks';
import CommentBox from './comment_box_container';

function CommentsWrapper(props){
  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchPosts);
  const offsetRef = React.useRef(0);

  useEffect(() => {
    return () => props.clearPosts();
  }, [])

  useEffect(() => { 
    offsetRef.current = 0;
    props.clearPosts()
      .then(() => fetchPosts())
  }, [props.video.id])


  function fetchPosts() {
    const queryLimit = 12;
    const params = {
      video_id: props.video.id,
      offset: offsetRef.current,
      limit: queryLimit
    }
    props.fetchPosts(params)
      .then(() => offsetRef.current += queryLimit)
      .always(() => setIsFetching(false));
  }


  return (
    <Wrapper>
      <Header>
        Comments
      </Header>
      <CommentFormWrapper>
        <div style={{ fontSize: '36px' }}>
          <i className="fas fa-user-circle" />
        </div>
        <CommentBox />
      </CommentFormWrapper>
      <CommentList>
        {
          props.posts.map(post => <Comment key={post.id} post={post} />)
        }
      </CommentList>
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  display: grid;
  grid-template-rows: repeat(3, min-content);
`
const Header = Styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  font-size: 18px;
  font-weight: 500; 
`

const CommentFormWrapper = Styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 55px auto;
`

const CommentList = Styled.ul`
  display: flex;
  flex-direction: column;
`


export default CommentsWrapper;