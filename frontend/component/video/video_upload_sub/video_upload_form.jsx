import React from 'react';
import PreviewVideo from './preview_video';

class VideoUploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoStatus: 'PAUSE',
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
                        <div className='spinner'/> 
                    </div>
        )
    }

    publishButton() {
        const ready = this.props.thumbnailUrl && this.props.fileUrl && this.props.title && this.props.description

        if (this.props.uploading)
            return <div className='upload-bar'> 
            <div  className='upload-bar-progress'
                style={{ width: `${this.props.uploadPercentage}%` }}
            />
            </div>
        else
            if (this.props.doneUploading)
                return <h1>Video Upload Successful!</h1>
            else 
                return <button 
                        className={`submit-button${ ready ? " enabled" : " disabled"}`}
                        onClick={this.props.handleSubmit}>Publish</button>
            
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
                            handleThumbnail={this.props.handleThumbnail}/>
                        <div id='loading-thumbnail' className='flex-hzntal-ctr-all'> 
                            <div className='spinner' /> 
                        </div>
                    </>
            )
        else
            return <div id='loading-thumbnail' className='flex-hzntal-ctr-all'> 
                        <div className='spinner'/>
                    </div>
    }

    uploadButton(){
        const state = this.props.fileUrl && this.props.thumbnailUrl;

        return  <label 
                    className={`label-upload-btn flex-hzntal-ctr-all${state ? ' enabled' : ' disabled'}`}>
                    <input onChange={this.props.handleThumbnailUpload} 
                    type='file' 
                    disabled = {!state}
                    accept="image/*" />Upload Own Thumbnail
                </label> 
        
    }

    statusSpan(){
        return (
            this.props.fileUrl && this.props.thumbnailUrl ?
                <span style={{ color: 'green' }}>Ready</span> 
                :
                <span style={{ color: 'red' }}>Pending</span>
        )
    }


    render() {
        return (
            <form id='video-submit-form'>
                <div id='vsf-col-1'>
                    <div className='flex-vert'>
                        {this.previewVideo()}
                        <span> Video Status: {this.statusSpan()} </span>
                    </div>
                </div>
            
                <div id='vsf-col-2'>
                    <div className='flex-hzntal-ctr-all'> {this.publishButton()}</div>

                    <div id='vsf-lower-section' className='flex-vert'>
                        <input 
                            className='input-style-1'
                            onChange={this.props.handleTypeEvent('title')} 
                            type='text' 
                            placeholder='Title (required)' />

                        <textarea
                            className='input-style-1'
                            onChange={this.props.handleTypeEvent('description')}
                            placeholder="Description (required)"
                            rows='10' />

                        <div id='thumbnail-section' className='flex-hzntal-ctr-2'>
                            <div className='flex-vert'> Video Thumbnail:{this.videoThumbnail()} </div>
                            <div id='upload-thumbnail-ctn' className= 'flex-vert'> 
                                {this.uploadButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default VideoUploadForm;