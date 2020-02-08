import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import FileSelector from './file_selector';
import UploadForm from './upload_form_container';
import { UploadPageContext } from './upload_page_context';
import { readFile } from './helpers';

function UploadPage(props) {
  const [fileSelected, setFileSelected] = useState(false);
  const [videoAttr, setVideoAttr] = useState({
    video: null,
    videoUrl: null,
    thumbnail: null,
    thumbnailUrl: null,
    duration: null,
  });

  useEffect(() => {
    props.sideBarTwo();
    props.removeVideoPlayer();
    return () => props.updatePrevPath(props.match.path);
  }, [])

  const fileReaderCB = (file, fileReader) => () => {
    setVideoAttr({
      ...videoAttr,
      video: file,
      videoUrl: fileReader.result,
    })
  }


  const handleFileUpload = e => {
    e.preventDefault();
    setFileSelected(true);
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.currentTarget.files[0];
    readFile(file, fileReaderCB); // callback must take file and fileReader args
  }

  return (
    <Wrapper>
      {
        fileSelected ?
          <UploadPageContext.Provider value={{ videoAttr, setVideoAttr }}>
            <UploadForm />
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




