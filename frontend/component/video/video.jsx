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

       this.mounted = true;
    }

    componentDidMount() {
        this.props.sideBarTwo();
        this.props.requestDefaultPlayer();
        if (this.props.video.id !== this.props.videoPlayer.video.id)
            this.props.requestSetVideo(this.props.video);
        
    
        const channel_id = this.props.video.channel_id;
        this.props.fetchChannel(channel_id)
            .then(() => {
                this.setState({ channel: this.props.channels[channel_id] })
            });
    }

    componentDidUpdate(prevProps){
        //This really only ever runs if video was changed via URL, while, since there would be a double query,
        //But it's unlikely anyone would switch via URL.
        if (prevProps.match.params.video_id !== this.props.match.params.video_id){
            this.props.fetchVideo(this.props.match.params.video_id).then(()=>{
                this.props.requestSetVideo(this.props.video)
              });
        }
    }

    componentWillMount(){
        this.mounted = false;
    }

    componentWillUnmount(){
        this.props.updatePrevPath(this.props.match.path)
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