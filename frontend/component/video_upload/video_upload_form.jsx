import React from 'react';
import PreviewVideo from './preview_video';


// Don't classify this.
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
        return <div className='preview-ui pv-u-play flexh-1'
          onClick={this.handlePlay} > <i className="fas fa-play-circle"></i></div>
      case 'PLAY':
        return <div className='preview-ui pv-u-pause flexh-1'
          onClick={this.handlePlay} > <i className="fas fa-pause-circle"></i></div>
      case 'END':
        return <div className='preview-ui pv-u-end flexh-1'
          onClick={this.handlePlay} > <i className="fas fa-undo-alt"></i></div>
    }
  }

  previewVideo() {
    const previewUI = this.getPreviewUi();
    return (
      this.props.fileUrl ?
        <div className='upld-vid-ctn'>
          <video ref={this.vid}
            onEnded={this.handleEnded}>
            <source src={this.props.fileUrl} type='video/mp4' />
          </video>
          {previewUI}
        </div>
        : <div className='ld-vid flexv-1'>
          <div className='spinner' />
        </div>
    )
  }

  publishButton() {
    const ready = this.props.thumbnailUrl && this.props.fileUrl && this.props.title && this.props.description;
    return <button className='upld-btn'
      className={`sbmt-btn upld-btn flexh-3${(ready && !this.props.uploading) ? " enabled" : " disabled"}`}
      onClick={this.props.handleSubmit}>
      <span className='pbsh-sp flexh-1'>
        {this.props.uploading ? 'Uploading' : 'Upload'}</span>
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
          <div className='tbn-img flexh-1'>
            <img src={this.props.thumbnailUrl} />
          </div>
          :
          <React.Fragment>
            <PreviewVideo
              fileUrl={this.props.fileUrl}
              handleThumbnail={this.props.handleThumbnail} />
            <div className='ld-tbn flexh-1'>
              <div className='spinner' />
            </div>
          </React.Fragment>
      )
    else
      return <div className='ld-tbn flexh-1'> <div className='spinner' /></div>
  }

  uploadButton() {
    const state = this.props.fileUrl && this.props.thumbnailUrl;

    return (
      <label
        className={`lbl-upld-btn flexh-1${state ? ' enabled' : ' disabled'}`}>
        <input onChange={this.props.handleThumbnailUpload}
          type='file'
          disabled={!state}
          accept="image/*" />Upload Own Thumbnail
            </label>
    )

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
      <form className='vid-sbmt-frm'>
        <div className='vsf-col-1 flexv-3'>
          <div className='flexv-5' style={{ marginTop: '8px' }}>
            <span className='tag-14 dark' style={{ fontSize: '14px' }}>Preview</span>
            {this.previewVideo()}
            <span style={{ fontSize: '14px' }}>
              <span className='tag-14 dark' >Video Status</span>
              {this.statusSpan()}
            </span>
          </div>

          <div className='flexv-3' style={{ marginTop: '50px' }}>
            <div className='flexv-5'>
              <span className='tag-14 dark' style={{ fontSize: '14px' }}>Video Thumbnail</span>
              {this.videoThumbnail()}
            </div>
            <div className='upld-tbn-ctn flexv-4'>
              {this.uploadButton()}
            </div>
          </div>
        </div>

        <div className='vsf-col-2'>
          <div className='flexh-1'> {this.publishButton()}</div>
          <div className='flexv-3'>
            <label className='adfx'>
              <span className={`label ${(this.state.titleFocus || this.props.title.length) ? 'ipt-fcs' : ""}`}>
                Title
                            </span>
              <input
                className='input-style-1'
                onFocus={this.toggleFocus("titleFocus")}
                onBlur={this.toggleFocus("titleFocus")}
                disabled={this.props.uploading}
                onChange={this.props.handleTypeEvent('title')}
                style={{ fontSize: '16px', height: '20px', width: 'calc(100% - 11px)' }}
                type='text'
                value={this.state.title} />
            </label>

            <label className='adfx'>
              <span className={`label ${(this.state.descriptionFocus || this.props.description.length) ? 'ipt-fcs' : ""}`}>
                Description
                            </span>
              <textarea
                className='vid-upld-desc input-style-1'
                onFocus={this.toggleFocus("descriptionFocus")}
                onBlur={this.toggleFocus("descriptionFocus")}
                disabled={this.props.uploading}
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