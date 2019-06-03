import React from 'react';


//Have plans for custom play bar in the future.

class VideoPlayer extends React.Component{
    render(){
        return (
            <video id="video-player" controls>
                <source src={this.props.videoUrl} type="video/mp4" />
            </video>
        )
    }
}


export default VideoPlayer;

