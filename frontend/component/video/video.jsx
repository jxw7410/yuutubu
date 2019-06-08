import React from 'react';
import VideoNav from './video_sub_components/video_nav';
import VideoPlayer from './video_sub_components/video_player';
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
        const channel_id = this.props.video.channel_id;
        this.props.fetchChannel(channel_id)
            .then(() => {
                this.setState({ channel: this.props.channels[channel_id] })
            });
    }


    render() {
        //debugger
        return (
                <div id='video-main-hook'>
                    <div id='video-main'>
                            <div id='video-main-left-gap'></div>
                            <div id='video-main-left'>
                            <VideoPlayer video={this.props.video} />
                            <VideoInfoHeader
                                video={this.props.video}
                                channel={this.state.channel}
                            />

                            <VideoMainBody 
                                video={this.props.video}
                            />
                        </div>


                        <div id='video-main-right'>
                            
                        </div>
                    </div>
                </div>
        )
    }
}

export default Video;