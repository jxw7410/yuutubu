import React from 'react';
import SubscribeButton from '../subscribe/subscribe_button';
import { Link } from 'react-router-dom';
import {useDescriptionExpander} from '../../util/custom_hooks';

const VideoBody = props => {
  const contentHeightLimit = 90;
  const [state, contentContainer, handleReadMore] = useDescriptionExpander(contentHeightLimit);
  
  return (
    <div className='vid-info-bd'>
      <section>
        <div className='ch-usr-prf-pic'> 
          <i className="fas fa-user-circle" /> 
        </div>
        <div className='vid-info-bd-hdr flexh-5'>
          <div className='flexv-4'>
            <Link to={`/channel/${props.channel.id}`}
              className='vid-ch-name'>
              {props.channel.name}
            </Link>
            <span className='vid-date'>
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
            'vid-desc',
            state.expanded ? 'expd' : ""
          ].join(" ")}>
            <span
              ref={contentContainer} 
              className='post-des'>
              {props.video.description}
            </span>
          </div>
      </section>
      <section>
        <div />
        <div className='flexh-3'>
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