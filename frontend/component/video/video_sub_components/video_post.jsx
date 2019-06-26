import React from 'react'

const VideoPost = props => {
    return (
        <li >
            <div className='video-posts'>
                <div className='video-posts-row-1'>
                    <div className='video-posts-row-1-col-1'>
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className='video-posts-row-1-col-2'>
                        <div className='video-posts-row-1-col-2-header'>
                            <div className='video-posts-row-1-col-2-header-left'>
                                <span>{props.post.user}</span>
                                <span>{props.post.created_at}</span>
                            </div>
                            {
                                parseInt(props.currentUser.id) === props.post.user_id ?
                                    <button className="form-delete-button"
                                        onClick={props.handleDelete(props.post.id)}>Delete</button> : null
                            }
                        </div>
                        <div className='video-posts-row-1-col-2-body'>
                            <div>{props.post.description}</div>
                        </div>
                        <div className='video-posts-row-1-col-2-footer'> </div>
                    </div>
                </div>
                <div className='video-posts-row-2'>
                </div>
            </div>
        </li>
    )
}

export default VideoPost;