import React from 'react';
import TopNavContainer from '../nav-bars/top_nav_container';
import PreviewVideo from './video_upload_sub/preview_video';
import VideoUploadArea from './video_upload_sub/vid_upload_area';



class UploadVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            fileUrl: null,
            thumbnail: null,
            thumbnailUrl: null,
            uploadForm: false,
        }


        this.handleToggled = this.handleToggled.bind(this)
        this.handleFile = this.handleFile.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }


    handleToggled(e) {
        e.preventDefault();
    }

    handleThumbnail(thumbnail, thumbnailUrl) {
        this.setState({ thumbnail, thumbnailUrl });
    }


    handleFile(e) {
        e.preventDefault();
        this.setState({ uploadForm: true })

        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () =>
            this.setState({ file, fileUrl: fileReader.result })

        if (file)
            fileReader.readAsDataURL(file);
    }

    handleDrop(e) {
        e.preventDefault();
        this.setState({ uploadForm: true })

        const file = e.dataTransfer.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            //debugger
            this.setState({ file, fileUrl: fileReader.result })
        }

        if (file)
            fileReader.readAsDataURL(file);

    }


    handleSubmit(e) {
        e.preventDefault();
        debugger
    }

    render() {
        return (
            <div id='main-nav-div'>
                <div id='nav-bar-hook'>
                    <div id='main-nav-bars-ctn'>
                        <div id='top-nav-ctn'>
                            <TopNavContainer handleToggled={this.handleToggled} />
                        </div>
                    </div>
                </div>
                <div id='upload-body'>
                    {
                        this.state.uploadForm ?

                            <form onSubmit={this.handleSubmit} id="video-submit-form">
                                <div id='video-submit-form-col-1'>
                                    <div>
                                        {
                                            this.state.file ?
                                                <video controls >
                                                    <source src={this.state.fileUrl} type="video/mp4" />
                                                </video> : <div id='loading-video'><div className="spinner"></div> </div>
                                        }
                                        <span>
                                            Video Status: { this.state.file && this.state.thumbnail ? "Ready" : "Pending"}
                                        </span>
                                    </div>
                                </div>



                                <div id='video-submit-form-col-2'>
                                    <div id='video-submit-button-ctn'>
                                        <button>Publish</button>
                                    </div>

                                    <div id='video-submit-form-lower-section'>
                                        <input type='text' placeholder='Title' />

                                        <textarea placeholder="Description" rows='10'/>

                                        <div id="thumbnail-section">
                                            Video thumbnail:
                                            {
                                                this.state.file ?
                                                    this.state.thumbnailUrl ?
                                                        <div id="thumbnail-img">
                                                            <img  src={this.state.thumbnailUrl} />
                                                        </div>
                                                        :
                                                        <>
                                                            <PreviewVideo
                                                                fileUrl={this.state.fileUrl}
                                                                handleThumbnail={this.handleThumbnail} />

                                                            <div id='loading-thumbnail'>
                                                                <div className='spinner'></div>
                                                            </div>
                                                        </>
                                                    :
                                                    <div id='loading-thumbnail'>
                                                        <div className='spinner'></div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                            :
                            <VideoUploadArea
                                handleDrop={this.handleDrop}
                                handleFile={this.handleFile} />
                    }
                </div>
            </div>
        )
    }
}





export default UploadVideo;