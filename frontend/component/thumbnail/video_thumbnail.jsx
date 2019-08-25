import React from 'react';
import { fetchVideo } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import ThumbnailPreviewVideo from './thumbnail_preview';
import { VideoPageThumbnailInfo, IndexPageThumbnailInfo, SearchPageThumbnailInfo } from './thumbnail_info';
import { convertDurationToTime } from '../../util/selectors';

class VideoThumbnail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderVideo: false,
            dataLoaded: false,
            imgLoaded: false,
            infoComponent: null
        }

        this.receiveVideo = false;
        this.throttledAjax = null;
        this.mouseHover = false;
        this.clock = false;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setRender = this.setRender.bind(this);
        this.didRequested = false;
        this.setDataloaded = this.setDataloaded.bind(this);
        this.handleLoadImg = this.handleLoadImg.bind(this);
        this._isMounted = false; 

    }


    componentDidMount(){
        this._isMounted = true;
        this.selectInfo(this.props.type);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    selectInfo(type){
        let infoComponent;
        switch(type){
            case "video-page":
                infoComponent = <VideoPageThumbnailInfo 
                    video={this.props.video}
                    onClick={this.props.handleClick}/>
                break;
            case "search-page":
                infoComponent = <SearchPageThumbnailInfo 
                    video={this.props.video}
                    onClick={this.props.handleClick}/>;
                break;
            default:
                infoComponent = <IndexPageThumbnailInfo 
                    video={this.props.video}
                    channel={this.props.channel}
                    onClick={this.props.handleClick}/>
        }

        this.setState({infoComponent})
    }

    handleMouseOver() {
        this.mouseHover = true;
        this.clock = true;
    }

    handleMouseEnter() {
        clearTimeout(this.throttledAjax)
        this.mouseHover = true;
        if (!this.didRequested) {
            this.throttledAjax = setTimeout(() => {
                this.props.fetchVideo(this.props.video.id)
                    .then(() => {
                        if (this._isMounted){
                            this.didRequested = true;
                            this.setState({ renderVideo: true })
                        }
                    })
            }, 200);
        } else {
            this.throttledAjax = setTimeout(() => {
                this.setState({ renderVideo: true })
            }, 200);
        }
    }

    setRender() {
        this.setState({ dataLoaded: false })
        setTimeout(()=>{ 
            if (this._isMounted)
                this.setState({receiveVideo: false})
        }, 200);
    }

    setDataloaded(e) {
        e.preventDefault();
        this.setState({ dataLoaded: true })
    }

    handleMouseLeave() {
        clearTimeout(this.throttledAjax)
        this.clock = false;

        if (this.state.renderVideo) 
            this.setRender();

        if(this.state.dataLoaded)
            setTimeout(()=>{
                this.mouseHover = false;
            }, 100);
        else 
            this.mouseHover = false;
    }

    handleLoadImg(){
        this.setState({imgLoaded: true})
    }

    render() {
        return (
            <li className='thumbnails'>
                <div className="tbn-ctnt"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.props.handleClick}>
                    {
                        this.state.renderVideo && this.mouseHover ?

                            <ThumbnailPreviewVideo
                                setRender={this.setRender}
                                setDataloaded={this.setDataloaded}
                                video={this.props.video} /> : null
                    }


                    {
                        this.clock ?
                        <div className='flexh-1 thumbnail-clock'> 
                            <i className="material-icons clock">watch_later</i>
                        </div> : null
                    }

                    <div className={`tbn-prev-wrap` +
                        ((this.state.renderVideo && this.mouseHover && this.state.dataLoaded) ? " tbn-active" : "")
                         +
                         ((this.state.imgLoaded ? "" : " not-loaded"))
                        }>
                        
                        <img onLoad={this.handleLoadImg} className={`thumbnail-preview ${this.state.imgLoaded ? "loaded" : ""}`}
                            src={this.props.video.thumbnail} />
                        <div className='video-time'>{convertDurationToTime(this.props.video.duration)}</div>
                    </div>
                </div>

                {this.state.infoComponent}
            </li>
        )
    }
}


const mdp = dispatch => {
    return {
        fetchVideo: video_id => dispatch(fetchVideo(video_id))
    }
}

export default connect(null, mdp)(VideoThumbnail);   