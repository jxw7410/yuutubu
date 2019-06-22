import React from 'react';
import { fetchVideo } from '../../actions/video/video_action';
import { connect } from 'react-redux';
import ThumbnailPreviewVideo from './channel_thumbnail_preview';

class ChannelIndexItemThumbnail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderVideo: false,
            dataLoaded: false
        }

        this.receiveVideo = false;
        this.throttledAjax = null;
        this.mouseHover = false;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setRender = this.setRender.bind(this);
        this.didRequested = false;
        this.setDataloaded = this.setDataloaded.bind(this);
        this._isMounted = false; 
    }



    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
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
            }, 300);
        } else {
            this.throttledAjax = setTimeout(() => {
                this.setState({ renderVideo: true })
            }, 200);
        }
    }

    handleMouseOver() {
        this.mouseHover = true;
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
        if (this.state.renderVideo){
            this.setRender();
        
        } 
        if(this.state.dataLoaded){
            setTimeout(()=>{
                this.mouseHover = false;
            }, 100)
        }
        else {
            this.mouseHover = false;
        }
    }


    render() {
        return (
            <li onClick={this.props.handleClick}
                className='channel-index-item-thumbnails'>
                <div className="channel-index-item-media"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}>
                    {
                        this.state.renderVideo && this.mouseHover ?

                            <ThumbnailPreviewVideo
                                setRender={this.setRender}
                                setDataloaded={this.setDataloaded}
                                video={this.props.video} />

                            : null

                    }
                    <img className={`thumbnail-preview` +
                        ((this.state.renderVideo && this.mouseHover && this.state.dataLoaded) ? "-active" : "")}
                        src={this.props.video.thumbnail} />
                </div>



                {
                    this.props.type ?

                        <div id='videopage-thumbnail-preview'>
                            <section className='ch-title'>
                                {this.props.video.title}
                            </section>
                            <section>
                                {this.props.video.channelName}
                            </section>
                            <section>
                                <span>{this.props.video.views} views</span>
                            </section>
                        </div>

                        :
                        <>
                            <section className='ch-title'>
                                {this.props.video.title}
                            </section>
                            <section className='ch-msc'>
                                {this.props.channel.name ?
                                    <span>{this.props.channel.name}</span> : null
                                }

                                <span>{this.props.video.views} views &middot; {this.props.video.created_at}</span>
                            </section>
                        </>

                }

            </li>
        )
    }
}


const msp = state => {
    return {
    }
}

const mdp = dispatch => {
    return {
        fetchVideo: video_id => dispatch(fetchVideo(video_id))
    }
}

export default connect(msp, mdp)(ChannelIndexItemThumbnail);   