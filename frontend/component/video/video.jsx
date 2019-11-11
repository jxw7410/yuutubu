import React from 'react';
import VideoInfoHeader from './video_info_header';
import CommentContainer from './comment_container_ctn';

const Video = props => {

  React.useEffect(() => {
    props.fetchVideo(props.match.params.video_id)
      .then( () => props.requestSetVideo(props.video))
  }, [props.match.params.video_id])


  React.useEffect( () => {
    props.sideBarTwo();
    props.requestDefaultPlayer();
    props.fetchChannel(props.video.channel_id);
    props.videoLikeDislike(props.video.like_dislike)

    return () => props.updatePrevPath(props.match.path);
  }, [])


  return (
    <>  
      <VideoInfoHeader 
        video={props.video}
        channel={props.channel}
      />
      <CommentContainer video={props.video} />
    </>
  )
}

export default Video;