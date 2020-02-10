import React, {createContext, useContext } from 'react';

export const VideoPlayerContext = createContext({});

export const withVideoPlayerContext = Component => {
  const ContextedComponent = props => {
    const value = useContext(VideoPlayerContext);
    return <Component {...props} {...value}/>
  }
  return ContextedComponent;
}

