import React from 'react';
import { VideoUploadContext } from './video_upload';
import { VideoUploadFormContext } from './video_upload_form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  createVideo,
  requestDirectUpload,
  deleteDirectUpload
} from '../../actions/video/video_action';


const PublishButton = props => {
  const currentProgress = React.useRef(0);
  const totalProgress = React.useRef(0);
  const { videoMetaState } = React.useContext(VideoUploadContext);
  const { isUploading, setIsUploading } = React.useContext(VideoUploadFormContext);
  const [uploadPercent, setUploadPercent] = React.useState(0);

  const readyToUpload = (
    videoMetaState.thumbnailUrl &&
    videoMetaState.videoUrl &&
    props.videoText.videoTitle.length &&
    props.videoText.videoDescription.length
  );

  function redirectOnFail() {
    alert('Upload Failed');
    window.location.reload(false);
  }

  async function createVideo(videoId, imageId) {
    try {
      await props.createVideo({
        'video': {
          'title': props.videoText.videoTitle,
          'description': props.videoText.videoDescription,
          'duration': videoMetaState.duration,
          'video_id': videoId,
          'thumbnail_id': imageId
        }
      })
    } catch (err) { return redirectOnFail(); }
    setTimeout(() => {
      alert('Upload Successful!');
      props.history.push(`./channel/${props.user.channel_id}/videos`);
    }, 110)
  }

  function uploadProgressHandler() {
    const xhr = new XMLHttpRequest();
    let previousProgress = 0;
    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        currentProgress.current = currentProgress.current + (e.loaded - previousProgress);
        previousProgress = e.loaded;
        setUploadPercent(currentProgress.current * 100 / totalProgress.current);
      }
    });
    return xhr;
  }

  function uploadToCloudStorage(blob, fileType) {
    const data = videoMetaState[fileType];
    return new Promise((resolve, reject) => {
      $.ajax({
        xhr: uploadProgressHandler,
        url: blob.direct_upload.url,
        type: 'PUT',
        headers: blob.direct_upload.headers,
        contentType: data.type,
        data,
        cache: false,
        processData: false,
      })
        .then(() => resolve())
        .fail(err => reject(err))
    })
  }

  function requestDirectUploadURL() {
    const formData = new FormData();
    formData.append('video[file]', videoMetaState.video);
    formData.append('video[thumbnail]', videoMetaState.thumbnail);
    return props.requestDirectUpload(formData);
  }

  async function uploadVideo(e) {
    if (!readyToUpload || isUploading) return;
    setIsUploading(true);
    try {
      const { image_blob, video_blob } = await requestDirectUploadURL();
      totalProgress.current = videoMetaState.video.size + videoMetaState.thumbnail.size;
      try {
        await Promise.all([
          uploadToCloudStorage(video_blob, 'video'),
          uploadToCloudStorage(image_blob, 'thumbnail')
        ]);
      } catch (err) {
        props.deleteDirectUpload({
          'blob_ids': {
            'image_blob_id': image_blob.id,
            'video_blob_id': video_blob.id,
          }
        });
        throw err;
      }
      createVideo(video_blob.id, image_blob.id);
    } catch (err) {
      return redirectOnFail();
    }
  }

  return (
    <button
      onClick={uploadVideo}
      className={[
        'upld-btn',
        'sbmt-btn',
        'flexh-3',
        readyToUpload && !isUploading ? "enabled" : 'disabled'
      ].join(" ")}>
      <span className='pbsh-sp flexh-1'>
        {isUploading ? `Uploading ${parseInt(uploadPercent)}%` : "Upload"}
      </span>
      {
        isUploading ?
          <div className='upload-bar'>
            <div
              style={{ width: `${uploadPercent}%` }}
              className='upload-bar-progress'
            />
          </div> : null
      }
    </button>
  )
}

const msp = state => ({
  user: state.session
})
const mdp = dispatch => ({
  createVideo: videoPayload => dispatch(createVideo(videoPayload)),
  requestDirectUpload: file => dispatch(requestDirectUpload(file)),
  deleteDirectUpload: blob_ids => dispatch(deleteDirectUpload(blob_ids)),
})

export default withRouter(connect(msp, mdp)(PublishButton));