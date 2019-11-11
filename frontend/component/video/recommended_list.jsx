import React from 'react';
import { connect } from 'react-redux';
import { fetchRecommendedVideos } from '../../actions/video/video_action';
import { removeVideoPlayer } from '../../actions/video_player/video_player';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import { withRouter } from 'react-router-dom';


const VideoRecommendedList = props => {
  React.useEffect(() => {
    props.fetchRecommendedVideos(props.video.id)
  }, [props.video.id])

  function redirectToVideo(videoId){
    return e => {
      e.preventDefault();
      props.removeVideoPlayer();
      props.history.push(`/video/${videoId}`)
    }
  }

  const previews = props.otherVideos.map(video => {
    if (video.id !== props.video.id)
      return <VideoThumbnail
        key={video.id}
        video={video} channel={{}}
        type={'video-page'}
        handleClick={redirectToVideo(video.id)}
      />
    });

  return (
    <div className='vid-mn-r'>
      <ul className='prev-vid-lst flexv-4'>
        { previews }
      </ul>
    </div>
  )
}


const msp = state => {
  const otherVideos = Object.values(state.entities.videos)
    .sort((vid1, vid2) => vid2.views - vid1.views);

  return {
    video: state.ui.videoPlayer.video,
    otherVideos
  }
}

const mdp = dispatch => ({
  fetchRecommendedVideos: video_id => dispatch(fetchRecommendedVideos(video_id)),
  removeVideoPlayer: () => dispatch(removeVideoPlayer()),
})

export default withRouter(connect(msp, mdp)(VideoRecommendedList)); 