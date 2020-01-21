import React from 'react';
import { fetchRecommendedVideos } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import { withRouter } from 'react-router-dom';

const Recommendation = props => {
  const [readMore, setReadMore] = React.useState(false)

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
      <div className='margin-24' style={{ fontWeight: 'bold' }}>
        Recommended
      </div>
      <ul className={[
        'recommended-video-container',
        'margin-24',
        readMore ? "" : 'show-more-inactive'
      ].join(' ')}>
        {
          props.videos.map(video =>
            <VideoThumbnail
              key={video.id}
              video={video}
              handleClick={redirectOnClick}
              channel={{ id: video.channel_id, name: video.channelName }} />
          )
        }
      </ul>
      {
        readMore ? null :
          <button
            id='show-more-button'
            onClick={() => setReadMore(true)}>
            Show More
          </button>
      }
    </div>
  )
}



const msp = state => {
  const videos = Object.values(state.entities.videos)
    .sort((vid1, vid2) => vid2.views - vid1.views)
    .slice(0, 18);

  return {
    videos
  }
}


const mdp = dispatch => ({
  fetchRecommendedVideos: () => dispatch(fetchRecommendedVideos()),
})

export default withRouter(connect(msp, mdp)(Recommendation));