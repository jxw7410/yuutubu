import React from 'react';
import LikeDislike from './like_dislike_ctn';

const VideoHeader = props => {
  return (
    <div className='video-info--header'>
      <section className='flex-horizontal--style-8'>
        {props.video.title}
      </section>
      <section className='flex-horizontal-style-6'>
        <span>{props.video.views} views</span>
        <LikeDislike />
      </section>
    </div>
  )
}



export default React.memo(VideoHeader);