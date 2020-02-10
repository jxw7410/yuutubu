import React, { useEffect } from 'react';
import Styled, { css } from 'styled-components';
import VideoPlayer from '../video_player/video_player_container';
import VideoPage from './video_page_container';
import ListOfRecommended from './list_of_recommended';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestDefaultPlayer } from '../../actions/video_player/video_player';

/*
  This component right here renders both the video page routes, and the video player
  It is outside of the Switch for the reason that we need the video player to be 
  bound to 
*/

function VideoPageComponents(props) {
  const isMini = props.videoPlayer.type === 'MINI';

  useEffect(() => {
    if (!props.videoPlayer.type) requestDefaultPlayer();
  }, [])

  return (
    <Wrapper
      display={props.videoPlayer.type}
      isMini={isMini}
    >
      <VideoContent isMini={isMini}>
        <VideoContentC1 isMini={isMini}>
          <VideoPlayer />
          <Route path='/video/:video_id' component={VideoPage} />
        </VideoContentC1>
        { 
          isMini ? null :
          <RecommendedListWrapper>
            <ListOfRecommended width='402px'/>
          </RecommendedListWrapper>
        }
      </VideoContent>
    </Wrapper>
  )
}

const MiniStyle = css`
  position: fixed;
  bottom: 0px;
  right: 15px;
  width: 400px;
  min-height: 0px;
  max-height: 290px;
  padding-top: 0px;
  z-index: 3000;
  box-shadow: 0px 19px 10px -1px rgba(100,100,100, 0.5);
  background: white;
  &:hover{ box-shadow: 0 0 10px rgb(0,0,0); }
`

const MaxWidthHeight = css`
  width: 100%;
  height: 100%;
`

const VideoContentCSS = css`
  display: grid;
  grid-template-columns: auto 402px;
  grid-column-gap: 24px;
  position: relative;
  width: calc(100% - 48px);
  margin: auto; 
  margin-top: 0px;
  @media ( max-width: 1000px ) { grid-template-columns: auto; }
`

const VideoContentC1CSS = css`
  display: grid;
  grid-template-rows: min-content 110px repeat(3, min-content);
  width: 100%;
`

const Wrapper = Styled.div`
  display: ${props => props.display ? 'flex' : 'none'}
  width: 100vw;
  min-height: 100vh;
  padding-top: 85px;
  align-items: center;
  ${props => props.isMini ? `${MiniStyle}` : ''}
`

const RecommendedListWrapper = Styled.div`
  display: block;
  @media ( max-width: 1000px ) { display: none; }
`

const VideoContent = Styled.div`
  ${props => props.isMini ? `${MaxWidthHeight}` : `${VideoContentCSS}`}
`

const VideoContentC1 = Styled.div`
  ${props => props.isMini ? `${MaxWidthHeight}` : `${VideoContentC1CSS}`}
`

const msp = state => ({ videoPlayer: state.ui.videoPlayer });
const mdp = dispatch => ({ requestDefaultPlayer: () => dispatch(requestDefaultPlayer()) });

export default connect(msp, mdp)(VideoPageComponents);