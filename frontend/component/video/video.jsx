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

        this.handleToggled = this.handleToggled.bind(this);
    }

    componentDidMount() {
        const channel_id = this.props.video.channel_id;
        this.props.fetchChannel(channel_id)
            .then(() => {
                this.setState({ channel: this.props.channels[channel_id] })
            });
    }

    handleToggled(e) {
        e.preventDefault();
        const toggledSideNav = this.state.toggledSideNav ? false : true;
        this.setState({ toggledSideNav });

    }

    render() {
        //debugger
        return (
            <div id='main-nav-div'>
                <VideoNav handleToggled={this.props.handleToggled} />

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
            </div>
        )
    }
}

export default Video;