import React from 'react';



const VideoInfoHeader = props => {
    //debugger
    return (
        <div id='video-info-header'>
            <section>Video Title: {props.videoTitle}</section>
            <section>
                <span>0 Views</span>
                <span>Likes Dislikes</span>
            </section>
        </div>
    )
}


const VideoInfoBody = props => {
    return (
        <div id='video-info-body'>
            <section>
                <div id='channel-user-profile-pic'>
                    <i className="fas fa-user-circle"></i>
                </div>

                <div id='video-info-body-header'>
                    <div>
                        <span id="vid-channel-name">{props.channelName}</span>
                        <span id="vid-video-date">{props.videoDate}</span>
                    </div>

                    <div>
                        Subscribe Button Goes Here
                    </div>
                </div>
            </section>

            <section>
                <div></div>
                <div id="video-description">
                    Video Description: {props.videoDescription}
                </div>
            </section>
        </div>
    )
}



export default  props => {
    return (
        <>
            <VideoInfoHeader {...props} />
            <VideoInfoBody {...props} />
        </>
    )
}