import React from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';

class AllVideos extends React.Component{
    constructor(props){
        super(props);
        this.offset = 0;
        this.scrollPercentage = null;
        this.defaultPercentage = 0.40;
        this.scrollHeightOffset = 888;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        this.props.clearChannelVideos();
        this.props.setActiveTab(2);
        this.props.fetchChannelVideos(this.props.channelId, 36, this.offset)
            .then( () => {
                this.offset += 36;
            })
            .then( ()=>{
                document.addEventListener('scroll', this.handleScroll);
                this.scrollPercentage = this.defaultPercentage;
            })
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
        this.props.clearChannelVideos();
    }

    handleScroll(e){
        e.preventDefault();
    }

    redirectOnClick(video_id) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/video/${video_id}`);
        }
    }


    getThumbnails(){
        let thumbnails = null;
        if (this.props.videos.length > 0) {
            thumbnails = this.props.videos.map(video => {
                return <VideoThumbnail key={video.id}
                    video={video}
                    handleClick={this.redirectOnClick(video.id)}
                    channel={{}}
                />
            })
        }
        return thumbnails
    }


    render(){
        return(
            <div className='flexv-3 cvc-lower'>
                <div className={`flexh-3 cvc-nav ${this.props.toggledSideNav ? "" : "cvc-nav-tgl"}`}> Uploads </div>
                    <ul className={`usr-av-lst  ${this.props.toggledSideNav ? "" : "uav-lst-tgl"}`}>
                        { this.getThumbnails() }
                    </ul>
            </div>
        )
    }
}

export default AllVideos;