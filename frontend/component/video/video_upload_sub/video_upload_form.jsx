import React from 'react';
import PreviewVideo from './preview_video';

class VideoUploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoStatus: 'PAUSE',
            titleFocus: false,
            descriptionFocus: false,
        }

        this.vid = React.createRef();
        this.handlePlay = this.handlePlay.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
    }

    handlePlay(e) {
        e.preventDefault();
        if (this.state.videoStatus === 'PAUSE') {
            this.vid.current.play();
            this.setState({ videoStatus: 'PLAY' })
        } else if (this.state.videoStatus === 'PLAY') {
            this.vid.current.pause();
            this.setState({ videoStatus: 'PAUSE' })
        } else if (this.state.videoStatus === 'END') {
            this.vid.current.currentTime = 0;
            this.vid.current.play();
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
                return <div id='preview-ui-play'
                    className='preview-ui flex-hzntal-ctr-all'
                    onClick={this.handlePlay} > <i className="fas fa-play-circle"></i></div>
            case 'PLAY':
                return <div id='preview-ui-pause'
                    className='preview-ui flex-hzntal-ctr-all'
                    onClick={this.handlePlay} > <i className="fas fa-pause-circle"></i></div>
            case 'END':
                return <div id='preview-ui-end'
                    className='preview-ui flex-hzntal-ctr-all'
                    onClick={this.handlePlay} > <i className="fas fa-undo-alt"></i></div>
        }
    }

    previewVideo() {
        const previewUI = this.getPreviewUi();
        return (
            this.props.fileUrl ?
                <div id='uploaded-vid-container'>
                    <video id='uploaded-vid-preview'
                        ref={this.vid}
                        onEnded={this.handleEnded}>
                        <source src={this.props.fileUrl} type='video/mp4' />
                    </video>
                    {previewUI}
                </div>
                : <div id='loading-video'
                    className='flex-vert-ctr-all'>
                    <div className='spinner' />
                </div>
        )
    }

    publishButton() {
        const ready = this.props.thumbnailUrl && this.props.fileUrl && this.props.title && this.props.description
        return <button id='upload_button'
            className={`submit-button flex-hzntal-ctr-2${(ready && !this.props.uploading) ? " enabled" : " disabled"}`}
            onClick={this.props.handleSubmit}>
            <span className='flex-hzntal-ctr-all'
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    fontSize: '16px',
                    zIndex: '1',
                }}>{this.props.uploading ? 'Uploading' : 'Upload'}</span>
            {
                this.props.uploading ?
                    <div className='upload-bar'>
                        <div className='upload-bar-progress' style={{ width: `${this.props.uploadPercentage}%` }} />
                    </div> : null
            }
        </button>

    }


    videoThumbnail() {
        if (this.props.fileUrl)
            return (
                this.props.thumbnailUrl ?
                    <div id='thumbnail-img' className='flex-hzntal-ctr-all'>
                        <img src={this.props.thumbnailUrl} />
                    </div>
                    :
                    <>
                        <PreviewVideo
                            fileUrl={this.props.fileUrl}
                            handleThumbnail={this.props.handleThumbnail} />
                        <div id='loading-thumbnail' className='flex-hzntal-ctr-all'>
                            <div className='spinner' />
                        </div>
                    </>
            )
        else
            return <div id='loading-thumbnail' className='flex-hzntal-ctr-all'>
                <div className='spinner' />
            </div>
    }

    uploadButton() {
        const state = this.props.fileUrl && this.props.thumbnailUrl;

        return <label
            className={`label-upload-btn flex-hzntal-ctr-all${state ? ' enabled' : ' disabled'}`}>
            <input onChange={this.props.handleThumbnailUpload}
                type='file'
                disabled={!state}
                accept="image/*" />Upload Own Thumbnail
                </label>

    }

    statusSpan() {
        return (
            this.props.fileUrl && this.props.thumbnailUrl ?
                <span style={{ color: 'green' }}> Ready</span>
                :
                <span style={{ color: 'red' }}> Pending</span>
        )
    }

    toggleFocus(field) {
        return e => {
            const bool = this.state[field]
            this.setState({ [field]: !bool })
        }
    }


    render() {
        return (
            <form id='video-submit-form'>
                <div id='vsf-col-1' className='flex-vert-ctr-2'>
                    <div className='flex-vert-start-1' style={{ marginTop: '8px' }}>
                        <span className='tag-14 dark' style={{ fontSize: '14px' }}>Preview</span>
                        {this.previewVideo()}
                        <span style={{ fontSize: '14px' }}> 
                            <span className='tag-14 dark' >Video Status</span>
                            {this.statusSpan()}
                        </span> 
                    </div>

                    <div id='thumbnail-ctn' className='flex-vert-ctr-2'>
                        <div className='flex-vert-start-1'>
                            <span className='tag-14 dark' style={{ fontSize: '14px' }}>Video Thumbnail</span>
                            {this.videoThumbnail()}
                        </div>
                        <div id='upload-thumbnail-ctn' className='flex-vert'>
                            {this.uploadButton()}
                        </div>
                    </div>
                </div>

                <div id='vsf-col-2'>
                    <div className='flex-hzntal-ctr-all'> {this.publishButton()}</div>

                    <div id='vsf-lower-section' className='flex-vert-ctr-2'>

                        <label className='adfx'>
                            <span className={`label ${(this.state.titleFocus || this.props.title.length) ? ' inputFocused' : ""}`}>
                                Title
                            </span>
                            <input
                                className='input-style-1'
                                onFocus={this.toggleFocus("titleFocus")}
                                onBlur={this.toggleFocus("titleFocus")}
                                onChange={this.props.handleTypeEvent('title')}
                                style={{ fontSize: '16px', height: '20px', width: 'calc(100% - 11px)' }}
                                type='text'
                                value={this.state.title} />
                        </label>

                        <label className='adfx'>
                            <span className={`label ${(this.state.descriptionFocus || this.props.description.length) ? ' inputFocused' : ""}`}>
                                Description
                            </span>
                            <textarea
                                id='vid-upload-desc'
                                className='input-style-1'
                                onFocus={this.toggleFocus("descriptionFocus")}
                                onBlur={this.toggleFocus("descriptionFocus")}
                                onChange={this.props.handleTypeEvent('description')}
                                style={{ fontSize: '16px', height: '100%', width: 'calc(100% - 11px)' }}
                                rows='10' />
                        </label>
                    </div>
                </div>
            </form>
        )
    }

}

export default VideoUploadForm;