import React from 'react'
import Description from './description';


const render = (expanded, reference, description) => {
  return (
    <div className={'vid-post-bd-r1-c2' + (expanded ? " expd" : "")}>
      <div ref={reference}>{description}</div>
    </div>
  )
}


const readMore = (expanded, handleReadMore) => {
  return (
    <div className='vid-post-ftr-r1-c2'>
      <span className='span-style-1' onClick={handleReadMore}>
        {expanded ? 'Read Less' : 'Read More'}
      </span>
    </div>
  )

}


const postInfo = props => {
  return (
    <div className='flexh-3'>
      <span>{props.post.user}</span>
      <span className='vpr1c1hl'>{props.post.created_at}</span>
    </div>
  )
}

const deleteButton = props => {
  return (
    parseInt(props.currentUser.id) === props.post.user_id ?
      <button className="form-del-btn"
        onClick={props.handleDelete(props.post.id)}>Delete</button> : null
  )
}

const VideoPost = props => {
  return (
    <li >
      <div className='vid-post'>
        <div className='vid-post-r1'>
          <div> <i className="fas fa-user-circle vpr1c1-i" /></div>
          <div className='vid-post-r1-c2'>
            <div className='vid-post-r1-c2-hdr flexh-5'>
              {postInfo(props)}
              {deleteButton(props)}
            </div>
            <Description
              description={props.post.description}
              readMore={readMore}
              render={render}
              heightLimit={94}
            />
          </div>
        </div>
        <div />
      </div>
    </li>
  )
}

export default VideoPost;