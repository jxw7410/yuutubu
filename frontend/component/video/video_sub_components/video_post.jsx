import React from 'react'
import Description from './description';


const render = (expanded, reference, description) => {
    return (
        <div className={'video-posts-row-1-col-2-body' + (expanded ? " expanded" : "")}>
            <div ref={reference}>{description}</div>
        </div>
    )
}


const readMore = (expanded, handleReadMore) => {
    return (
        <div className='video-posts-row-1-col-2-footer'>
            <span className='span-style-1' onClick={handleReadMore}>
                {expanded ? 'Read Less' : 'Read More'}
            </span>
        </div>
    )

}


const postInfo = props => {
    return (
        <div className='video-posts-row-1-col-2-header-left'>
            <span>{props.post.user}</span>
            <span>{props.post.created_at}</span>
        </div>
    )
}

const deleteButton = props => {
    return (
        parseInt(props.currentUser.id) === props.post.user_id ?
            <button className="form-delete-button"
                onClick={props.handleDelete(props.post.id)}>Delete</button> : null
    )
}

const VideoPost = props => {
    return (
        <li >
            <div className='video-posts'>
                <div className='video-posts-row-1'>
                    <div className='video-posts-row-1-col-1'> <i className="fas fa-user-circle" /></div>
                    <div className='video-posts-row-1-col-2'>
                        <div className='video-posts-row-1-col-2-header'>
                            {postInfo(props)}
                            {deleteButton(props)}
                        </div>
                        <Description
                            description={props.post.description}
                            readMore={readMore}
                            render={render}
                            heightLimit = {94}
                        />
                    </div>
                </div>
                <div className='video-posts-row-2'></div>
            </div>
        </li>
    )
}

export default VideoPost;