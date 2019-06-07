import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChannelVideos, clearChannelVideos } from '../../actions/video/video_action';
import ChannelIndexItemThumbnail from './channel_index_item_thumbnails';
import { getVideosForChannel} from '../../util/selectors';

class ChannelIndexItem extends React.Component {
    constructor(props){
        super(props);
        this.redirectOnClick = this.redirectOnClick.bind(this);
    }

    componentDidMount(){
        this.props.fetchChannelVideos(this.props.channel.id, 6, 0)
    }

    redirectOnClick(video_id){
        return e => {
            e.preventDefault();
            this.props.history.push(`/video/${video_id}`);
        }
    }

    componentWillUnmount(){
        this.props.clearChannelVideos();
    }

    render() {
        //debugger
        let thumbnails = null;
        if (this.props.videos.length > 0){
            thumbnails = this.props.videos.map( video => {
                return <ChannelIndexItemThumbnail key={video.id} 
                    video={video}
                    handleClick={this.redirectOnClick(video.id)}
                    channel={this.props.channel}
                />
            })
        }

        return (

            <li className="channel_index_items">
                <section className="channel_index_items_header">
                    <span className='channel_index_items_header_ch_name'>
                        <Link to={`/channel/${this.props.channel.id}`}
                            className="channel_index_items_channel_links" >
                            <i className="fas fa-user-circle"></i>
                            <span>{this.props.channel.name}</span></Link> Recommended channel for you</span>
                </section>
                <section id="channel-index-items-body">
                    <ul>
                        {thumbnails}
                    </ul>
                </section>
            </li>
        )
    }
}




const msp = (state, ownProps) => {
    return {
        channel: ownProps.channel,
        videos: getVideosForChannel(state.entities.videos, ownProps.channel.video_ids)
    }
}


const mdp = dispatch =>{
    return {
        fetchChannelVideos: (channel_id, limit, offset) => dispatch(fetchChannelVideos(channel_id, limit, offset)),
        clearChannelVideos: () => dispatch( clearChannelVideos())
    }
}


export default withRouter(connect(msp, mdp)(ChannelIndexItem));



/*
    channel {}

*/