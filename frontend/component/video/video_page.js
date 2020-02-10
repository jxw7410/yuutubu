import React, { useEffect } from 'react';
import Styled from 'styled-components';
import VideoHeader from './video_header';
import VideoBody from './video_body';
import CommentWrapper from './comment_wrapper_container';
import ListOfRecommended from './list_of_recommended';

const VideoPage = props => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);

  // If URL changes, then fetch the video required
  useEffect(() => {
    const videoId = props.match.params.video_id;
    props.fetchVideo(videoId).then(() => setFetched(!fetched))
    props.fetchRecommendedVideos(videoId);
    if (isMounted) props.updatePrevPath(props.match.path);
    else setIsMounted(true);
  }, [props.match.params.video_id])

  useEffect(() => {
    if (props.videoPlayer.video.id != props.match.params.video_id) {
      props.requestSetVideo(props.video)
      props.fetchChannel(props.video.channel_id);
      props.videoLikeDislike(props.video.like_dislike)
    }
  }, [fetched])

  useEffect(() => {
    props.sideBarTwo();
    props.requestDefaultPlayer();
    return () => props.updatePrevPath(props.match.path);
  }, [])


  return (
    <>
      <VideoHeader video={props.video} />
      <VideoBody video={props.video} channel={props.channel} />
      <RecommendedListWrapper>
        <ListOfRecommended width='100%'/>
      </RecommendedListWrapper>
      <CommentWrapper video={props.video} />
    </>
  )
}


const RecommendedListWrapper = Styled.div`
  margin-top: 10px;
  display: none;
  @media (max-width: 1000px) { display: block; }
`

export default VideoPage;