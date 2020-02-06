import React from 'react';
import SubscribeButton from '../subscribe/subscribe_button';
import { Link } from 'react-router-dom';
import {useDescriptionExpander} from '../../util/custom_hooks';

const VideoBody = props => {
  const contentHeightLimit = 90;
  const [state, contentContainer, handleReadMore] = useDescriptionExpander(contentHeightLimit);
  
  return (
    <div className='video-info--body'>
      <section>
        <div className='video-page--user-profile-pic'> 
          <i className="fas fa-user-circle" /> 
        </div>
        <div className='video-info--body-hdr flex-horizontal--style-5'>
          <div className='flex-vertical--style-4'>
            <Link to={`/channel/${props.channel.id}`}
              className='video-page--channel-name'>
              {props.channel.name}
            </Link>
            <span className='video-date'>
              Published on {props.video.created_at}
            </span>
          </div>
          <SubscribeButton channel={props.channel} />
        </div>
      </section>
      <section>
        <div />
        <div 
          className={[
            'video-description--container',
            state.expanded ? 'comment-expanded' : ""
          ].join(" ")}>
            <span
              ref={contentContainer} >
              {props.video.description}
            </span>
          </div>
      </section>
      <section>
        <div />
        <div className='flex-horizontal--style-3'>
          <span 
            style={state.readMore ? null : { display: 'none' }}
            className='span-style-2' 
            onClick={handleReadMore}>
              {state.expanded ? 'Show less' : 'Show More'}
          </span>
        </div>
      </section>
    </div>
  )
}

export default VideoBody;