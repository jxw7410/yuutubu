import React from 'react';
import VideoHeader from './video_header';
import VideoBody from './video_body';
import CommentContainer from './comment_container_ctn';

const Video = props => {
  const [isMounted, setIsMounted] = React.useState(false);
  // It doesn't matter if true or false
  const [fetched, setFetched] = React.useState(false);

  // If URL changes, then fetch the video required
  React.useEffect(() => {
    props.fetchVideo(props.match.params.video_id)
      .then(() => setFetched(!fetched))
    if (isMounted) props.updatePrevPath(props.match.path);
    else setIsMounted(true);
  }, [props.match.params.video_id])

  React.useEffect(() => {
    if (props.videoPlayer.video.id !== props.match.params.video_id) {
      props.requestSetVideo(props.video)
      props.fetchChannel(props.video.channel_id);
      props.videoLikeDislike(props.video.like_dislike)
    }
  }, [fetched])

  React.useEffect(() => {
    props.sideBarTwo();
    props.requestDefaultPlayer();
    return () => props.updatePrevPath(props.match.path);
  }, [])


  return (
    <>
      <VideoHeader video={props.video} />
      <VideoBody video={props.video} channel={props.channel} />
      <CommentContainer video={props.video} />
    </>
  )
}

export default Video;