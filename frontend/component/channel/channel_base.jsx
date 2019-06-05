import React from 'react'
import { withRouter } from 'react-router-dom';
import ChannelBaseVideoPlayer from './channel_base_video_player';

class ChannelBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
        }


        this.didFetchedFeatured = false;
    }

    componentDidMount() {
        this.props.fetchChannelVideos(this.props.channelId, 6, 0)
    }

    componentDidUpdate() {
        if (this.props.videos.length > 0 && !this.didFetchedFeatured) {
            this.didFetchedFeatured = true;
            const video_id = this.props.videos[0].id;
            this.props.fetchVideo(video_id).then(() => 
                this.setState({ video: this.props.videos[0] }));
        }
    }

    componentWillUnmount() {
        this.props.clearChannelVideos();
    }

    render() {
        return (
            <div id='channel-main-content-lower'>
                <div id="ch-main-content-lower-grid-hook">
                    <div>
                        { 
                            this.state.video ?
                            <> 
                                 <ChannelBaseVideoPlayer 
                                    video={this.state.video}
                                 /> 

                                <div id='featured-videos'></div>
                            </>
                            : null}
                    </div>
                </div>
            </div>
        )
    }
}



export default withRouter(ChannelBase);

