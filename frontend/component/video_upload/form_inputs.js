import React, { useState } from 'react';
import Styled from 'styled-components';
import PublishButton from './publish_button';

function FormInputs(props){
  const [videoText, setVideoText] = useState({
    videoTitle: "",
    videoDescription: "",
  })

  return (
    <Wrapper>
      <CenterFlex>
        <PublishButton
          isUploading={props.isUploading}
          setIsUploading={props.setIsUploading}
          videoText={videoText}
        />
      </CenterFlex>
      <VertStartCenterFlex>

      </VertStartCenterFlex>
    </Wrapper>
  )
}

const Wrapper = Styled.div`
  display: grid;
  grid-template-rows: 110px auto;
`

const CenterFlex = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const VertStartCenterFlex = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`




export default FormInputs;