import React, { memo } from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { removeVideoPlayer } from '../../actions/video_player/video_player';
import VideoThumbnail from '../thumbnail/video_thumbnail_container';
import { withRouter } from 'react-router-dom';


function ListOfRecommended(props) {
  const redirectToVideo = videoId => e => {
    e.preventDefault();
    props.removeVideoPlayer();
    props.history.push(`/video/${videoId}`)
  }


  const previews = props.otherVideos.map(video => {
    if (video.id !== props.video.id)
      return <VideoThumbnail
        key={video.id}
        video={video} channel={{}}
        type='VIDEOPAGE'
        handleClick={redirectToVideo(video.id)}
      />
  });

  return (
    <Wrapper width={props.width}>
      <Top>Up Next</Top>
      {previews}
    </Wrapper>
  )
}


const Wrapper = Styled.ul`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  grid-column: 2 / 3;

  & .thumbnails{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
  }

  & .thumbnail-content, 
  & .thumbnail-preview, 
  & .thumbnail-preview-video, 
  & .thumbnail-preview-active {
    height: 95px;
    width: 170px;
  }

  & .thumbnail-preview--wrapper{
    opacity: 1;
    position: relative;
    transition: opacity 0.15s linear;
  }

  & .thumbnail-active{
    opacity: 0;
    position: relative;
    transition: opacity 0.5s ease-in;
  }

  & > li:nth-child(2){
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(216,216,216);
    margin-bottom: 15px;
  }
`

const Top = Styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  font-size: 16px;
  margin-bottom: 15px;
`

const msp = state => {
  const otherVideos = Object.values(state.entities.videos)
    .sort((vid1, vid2) => vid2.views - vid1.views);

  return {
    video: state.ui.videoPlayer.video,
    otherVideos
  }
}

const mdp = dispatch => ({
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
})

export default withRouter(connect(msp, mdp)(memo(ListOfRecommended))); 