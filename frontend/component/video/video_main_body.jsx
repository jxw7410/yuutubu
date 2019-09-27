import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import VideoPost from './video_post';

const VideoMainBody = props => {
  // Literally setState, don't forget to unfurl.
  const [state, setState] = useState({
    postBody: "",
    allText: [],
    rows: 1,
    displayFormButton: false,
    border: false,
  });

  const lineHeight = 18;
  let offset = 0;
  let page;
  let fetching = false;

  useEffect(()=>{
    const params = {
      video_id: props.video.id,
      offset,
      limit: 12
    }

    props.fetchPosts(params) 
      .then(() =>{
        document.addEventListener('scroll', handleScrollEvent);
        page = document.querySelector('html');
      });

    return () =>{
      document.removeEventListener('scroll', handleScrollEvent);
      props.clearPosts();
    } 
  },[])


  const handleScrollEvent = e => {
    e.preventDefault();
    const scrollLimit = (page.scrollTop + page.offsetHeight === page.scrollHeight);
    if (scrollLimit && !fetching) {
      const params = {
        video_id: props.video.id,
        offset,
        limit: 4
      }

      fetching = true;
      props.fetchPosts(params)
        .then( () => {
          fetching = false;
          offset += 4;
        })
        .fail( () => document.removeEventListener('scroll', handleScrollEvent))
    }
  }


  const handleTextChange = e => {
    e.preventDefault();
    const postBody = e.currentTarget.value;
    const oldRows = e.target.rows;
    e.target.rows = 1; 
    const rows = Math.floor(e.target.scrollHeight / lineHeight);
    if (rows === oldRows) {
      e.target.rows = rows;
    }
    setState({ ...state,  rows, postBody})
  }

  const handleClick = () => {
    if (!props.isLogin) {
      props.history.push('/login');
    } else {
      setState({...state, displayFormButton: true})
    }
  }

  const handleCancel = () => {
    setState({
      ...state,
      displayFormButton: false, 
      postBody: "",
      rows: 1
    })
  }

  const handleFocus = () => {
    setState({
      ...state,
      displayFormButton: true, 
      border: true
    })
  }

  const handleBlur = () => {
    setState({ ...state, border: false })
  }

  const handleDelete = post_id => {
    return e => {
      e.preventDefault();
      props.deletePost(post_id);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (state.postBody.length ) {
      const post = {
        video_id: props.video.id,
        description: state.postBody.trim()
      }

      props.createPost(post);
      handleCancel()
    }
  }


  const posts = props.posts.map( post => (
    <VideoPost 
      key={post.id} 
      post={post}
      currentUser={props.currentUser}
      handleDelete={handleDelete}
    />
  ))


  return (
    <div className='vid-pst-bd'>
      <div className='usr-pst-frm-ctn'>
        <div style={{ fontSize: '36px' }}> <i className="fas fa-user-circle" /></div>
        <form className='usr-pst-frm'>
          <textarea rows={state.rows}
            onFocus={handleFocus}
            onClick={handleClick}
            onChange={handleTextChange}
            onBlur={handleBlur}
            placeholder={state.allText.length ? "" : 'Add a public comment...'}
            value={state.postBody}
            style={{ lineHeight: `${lineHeight}px` }}
          />
          <div className='txtarea-brdr flexh-2'>
            <div className={"expander" + (state.border ? " exp-active" : "")} />
          </div>
          {
            state.displayFormButton ?
              <div className='usr-pst-frm-btn flexh-9'>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSubmit}
                  className={state.postBody.trim().length ? null : 'button-disabled'}
                  disabled={state.postBody.trim().length ? null : 'disabled'}>Comment</button>
              </div> : null
          }
        </form>
      </div>
      <ul id="lopst" className='flexv-4'>{posts}</ul>
    </div>
  )
}


export default withRouter(VideoMainBody);