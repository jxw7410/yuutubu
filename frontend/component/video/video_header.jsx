import React from 'react';
import LikeDislike from './like_dislike_ctn';

const VideoHeader = props => {
  return (
    <div className='vid-info-hdr'>
      <section className='flexh-8'>
        {props.video.title}
      </section>
      <section className='flexh-6'>
        <span>{props.video.views} views</span>
        <LikeDislike />
      </section>
    </div>
  )
}



export default VideoHeader;