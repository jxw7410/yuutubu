import React from 'react';


const ChannelBaseVideoPlayer = (props) => {
    return(
        <div id='featured-video-ctn'>
            <video controls>
                <source url={""} type="video/mp4" />
            </video> 

            <section id='featured-video-info'>
                <div>
                    <span>Title</span>
                    <span>0 views</span>
                </div>

                <div>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, reiciendis sed enim a amet nesciunt nam odit delectus molestiae sequi necessitatibus maxime iste minima nulla molestias repellat aliquid deserunt nostrum!</span>
                    <span>Read More</span>
                </div>
            </section>
        </div>
    )
}

export default ChannelBaseVideoPlayer;