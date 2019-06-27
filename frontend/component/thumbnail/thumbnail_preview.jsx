import React from 'react';

class ThumbnailPreviewVideo extends React.Component {
    constructor(props) {
        super(props);
        this.elementId = 'thumbnail-preview-vid'
        this.video = React.createRef();
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);

    }


    componentDidMount() {
        this.video.current.currentTime = 0;
    }


    handleTimeUpdate(e) {
        e.preventDefault();
        if (this.video.current.currentTime > 3){
            this.video.current.pause();
            this.props.setRender();
        }

    }

    render() {
        return (
            <video
                id={this.elementId}
                ref={this.video}
                onTimeUpdate={this.handleTimeUpdate}
                onLoadedData={this.props.setDataloaded}
                className='thumbnail-preview-video-active' muted autoPlay>
                <source src={this.props.video.videoUrl} type="video/mp4" />
            </video>
        )
    }
}

export default ThumbnailPreviewVideo;