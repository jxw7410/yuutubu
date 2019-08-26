import React, { useEffect } from 'react';

const PreviewVideo = props => {
    // Differs from createRef, whereas createRef is used with constructors.
    const canvasRef = React.useRef();
    const videoRef = React.useRef();


    // Functions like Component Did Mount
    useEffect(() => { 
        setTimeout(() => captureImage(), 1500) 
    }, [])

    // Captures Image at 1.5s
    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')
            .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        canvas.toBlob(blob => {
            const fileReader = new FileReader();

            fileReader.onloadend = () =>
                props.handleThumbnail(blob, fileReader.result, video.duration)

            fileReader.readAsDataURL(blob);
        })
    }


    return (
        <React.Fragment>
            <video ref={videoRef} className='prev-vid' muted>
                <source src={props.fileUrl} type="video/mp4" />
            </video>
            <canvas ref={canvasRef} className='capture-canvas' />
        </React.Fragment>
    )
}

export default PreviewVideo;