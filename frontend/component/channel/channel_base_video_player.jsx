import React from 'react';
import { Link } from 'react-router-dom';


const ChannelBaseVideoPlayer = (props) => {
  return (
    <div className='ftr-vid-ctn'>
      <video controls>
        <source src={props.video.videoUrl} type="video/mp4" />
      </video>

      <section className='flexv-4 ftr-vid-info'>
        <div className='flexv-4'>
          <span className='ftr-vid-title'>{props.video.title}</span>
          <span className='ftr-vid-views'>{props.video.views} views &middot; {props.video.created_at}</span>
        </div>

        <div className='flexv-4'>
          <span className='ftr-vid-desc'>{props.video.description}</span>
          <span><Link to={`/video/${props.video.id}`}>Read More</Link></span>
        </div>
      </section>
    </div>
  )
}

export default ChannelBaseVideoPlayer;