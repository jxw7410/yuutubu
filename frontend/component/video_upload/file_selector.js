import React, {memo} from 'react';
import Styled from 'styled-components';
import { centerFlex } from '../common/flex_styles';

function FileSelector({handleFileUpload}){
  const preventDefault = e => e.preventDefault();
  
  return (
    <Wrapper
      onDrop={handleFileUpload}
      onDragEnter={preventDefault}
      onDragOver={preventDefault}
      onDragLeave={preventDefault}
    >
    <FileInputWrapper>
      <input
        onChange={handleFileUpload}
        type='file'
        accept='video/*'
      />
      <i className='fas fa-arrow-up' />
      <span>Upload File</span>
      <span>Or Drag and Drop</span>
    </FileInputWrapper>
    </Wrapper>
  )
}



const Wrapper = Styled.div` 
  ${centerFlex}
  position: relative;
  top: 70px;
  height: 390px;
  width: 745px;
  box-shadow: 0px 0px 3px gray;
  background: white;
`

const FileInputWrapper = Styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 40%;

  & .fa-arrow-up{
    font-size: 50px;
    font-weight: bold;
    padding: 10px 20px 0px 20px;
    background: rgb(204, 204, 204);
    border-radius: 10px;
    color: white;
  }

  & > input[type='file']{
    display: none;
  }

  &:hover{
    cursor: pointer;
    .fa-arrow-up {
      background: red;
    }
  }
`

export default memo(FileSelector);




