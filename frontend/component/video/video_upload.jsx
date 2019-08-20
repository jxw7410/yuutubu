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
            uploadPercentage: 0,
            uploadForm: false,
            uploading: false,
            doneUploading: false,
        }

        this.currentProgress = 0;
        this.totalProgress = 1;

        this.handleFile = this.handleFile.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTypeEvent = this.handleTypeEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleThumbnailUpload = this.handleThumbnailUpload.bind(this);
        this.uploadProgress = this.uploadProgress.bind(this);
        this.submit = false;
        this.willUnmount = false;

    }

    componentDidMount(){
        this.props.sideBarTwo();
        this.props.removeVideoPlayer();
    }


    componentWillUnmount(){
        this.willUnmount = true;
        this.props.updatePrevPath(this.props.match.path);
    }

    handleTypeEvent(field) {
        return e => {
            e.preventDefault();
            const text = e.target.value;
            this.setState({ [field]: text })
        }
    }

    handleThumbnail(thumbnail, thumbnailUrl, duration) {
        this.setState({ thumbnail, thumbnailUrl, duration });
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

    uploadProgress(){
        const xhr = new XMLHttpRequest();
        let previousProgress = 0;
        xhr.upload.addEventListener('progress', e =>{
            if (e.lengthComputable){
                this.currentProgress += (e.loaded - previousProgress)
                previousProgress = e.loaded;
                
                if (!this.willUnmount)
                    this.setState({ uploadPercentage: 
                        parseInt( this.currentProgress * 100 / this.totalProgress)})
            }
        })
        return xhr
    }

    requestUpload(blob, data, contentType){
        return $.ajax({
            xhr: this.uploadProgress,
            url: blob.direct_upload.url,
            type: 'PUT',
            headers: blob.direct_upload.headers,
            contentType,
            data,
            cache: false,
            processData: false
        })
    }


    /* This Upload Promise is to asynchronously upload my files to aws because sync upload is slow AF. */
    upload(blob, type){
        return new Promise((resolve, reject)=> {
            this.requestUpload(blob, this.state[type], this.state[type].type)
                .then(() => resolve())
                .fail(() => reject('Upload Failed'))
        })
    }
    
    redirectOnFail(){
        alert('Upload Failed!')
        this.props.history.push('/');
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.submit && 
            this.state.file &&
            this.state.thumbnail &&
            this.state.title.length &&
            this.state.description.length
        ) {
            const formData = new FormData();
            formData.append('video[file]', this.state.file);
            formData.append('video[thumbnail]', this.state.thumbnail);

            this.submit = true;
            this.props.requestDirectUpload(formData)
                .then((blob) =>{
                    const { image_blob, video_blob } = blob
                    this.totalProgress = this.state.file.size + this.state.thumbnail.size

                    Promise.all([this.upload(video_blob, 'file'), this.upload(image_blob, 'thumbnail')])
                        .then(()=>{
                            this.props.createVideo({
                                "video" : {
                                    "title": this.state.title,
                                    "description": this.state.description,
                                    "channel_id" : this.state.channel_id,
                                    "duration": this.state.duration,
                                    "video_id": video_blob.id,
                                    "thumbnail_id": image_blob.id 
                                }
                            }).then( () =>
                                setTimeout(() => {
                                    alert('Upload Successful!');
                                    this.props.history.push(`./channel/${this.props.user.channel_id}/videos`);
                                    }, 110))
                    }, () => {
                        this.props.deleteDirectUpload({
                            'blob_ids': {
                                'image_blob_id': image_blob.id,
                                'video_blob_id': video_blob.id
                                }
                            }).then(() => this.redirectOnFail())
                        }
                    )
                }).fail(() => this.redirectOnFail());

            this.setState({ uploading: true })
        }
        else
            console.log('No Token!');
    }

    render() {
        return (
            <React.Fragment>
                    <div className ='upld-bd flexv-3'>
                    {
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
                                uploadPercentage={this.state.uploadPercentage}
                                description={this.state.description}
                            />
                            :
                            <VideoUploadArea
                                handleDrop={this.handleDrop}
                                handleFile={this.handleFile} />
                    }
                    </div>
            </React.Fragment>
        )
    }
}



export default withRouter(UploadVideo);