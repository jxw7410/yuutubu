import React from 'react';


class Video extends React.Component {
    render(){
        debugger
        return (
        <div id='video-container'>
            <img src={ this.props.video.thumbnailUrl } />
        </div>
    )}
}

export default Video;