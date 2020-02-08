import React, { memo } from 'react';
import ThumbnailUploadButton from './thumbnail_upload_button';
import { withUploadPageContext } from './upload_page_context';
import Styled from 'styled-components';
import { InfoWrapper, SpinnerContainer, MediaBox } from './styles';
import { CenterFlex } from '../common/flex_styles';

const Thumbnail = props => {
  return (
    <Wrapper>
      <InfoWrapper>
        <h1>Thumbnail</h1>
        <span>
          Thumbnail is extracted from your video. You're free to choose your own.
        </span>
      </InfoWrapper>
      {
        props.videoAttr.thumbnailUrl ?
          <ImgWrapper><img src={props.videoAttr.thumbnailUrl} /></ImgWrapper>
          :
          <SpinnerContainer> <div className='spinner' /></SpinnerContainer>
      }
      <ThumbnailUploadButton isUploading={props.isUploading} />
    </Wrapper>
  )
}

const Wrapper = Styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    width: 200px;
    margin-top: 30px;
`

const ImgWrapper = Styled.div`
    ${CenterFlex};
    ${MediaBox};
    background-size: 100%;
    border: 1px solid lightgray;
    & > img {
      width: inherit;
      height: inherit;
    }
`




export default withUploadPageContext(memo(Thumbnail));