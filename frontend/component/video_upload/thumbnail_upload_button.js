import React, { memo } from 'react';
import Styled from 'styled-components';
import { withUploadPageContext } from './upload_page_context';
import { readFile } from './helpers';
import { centerFlex } from '../common/flex_styles';

function ThumbnailUploadButton(props) {
  const isEnabled = !props.isUploading && props.videoAttr.thumbnail;

  const fileUploadCB = (file, fileReader) => () => {
    const {videoAttr, setVideoAttr} = props;
    setVideoAttr({
      ...videoAttr,
      thumbnail: file,
      thumbnailUrl: fileReader.result,
    });
  }

  const uploadThumbnail = e => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    readFile(file, fileUploadCB);
  }

  return (
    <Wrapper>
      <UploadInput isEnabled={isEnabled}>
        Upload Thumbnail
        <input 
          onChange={uploadThumbnail}
          type='file'
          disabled={!isEnabled}
          accept="image/*"
        /> 
      </UploadInput>
    </Wrapper>
  )
}


const Wrapper = Styled.div`
  display: flex;
  flex-direction: column;
  height: 30px;
  width: 100%;
  &  input[type='file'] {
    display: none;
  }
`


const UploadInput = Styled.label`
    ${centerFlex};
    height: inherit;
    width: inherit;
    color: ${props => props.isEnabled ? 'gray' : 'lightgray'};
    font-size: 14px;
    background: #eaeaea;
    
    &:hover{
      cursor: ${props => props.isEnabled ? 'pointer' : 'no-drop'};
    }
`


export default withUploadPageContext(memo(ThumbnailUploadButton));