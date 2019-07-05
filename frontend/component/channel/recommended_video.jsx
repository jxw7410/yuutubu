import React from 'react';
import {sortByViews} from '../../util/selectors';
import {fetchRecommendedVideos} from '../../actions/video/video_action';
import { connect } from 'react-redux';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import {withRouter } from 'react-router-dom';


class RecommendedVideos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
            readMore: false,
        }

        this.redirectOnClick = this.redirectOnClick.bind(this);
        this.handleReadMore = this.handleReadMore.bind(this);
    }
    
    componentDidMount(){
        this.props.fetchRecommendedVideos()
        .then( () => this.setState({fetched : true}));
    }


    redirectOnClick(video_id) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/video/${video_id}`);
        }
    }

    handleReadMore(e){
        e.preventDefault();
        this.setState({readMore: true})
    }

    render(){
        let videos;
        
        if (this.state.fetched){
            videos = this.props.videos.map(video => {
                return <VideoThumbnail key={video.id}
                video={video}
                handleClick={this.redirectOnClick(video.id)}
                channel={ { id: video.channel_id, name: video.channelName }}/>
            })
        }

        return (    
            <div id='index-recommended-videos-ctn' >
                <div className="margin-top-shelf"> Recommended </div>
                <ul id='index-recommended-videos' className={"margin-top-shelf" + (this.state.readMore ? " show-more-active" : " show-more-inactive")}>
                    {videos}
                </ul>
                {
                    this.state.readMore ? null : 
                    
                    <button 
                        id='show-more-button'
                        onClick={this.handleReadMore} 
                    >Show More</button>
                }
            </div>
        )
    }


}



const msp = state => {
    return {
        videos: sortByViews(Object.values(state.entities.videos)).slice(0, 18),
    }
}


const mdp = dispatch => {
    return {
        fetchRecommendedVideos: () => dispatch(fetchRecommendedVideos()),
    }
}

export default withRouter(connect(msp, mdp)(RecommendedVideos));