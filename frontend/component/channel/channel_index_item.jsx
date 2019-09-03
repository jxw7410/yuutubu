import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import VideoThumbnail from '../thumbnail/video_thumbnail';
import SubscribeButton from '../subscribe/subscribe_button';

class ChannelIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.redirectOnClick = this.redirectOnClick.bind(this);
    }

    componentDidMount() {
        // remove_for_production
        this.props.fetchChannelVideos(this.props.channel.id, 6, 0)
    }


    redirectOnClick(video_id) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/video/${video_id}`);
        }
    }

    getThumbnails() {
        let thumbnails = [];
        if (this.props.videos.length) {
            for (let i = 0; i < this.props.videos.length && i < 6; i++) {
                const video = this.props.videos[i];
                thumbnails.push(<VideoThumbnail key={video.id}
                    video={video}
                    handleClick={this.redirectOnClick(video.id)}
                    channel={this.props.channel} />)
            }
        }
        return thumbnails;
    }

    render() {
        
        return (
            <li className="ch-idx-item">
                <section className="ch-idx-item-hdr flexh-6">
                    <span className='chiih-name flexh-3'>
                        <Link to={`/channel/${this.props.channel.id}`}
                            className="ch-idx-item-link" >
                            <i className="fas fa-user-circle"/>
                            <span>{this.props.channel.name}</span>
                        </Link> Recommended channel for you</span>

                    <SubscribeButton channel={this.props.channel}/>
                </section>
                <section>
                    <ul style={{ display: 'flex' }}> {this.getThumbnails()} </ul>
                </section>
            </li>
        )
    }
}


export default withRouter(ChannelIndexItem);

