import React from 'react';
import VideoInfoHeader from './video_sub_components/video_info_header';
import VideoMainBody from './video_main_body';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggledSideNav: true,
            channel: {},
        }
    }

    componentDidMount() {
        this.props.sideBarTwo();
        //debugger
        this.props.requestDefaultPlayer();
        if (this.props.video.id !== this.props.videoPlayer.video.id)
            this.props.requestSetVideo(this.props.video);
    
        const channel_id = this.props.video.channel_id;
        this.props.fetchChannel(channel_id)
            .then(() => {
                this.setState({ channel: this.props.channels[channel_id] })
            });
    }


    render() {
        return (
            <>
                    <VideoInfoHeader
                        video={this.props.video}
                        channel={this.state.channel}
                    />

                    <VideoMainBody
                        video={this.props.video}
                    />
        
            </>
        )
    }
}

export default Video;