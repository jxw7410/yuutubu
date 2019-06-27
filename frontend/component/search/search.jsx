import React from 'react';
import VideoThumbnail from '../thumbnail/video_thumbnail';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchVideoListCtn = React.createRef();
        this.offset = 0;
        this.limit = 10;
        this.scrollPercentage = 0;
        this.fetching = false;
        this.redirectOnClick = this.redirectOnClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }


    componentDidMount() {
        this.props.clearVideos();
        if (this.props.videoPlayer.type !== 'MINI')
            this.props.removeVideoPlayer();

        this.props.fetchSideBarOne();
        this.props.updateSearchHistory(this.props.match.params).then(
            this.props.requestSearchVideos(this.props.match.params, this.limit, this.offset)
                .then(() => {
                    this.offset += 10;
                    this.scrollPercentage = (this.offset - 6) / this.offset;
                    document.addEventListener('scroll', this.handleScroll);
                }
                )
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.query !== this.props.match.params.query) {
            this.props.clearVideos();
            this.offset = 0;
            this.props.updateSearchHistory(this.props.match.params).then(
                this.props.requestSearchVideos(this.props.match.params, this.limit, 0).then(() => {
                    this.offset += 10;
                    this.scrollPercentage = (this.offset - 6.9) / this.offset;
                })
            )
        }
    }


    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
        this.props.updatePrevPath(this.props.match.path);
    }

    handleScroll(e) {
        e.preventDefault();
        if (!this.fetching) {
            let scrollHeight = this.searchVideoListCtn.current.scrollHeight;
            if (document.querySelector('html').scrollTop > (scrollHeight * this.scrollPercentage)) {
                this.fetching = true;
                this.props.requestSearchVideos(this.props.match.params, this.limit, this.offset)
                    .then(() => {
                        this.offset += 10;
                        this.scrollPercentage = (this.offset - 6.9) / this.offset;
                        this.fetching = false
                    })
                    .fail(() => {
                        document.removeEventListener('scroll', this.handleScroll);
                    })
            }
        }

    }

    redirectOnClick(video_id) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/video/${video_id}`);
        }
    }

    render() {
        const videos = this.props.videos.map(video => {
            return (
                <VideoThumbnail
                    key={video.id}
                    video={video}
                    type='search-page'
                    handleClick={this.redirectOnClick(video.id)}
                />
            )
        })

        return (
            <div id={`main-content-ctn${this.props.sideNav.toggled ? "-toggled" : ""}`}>
                <div id='search-video-list-ctn' ref={this.searchVideoListCtn}>
                    <ul id='search-video-list'>
                        {videos}
                    </ul>
                </div>
            </div>
        )
    }
}


export default Search;