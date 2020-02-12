import React from 'react';
import Styled from 'styled-components';
import {ListContainer} from './styles';
import { fetchRecommendedVideos } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import VideoThumbnail from '../thumbnail/video_thumbnail_container';
import { withRouter } from 'react-router-dom';

const Recommendation = props => {
  React.useEffect(() => {
    props.fetchRecommendedVideos()
  }, []);

  function redirectOnClick(videoId) {
    return e => {
      e.preventDefault();
      props.history.push(`/video/${videoId}`)
    }
  }

  return (
    <div>
      <Header> Recommended </Header>
      <ListContainer>
        {
          props.videos.map(video =>
            <VideoThumbnail
              key={video.id}
              video={video}
              handleClick={redirectOnClick}
              channel={{ id: video.channel_id, name: video.channelName }} />
          )
        }
      </ListContainer>
    </div>
  )
}

const Header = Styled.h1`
  font-weight: bold;
  font-size: 1.1em;
  margin: 24px 8px 0px 8px;
`


const msp = state => {
  const videos = Object.values(state.entities.videos)
    .sort((vid1, vid2) => vid2.views - vid1.views)
    .slice(0, 8);

  return {
    videos
  }
}


const mdp = dispatch => ({
  fetchRecommendedVideos: () => dispatch(fetchRecommendedVideos()),
})

export default withRouter(connect(msp, mdp)(Recommendation));