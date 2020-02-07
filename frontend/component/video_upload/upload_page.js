import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import FileSelector from './file_selector';
import UploadFormWrapper from './upload_form_wrapper';
import {UploadPageContext} from './upload_page_context';

function UploadPage(props) {
  const [fileSelected, setFileSelected] = useState(false);
  const [videoAttr, setVideoAttr] = useState({
    video: null,
    videoUrl: null,
    thumbnail: null,
    thumbnailUrl: null,
    duration: null,
  });

  useEffect(()=>{
    props.sideBarTwo();
    props.removeVideoPlayer();
    return () => props.updatePrevPath(props.match.path);
  },[])

  const fileReader = file => {
    if(!file) return;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setVideoAttr({
        ...videoAttr,
        video: file, 
        videoUrl: fileReader.result,
      })
    };
    fileReader.readAsDataURL(file);
  }

  const handleFileUpload = e => {
    e.preventDefault();
    setFileSelected(true);
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.currentTarget.files[0];
    fileReader(file);
  }

  return (
    <Wrapper>
      {
        fileSelected ? 
          <UploadPageContext.Provider value={{videoAttr, setVideoAttr}}>
            <UploadFormWrapper />
          </UploadPageContext.Provider>
          : 
          <FileSelector handleFileUpload={handleFileUpload} />
      }
    </Wrapper>
  )
}


const Wrapper = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(241, 241, 241);
  min-height: 100%;
  width: 100%;
  position: absolute;
`



export default UploadPage;




