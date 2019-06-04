import React from 'react';
import ChannelIndexItemThumbnail from './channel_index_item_thumbnails';

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

    render(){
        let thumbnails = null;
        if (this.props.videos.length > 0) {
            thumbnails = this.props.videos.map(video => {
                return <ChannelIndexItemThumbnail key={video.id}
                    video={video}
                    handleClick={this.redirectOnClick(video.id)}
                    channel={{}}
                />
            })
        }

        return(
            <div id={'channel-video-content-lower' }>
                <div id={'ch-vid-ctn-nav' + (this.props.toggledSideNav ? "" : "-toggled")}> Uploads </div>
                    <ul id={"user-all-videos-list" + (this.props.toggledSideNav ? "" : "-toggled")}>
                        { thumbnails }
                    </ul>
            </div>
        )
    }
}

export default AllVideos;