import React from 'react';

class ThumbnailPreviewVideo extends React.Component {
    constructor(props) {
        super(props);
        this.elementId = 'thumbnail-preview-vid'
        this.video = null;
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);

    }


    componentDidMount() {
        this.video = document.getElementById(this.elementId);
        this.video.currentTime = 0;
    }


    handleTimeUpdate(e) {
        e.preventDefault();
        if (this.video.currentTime > 2)
            this.props.setRender()

    }

    render() {
        return (
            <video
                id={this.elementId}
                onTimeUpdate={this.handleTimeUpdate}
                onLoadedData={this.props.setDataloaded}
                className='thumbnail-preview-video-active' muted autoPlay>
                <source src={this.props.video.videoUrl} type="video/mp4" />
            </video>
        )
    }
}

export default ThumbnailPreviewVideo;