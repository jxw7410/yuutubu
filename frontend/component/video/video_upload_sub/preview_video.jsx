import React from 'react';


class PreviewVideo extends React.Component {
    constructor(props) {
        super(props)
        this.capture = this.capture.bind(this)
        this.canvas = React.createRef();
        this.video = React.createRef();
    }


    componentDidMount() {
        setTimeout(() => {
            this.capture()
        }, 1500);

    }


    capture() {
        const duration = this.video.current.duration;
        this.canvas.current.width = this.video.current.videoWidth;
        this.canvas.current.height = this.video.current.videoHeight;
        this.canvas.current.getContext('2d')
            .drawImage(this.video.current, 0, 0, this.video.current.videoWidth, this.video.current.videoHeight);

        this.canvas.current.toBlob(blob => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                this.props.handleThumbnail(blob, fileReader.result, duration)
            }
            fileReader.readAsDataURL(blob);
        })

    }


    render() {
        return (
            <>
                <video ref={this.video} id='preview-video' muted >
                    <source src={this.props.fileUrl} type="video/mp4" />
                </video>
                <canvas  ref={this.canvas} id="capture-canvas" />
            </>
        )
    }
}

export default PreviewVideo;