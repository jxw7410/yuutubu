import React, {createContext, useContext} from 'react';

export const UploadPageContext = createContext({
  videoAttr: {},
  setVideoAttr: () => { return; },
})


export const withUploadPageContext = Component => {
  return props => {
    const { videoAttr, setVideoAttr } = useContext(UploadPageContext); 
    return (
      <Component 
        {...props}
        videoAttr={videoAttr} 
        setVideoAttr={setVideoAttr} 
      />
    )
  }
}; 

