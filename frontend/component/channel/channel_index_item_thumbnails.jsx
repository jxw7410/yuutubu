import React from 'react';
import { fetchVideo } from '../../actions/video/video_action';
import {connect} from 'react-redux';
import ThumbnailPreviewVideo from './channel_thumbnail_preview';

class ChannelIndexItemThumbnail extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            renderVideo: false,
        }

        this.receiveVideo = false;
        this.throttledAjax = null;
        this.mouseHover = false;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setRender = this.setRender.bind(this);
        this.didRequested = false;
    }

    handleMouseEnter(){
        clearTimeout(this.throttledAjax)
        
        if(!this.didRequested) {
            this.didRequested = true;
            this.throttledAjax = setTimeout(()=>{
                this.props.fetchVideo(this.props.video.id)
                    .then( ()=>{
                        //debugger
                        this.setState({ renderVideo: true })
                    })
            }, 500); 
        } else {
            this.throttledAjax = setTimeout(() => {
                        this.setState({ renderVideo: true })
            }, 500); 
        }
    }

    handleMouseOver(){
        this.mouseHover = true;
    }   

    setRender(){
        this.setState({ renderVideo: false })
    }

    handleMouseLeave(){
        clearTimeout(this.throttledAjax)
        this.mouseHover = false;
        if (this.state.renderVideo)
            this.setState({renderVideo: false})
    }


    render(){
        return (
            <li onClick={this.props.handleClick}
                className='channel-index-item-thumbnails'>
                <div className="channel-index-item-media"
                    onMouseEnter={ this.handleMouseEnter }
                    onMouseOver={ this.handleMouseOver }
                    onMouseLeave={ this.handleMouseLeave }>   
                    {
                        this.state.renderVideo && this.mouseHover ?
                
                            <ThumbnailPreviewVideo 
                              setRender={this.setRender}
                              video={this.props.video}  />

                        : <video className='thumbnail-preview-video' muted autoPlay> <source src={""} type="video/mp4" /> </video>
                     
                    }
                    <img className={`thumbnail-preview` + 
                        (this.state.renderVideo && this.mouseHover ? "-active" : "")}
                        src={this.props.video.thumbnail} />
                </div>
                <section className='ch-title'>
                    {this.props.video.title}
                </section>
                <section className='ch-msc'>
                    {this.props.channel.name ?
                        <span>{this.props.channel.name}</span> : null
                    }

                    <span>0 views</span>
                </section>
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

export default connect(msp,mdp)(ChannelIndexItemThumbnail);   