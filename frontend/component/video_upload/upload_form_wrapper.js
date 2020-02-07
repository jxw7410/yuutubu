import React from 'react';
import Styled from 'styled-components';
import SelectedVideo from './selected_video';

function UploadFormWrapper(props){
  return(
    <Wrapper>
      <WrapperCol1>
        <SelectedVideo />
      </WrapperCol1>
    </Wrapper>
  )
}


const Wrapper = Styled.div`
  display: grid;
  grid-template-columns: 230px auto;
  position: relative;
  margin-top: 70px;
  min-height: 450px;
  width: 800px;
  box-shadow: 0px 0px 3px gray;
  background: white;
`

const WrapperCol1 = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

export default UploadFormWrapper;

