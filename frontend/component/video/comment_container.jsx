import React from 'react';
import Comment from './comment';
import {useInfiniteScrolling} from '../../util/custom_hooks';
import CommentBox from './comment_box';

const CommentsContainer = props => {
  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchPosts);
  const offsetRef = React.useRef(0);

  React.useEffect( () => {
    return () => props.clearPosts();
  }, [])

  React.useEffect(() => { 
    fetchPosts();
  }, [props.video.id])


  function fetchPosts(){
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
    <div className='vid-pst-bd'>
      <div className='usr-pst-frm-ctn'>
        <div style={{ fontSize: '36px' }}> 
          <i className="fas fa-user-circle" />
        </div>
        <CommentBox />
      </div>
      <ul id='lopst' className='flexv-4'>
        {
          props.posts.map( post => 
            <Comment
              key={post.id}
              post={post}
            />
          )
        }
      </ul>
    </div>
  )
}


export default CommentsContainer;