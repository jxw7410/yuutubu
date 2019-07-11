import React from 'react';
import { Link } from 'react-router-dom';


const ChannelBaseVideoPlayer = (props) => {
    return(
        <div id='featured-video-ctn'>
            <video controls>
                <source src={props.video.videoUrl} type="video/mp4" />
            </video> 

            <section id='featured-video-info'>
                <div>
                    <span id='featured-video-title'>{props.video.title}</span>
                    <span id='featured-video-views'>{props.video.views} views &middot; {props.video.created_at}</span>
                </div>

                <div>
                    <span id='featured-video-description'>{props.video.description}</span>
                    <span><Link to={`/video/${props.video.id}`}>Read More</Link></span>
                </div>
            </section>
        </div>
    )
}

export default ChannelBaseVideoPlayer;