import React from 'react';
import { sortByViews } from '../../util/selectors';
import { fetchRecommendedVideos } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import { withRouter } from 'react-router-dom';

const RecommendedVideos = props => {
  const [state, setState] = React.useState({
    fetched: false,
    readMore: false,
  })

  React.useEffect(() => {
    props.fetchRecommendedVideos()
      .then(() => setState({ ...state, fetched: true }))
  }, []);

  function redirectOnClick(videoId) {
    return e => {
      props.history.push(`/video/${videoId}`)
    }
  }


  return (
    <div className='idx-rec-vid-ctn'>
      <div className='mgt-24' style={{ fontWeight: 'bold' }}> 
        Recommneded
      </div>
      <ul className={[
        'idx-rec-vid',
        state.readmore ? "" : 'show-more-inactive'
      ].join(' ')}>
        {
          state.fetched ?
            props.videos.map(video =>
              <VideoThumbnail
                key={video.id}
                video={video}
                handleClick={redirectOnClick}
                channel={{ id: video.channel_id, name: video.channelName }} />
            ) : null
        }
      </ul>
      {
        state.readMore ? null :
          <button
            id='show-more-button'
            onClick={e => setState({ ...state, readMore: true })}>
            Show More
          </button>
      }
    </div>
  )
}



const msp = state => ({
  videos: sortByViews(Object.values(state.entities.videos)).slice(0, 18),
})


const mdp = dispatch => ({
  fetchRecommendedVideos: () => dispatch(fetchRecommendedVideos()),
})

export default withRouter(connect(msp, mdp)(RecommendedVideos));