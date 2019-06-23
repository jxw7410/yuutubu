import React from 'react';
import { connect } from 'react-redux';
import { fetchRecommendedVideos } from '../../../actions/video/video_action';
import {removeVideoPlayer} from '../../../actions/video_player';
import PreviewVideo from '../../thumbnail/video_thumbnail';
import {withRouter} from 'react-router-dom';
import {sortByViews} from '../../../util/selectors';

class VideoRecommendedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched: false,
            currentVideoId: null,
        }
       
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //debugger
        if (this.props.video_id) {
            if (this.state.currentVideoId !== this.props.video.id) {
                this.setState({ currentVideoId: this.props.video.id })
            }
        }
    }

    componentDidUpdate() {
        //debugger
        if (this.props.video.id) {
            if (this.state.currentVideoId !== this.props.video.id) {
                this.setState({ currentVideoId: this.props.video.id, fetched: true })
                this.props.fetchRecommendedVideos(this.props.video.id)
            }
        }
    }

    handleClick(video_id){
        return (e) => {
            e.preventDefault();
            this.props.removeVideoPlayer();
            setTimeout(() => {
                this.props.history.push(`/video/${video_id}`)}, 0)
        }
    }

    render() {
        const previews = this.props.otherVideos.map(video =>{
            if (video.id !== this.props.video.id)
                return <PreviewVideo 
                            key={video.id} 
                            video={video} channel={{}} 
                            type={'video-page'}
                            handleClick={this.handleClick(video.id)}
                            />
        })
        //debugger
        return (
            <div id='video-main-right'>
                {
                    this.state.fetched ?
                        <ul id='preview-video-list'>
                            { previews }
                        </ul>
                    : 
                    null
                }

            </div>
        )
    }
}


const msp = state => {
    return {
        video: state.ui.videoPlayer.video,
        otherVideos: sortByViews(Object.values(state.entities.videos))
    }
}

const mdp = dispatch => {
    return {
        fetchRecommendedVideos: video_id => dispatch(fetchRecommendedVideos(video_id)),
        removeVideoPlayer: () => dispatch(removeVideoPlayer()),
    }
}

export default withRouter(connect(msp, mdp)(VideoRecommendedList)); 