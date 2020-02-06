import React from 'react';
import CommentDeleteBtn from './comment_delete_button';
import Styled from 'styled-components';
import { useDescriptionExpander } from '../../util/custom_hooks';

const Comment = props => {
  const contentHeightLimit = 94 // 94px
  const [state, contentContainer, handleReadMore] = useDescriptionExpander(contentHeightLimit);

  return (
    <li>
      <div className='video-comment'>
        <div className='video-comment--r1'>
          <section>
            <i className='fas fa-user-circle video-comment--icon' />
          </section>

          <section>
            <div className='video-comment--r1-c2--hdr flex-horizontal--style-5'>
              <section className='flex-horizontal--style-3'>
                <span>{props.post.user}</span>
                <span className='video-comment--date'>
                  {props.post.created_at}
                </span>
              </section>
              <CommentDeleteBtn post={props.post}/>
            </div>

            <div 
              className={[
                'video-comment--r1-c2--bdy',
                state.expanded ? "comment-expanded" : ""
              ].join(" ")}>
              <div ref={contentContainer}>
                {props.post.description}
              </div>
            </div>
            
            <div className='video-comment--r1-c2--ftr'>
              <span 
                style={ state.readMore ? null : { display: 'none' }}
                onClick={handleReadMore}
                className='span-style-1'>
                { state.expanded ? 'Read Less' : 'Read More' }
              </span>
            </div>
          </section>
        </div>
      </div>
    </li>
  )
}

export default Comment;