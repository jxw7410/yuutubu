import React from 'react';
import VideoHeader from './video_header';
import VideoBody from './video_body';
import CommentContainer from './comment_container_ctn';
import { MINI } from '../../util/constants';

const Video = props => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    props.fetchVideo(props.match.params.video_id)
    if (isMounted) props.updatePrevPath(props.match.path);
    else setIsMounted(true);
  }, [props.match.params.video_id])

  React.useEffect(() => {
    if (props.video.id) {
      if (props.videoPlayer.type !== MINI) {
        props.requestSetVideo(props.video);
      }
      props.fetchChannel(props.video.channel_id);
      props.videoLikeDislike(props.video.like_dislike)
    }
  }, [props.video.videoUrl])

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