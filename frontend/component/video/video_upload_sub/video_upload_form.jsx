import React from 'react';
import PreviewVideo from './preview_video';
//shady tactc nooooo

class VideoUploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoStatus: 'PAUSE',
        }

        this.handlePlay = this.handlePlay.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
    }

    handlePlay(e) {
        e.preventDefault();
        const vid = document.getElementById('uploaded-vid-preview');
        if (this.state.videoStatus === 'PAUSE') {
            vid.play();
            this.setState({ videoStatus: 'PLAY' })
        } else if (this.state.videoStatus === 'PLAY') {
            vid.pause();
            this.setState({ videoStatus: 'PAUSE' })
        } else if (this.state.videoStatus === 'END') {
            vid.currentTime = 0;
            vid.play();
            this.setState({ videoStatus: 'PLAY' })
        }
    }

    handleEnded(e) {
        e.preventDefault();
        this.setState({ videoStatus: 'END' })
    }

    getPreviewUi() {
        switch (this.state.videoStatus) {
            case 'PAUSE':
                return <div id='preview-ui-play' onClick={this.handlePlay} > <i className="fas fa-play-circle"></i></div>
            case 'PLAY':
                return <div id='preview-ui-pause' onClick={this.handlePlay} > <i className="fas fa-pause-circle"></i></div>
            case 'END':
                return <div id='preview-ui-end' onClick={this.handlePlay} > <i className="fas fa-undo-alt"></i></div>
        }
    }

    render() {
        const previewUI = this.getPreviewUi();

        return (
            <form id='video-submit-form'>
                <div id='video-submit-form-col-1'>
                    <div>{
                        this.props.fileUrl ?
                            <div id='uploaded-vid-container'>
                                <video id='uploaded-vid-preview'
                                    onEnded={this.handleEnded}>
                                    <source src={this.props.fileUrl} type='video/mp4' /></video>
                                {previewUI}
                            </div>
                            : <div id='loading-video'><div className='spinner' /> </div>
                    }

                        <span>
                            Video Status: {
                                this.props.fileUrl && this.props.thumbnailUrl ?
                                    <span style={{ color: 'green' }}>Ready</span> : <span style={{ color: 'red' }}>Pending</span>
                            }
                        </span>
                    </div>
                </div>

                <div id='video-submit-form-col-2'>
                    <div id='video-submit-button-ctn'>

                        {
                            this.props.uploading ?
                                <div id='uploading-spinner'> <div className='spinner' /></div>
                                :

                                this.props.doneUploading ?
                                    <h1>Video Upload Successful!</h1>
                                    :
                                    this.props.thumbnailUrl && this.props.fileUrl && this.props.title && this.props.description ?
                                        <button id='submit-button-enabled'
                                            onClick={this.props.handleSubmit}>Publish</button>
                                        :
                                        <button id='submit-button-disabled' disabled>Publish</button>
                        }</div>

                    <div id='video-submit-form-lower-section'>
                        <input onChange={this.props.handleTypeEvent('title')} type='text' placeholder='Title (required)' />

                        <textarea
                            onChange={this.props.handleTypeEvent('description')}
                            placeholder="Description (required)"
                            rows='10'
                            style={{ resize: "none" }} />

                        <div id='thumbnail-section'>
                            <div>
                                Video Thumbnail:{
                                    this.props.fileUrl ?
                                        this.props.thumbnailUrl ?
                                            <div id='thumbnail-img'>  <img src={this.props.thumbnailUrl} /></div>
                                            :
                                            <>
                                                <PreviewVideo
                                                    fileUrl={this.props.fileUrl}
                                                    handleThumbnail={this.props.handleThumbnail}
                                                />
                                                <div id='loading-thumbnail'> <div className='spinner' /> </div>
                                            </> :
                                        <div id='loading-thumbnail'> <div className='spinner'></div></div>
                                }
                            </div>

                            <div id='upload-thumbnail-ctn'>
                                {
                                    this.props.fileUrl && this.props.thumbnailUrl ?
                                        <label id='label-upload-btn'><input onChange={this.props.handleThumbnailUpload} type='file' accept="image/*" />Upload Own Thumbnail</label>:
                                        <label id='label-upload-btn-disabled'><input disabled type='file' />Upload Own Thumbnail</label>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default VideoUploadForm;