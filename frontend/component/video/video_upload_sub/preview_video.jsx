import React from 'react';


class PreviewVideo extends React.Component {
    constructor(props) {
        super(props)
        this.capture = this.capture.bind(this)

    }


    componentDidMount() {
        const canvas = document.getElementById('capture-canvas');
        const video = document.getElementById('preview-video');
        
        setTimeout(() => {
            this.capture(canvas, video)
        }, 1500);


    }


    capture(canvas, video) {
        const duration = video.duration;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        canvas.toBlob(blob => {
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
                <video id='preview-video' muted >
                    <source src={this.props.fileUrl} type="video/mp4" />
                </video>
                <canvas id="capture-canvas" />
            </>
        )
    }
}

export default PreviewVideo;