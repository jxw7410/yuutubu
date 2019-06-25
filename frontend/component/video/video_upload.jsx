import React from 'react';
import VideoUploadArea from './video_upload_sub/vid_upload_area';
import VideoUploadForm from './video_upload_sub/video_upload_form';
import {withRouter} from 'react-router-dom';

class UploadVideo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            fileUrl: null,
            thumbnail: null,
            thumbnailUrl: null,
            duration: null,
            title: "",
            description: "",
            uploadForm: false,
            uploading: false,
            doneUploading: false,
        }


        this.handleToggled = this.handleToggled.bind(this)
        this.handleFile = this.handleFile.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTypeEvent = this.handleTypeEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleThumbnailUpload = this.handleThumbnailUpload.bind(this);
    }

    componentDidMount(){
        this.props.sideBarTwo();
        this.props.removeVideoPlayer();
    }

    handleToggled(e) {
        e.preventDefault();
    }

    

    handleThumbnail(thumbnail, thumbnailUrl, duration) {
        this.setState({ thumbnail, thumbnailUrl, duration });
    }

    handleTypeEvent(field) {
        return e => {
            e.preventDefault();
            const text = e.target.value;
            this.setState({ [field]: text })
        }
    }


    handleThumbnailUpload(e){
        e.preventDefault();
        const thumbnail = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () =>
            this.setState({ thumbnail, thumbnailUrl: fileReader.result })

        if (thumbnail)
            fileReader.readAsDataURL(thumbnail);
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
            this.setState({ file, fileUrl: fileReader.result })
        }

        if (file)
            fileReader.readAsDataURL(file);

    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.state.file && this.state.thumbnail && this.state.title.length > 0 && this.state.description.length > 0) {
            const formData = new FormData();
            formData.append('video[thumbnail]', this.state.thumbnail);
            formData.append('video[file]', this.state.file);
            formData.append('video[duration]', this.state.duration);
            formData.append('video[title]', this.state.title);
            formData.append('video[description]', this.state.description);
            formData.append('video[channel_id]', this.props.user.channel_id);
            this.props.createVideo(formData)
                .then(() =>{
                    this.props.history.push(`./channel/${this.props.user.channel_id}/videos`)
                })
                .fail(()=>{
                    alert('Upload failed!')
                    this.props.history.push('/');
                });

            this.setState({ uploading: true })
        }
        else
            console.log('No Token!');
    }

    render() {
        return (
            <>
                    <div id='upload-body'>{
                        this.state.uploadForm ?
                            <VideoUploadForm
                                fileUrl={this.state.fileUrl}
                                thumbnailUrl={this.state.thumbnailUrl}
                                handleThumbnail={this.handleThumbnail}
                                handleThumbnailUpload={this.handleThumbnailUpload}
                                handleSubmit={this.handleSubmit}
                                handleTypeEvent={this.handleTypeEvent}
                                uploading={this.state.uploading}
                                doneUploading={this.state.doneUploading}
                                title={this.state.title}
                                description={this.state.description}
                            />
                            :
                            <VideoUploadArea
                                handleDrop={this.handleDrop}
                                handleFile={this.handleFile} />
                    }
                    </div>
            </>
        )
    }
}





export default withRouter(UploadVideo);