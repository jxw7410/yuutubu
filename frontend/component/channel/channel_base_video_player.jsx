import React from 'react';


const ChannelBaseVideoPlayer = (props) => {
    //debugger
    return(
        <div id='featured-video-ctn'>
            <video controls>
                <source src={props.video.videoUrl} type="video/mp4" />
            </video> 

            <section id='featured-video-info'>
                <div>
                    <span>{props.video.title}</span>
                    <span>0 views</span>
                </div>

                <div>
                    <span>{props.video.description}</span>
                    <span>Read More</span>
                </div>
            </section>
        </div>
    )
}

export default ChannelBaseVideoPlayer;