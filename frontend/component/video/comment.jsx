import React from 'react';
import CommentDeleteBtn from './comment_delete_btn';
import { useDescriptionExpander } from '../../util/custom_hooks';

const Comment = props => {
  const contentHeightLimit = 94 // 94px
  const [state, contentContainer, handleReadMore] = useDescriptionExpander(contentHeightLimit);

  return (
    <li>
      <div className='vid-post'>
        <div className='vid-post-r1'>
          <section>
            <i className='fas fa-user-circle vpr1c1-i' />
          </section>

          <section>
            <div className='vid-post-r1-c2-hdr flexh-5'>
              <section className='flexh-3'>
                <span>{props.post.user}</span>
                <span className='vpr1c1hl'>
                  {props.post.created_at}
                </span>
              </section>
              <CommentDeleteBtn post={props.post}/>
            </div>

            <div 
              className={[
                'vid-post-bd-r1-c2',
                state.expanded ? "expd" : ""
              ].join(" ")}>
              <div ref={contentContainer}>
                {props.post.description}
              </div>
            </div>
            
            <div className='vid-post-ftr-r1-c2'>
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