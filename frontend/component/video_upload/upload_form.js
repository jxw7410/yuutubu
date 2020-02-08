import React, { useRef, useState, useEffect } from 'react';
import Styled from 'styled-components';
import SelectedVideo from './selected_video';
import Thumbnail from './thumbnail';
import { trimContentEditor } from '../../util/selectors';
import { uploadToS3 } from './s3';
import FormInputs from './form_inputs';
import DOMPurify from 'dompurify';

function UploadForm(props) {
  const sentDataRef = useRef(null);
  const totalDataRef = useRef(null);
  const [uploadedPercent, setUploadedPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: ""
  });
  const disabled = isUploading || !(formInputs.title.length && formInputs.description.length);

  useEffect(() => {
    if (isUploading) uploadVideo();
  }, [isUploading])

  const getDirectUploadUrl = () => {
    const formData = new FormData();
    formData.append('video[file]', props.videoAttr.video);
    formData.append('video[thumbnail]', props.videoAttr.thumbnail);
    return props.requestDirectUpload(formData);
  }

  const handleFailedUpload = () => {
    props.openModal({
      type: 'UPLOAD',
      payload: {
        message: 'Upload has failed',
        callback: () => window.location.reload(false),
      }
    })
  }

  const progressHandler = () => {
    const xhr = new XMLHttpRequest();
    let prevSentData = 0;
    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        sentDataRef.current = sentDataRef.current + (e.loaded - prevSentData);
        prevSentData = e.loaded;
        setUploadedPercent(Math.floor(sentDataRef.current * 100 / totalDataRef.current));
      }
    });
    return xhr;
  }

  const uploadVideo = async () => {
    try {
      const { imageBlob, videoBlob } = await getDirectUploadUrl();
      const { video, thumbnail } = props.videoAttr;
      try {
        await Promise.all([
          uploadToS3(videoBlob, video, progressHandler),
          uploadToS3(imageBlob, thumbnail, progressHandler)
        ])
      } catch { // if upload fails, we wiped the relation in our db
        props.deleteDirectUpload({
          blob_ids: {
            image_blob_id: imageBlob.id,
            video_blob_id: videoBlob.id,
          }
        });
      }
      createVideo(videoBlob.id, imageBlob.id);
    } catch { handleFailedUpload(); }
  }

  const createVideo = (videoId, thumbnailId) => {
    props.createVideo({
      video: {
        title: formInputs.title,
        description: formInputs.description,
        duration: props.videoAttr.duration,
        video_id: videoId,
        thumbnail_id: thumbnailId,
      }
    })
      .then(() => {
        props.openModal({
          type: 'UPLOAD',
          payload: {
            message: 'Upload is successful!',
            callback: () => props.history.push(`./channel/${props.user.channel_id}/videos`)
          }
        })
      })
      .fail(err => handleFailedUpload())
  }

  const handleUpload = e => {
    e.preventDefault();
    const { video, thumbnail } = props.videoAttr;
    const readyToUpload = video && thumbnail && formInputs.title.length && formInputs.description.length;
    if (readyToUpload && !isUploading) {
      totalDataRef.current = video.size + thumbnail.size;
      setIsUploading(true);
    }
  };

  const handleTitleChange = e => {
    e.preventDefault();
    const title = e.currentTarget.value;
    if (title.length <= 100)
      setFormInputs({ ...formInputs, title });
  }

  const handleDescriptionChange = e => {
    e.preventDefault();
    if (!isUploading) {
      const html = e.currentTarget.innerHTML;
      const expression = '<div><br></div>';
      setFormInputs({
        ...formInputs,
        description: DOMPurify.sanitize(trimContentEditor(html, expression))
      });
    }
  };

  return (
    <Wrapper>
      <WrapperRow1>Video Upload</WrapperRow1>
      <WrapperRow2>
        <WrapperRow1Col1>
          <SelectedVideo />
          <Thumbnail isUploading={isUploading} />
        </WrapperRow1Col1>
        <FormInputs
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          isUploading={isUploading}
          title={formInputs.title}
        />
      </WrapperRow2>
      <WrapperRow3>
        <ProgressBarContainer isUploading={isUploading}>
          <span>{`Progress: ${uploadedPercent}%`}</span>
          <div style={{ width: `${uploadedPercent}%` }} />
        </ProgressBarContainer>
        <UploadButton
          isDisabled={disabled}
          disabled={disabled}
          onClick={handleUpload}>
          Upload
        </UploadButton>
      </WrapperRow3>
    </Wrapper>
  )
}


const Wrapper = Styled.form`
  display: grid;
  grid-template-rows: 50px auto 60px;
  position: relative;
  margin-top: 70px;
  min-height: 450px;
  width: 800px;
  box-shadow: 0px 0px 3px gray;
  background: white;
`

const WrapperRow1 = Styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
`;

const WrapperRow1Col1 = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const WrapperRow2 = Styled.div`
  display: grid;
  grid-template-columns: 230px auto;
`;

const WrapperRow3 = Styled.div`
  display flex;
  justify-content:space-between;
  align-items: center;
  padding: 15px;
`

const ProgressBarContainer = Styled.div`
  position: relative;
  border: 1px solid gray;
  border-radius: 5px;
  width: 80%;
  height: 100%;

  & > span {
    position: absolute;
    top: -14px;
    font-size:12px;
    color: ${props => props.isUploading ? 'royalblue' : 'gray'}
  }

  & > div{
    height: inherit;
    transition: width 0.1s linear;
    background: royalblue;
  }
`

const UploadButton = Styled.button`
  position: relative;
  padding: 10px 15px;
  border: none;
  background: ${ props => props.isDisabled ? 'lightgray' : 'royalblue'};
  border-radius: 5px;
  color: white;
  font-size: 16px;

  &:hover{
    cursor: pointer;
    opacity: ${ props => props.isDisabled ? '1' : '0.7'};
  }

  &:active{
    top: ${ props => props.isDisabled ? '0px' : '2px'};
  }

  &:focus{
    outline: none;
  }
`



export default UploadForm;

