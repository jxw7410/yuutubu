import React from 'react';




//Not kept as a util because this doesn't / should not affect state
const updateView = video_id => {
    return $.ajax({
        method: 'patch',
        url: `/api/videos/${video_id}/views`
    })
} 



//Have plans for custom play bar in the future.

class VideoPlayer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            replay: false, 
        }

        this.minDuration = null;
        this.videoElement = null;
        this.viewUpdated = false;
        this.startTime = 0;

        this.handleOnLoad = this.handleOnLoad.bind(this)
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleReplay = this.handleReplay.bind(this);
    }

    componentDidMount(){
        this.videoElement = document.getElementById("video-player");
        this.minDuration = this.props.video.duration  > 30 ? 30 : this.props.video.duration / 10;
    }

    handleOnLoad(e){
        e.preventDefault();
        this.startTime = this.videoElement.currentTime;
    }

    handleTimeUpdate(e){
        e.preventDefault();
        if(!this.viewUpdated){
            if( (this.videoElement.currentTime - this.startTime) > this.startTime){
                this.viewUpdated = true;
                updateView(this.props.video.id).then(()=>console.log('On playing'));
            }
        }
    }

    handleReplay(e){
        e.preventDefault();
        this.videoElement.currentTime = 0;
        this.videoElement.play();
        this.setState({replay: false})
    }

    handleEnded(e){
        e.preventDefault();
        if(!this.viewUpdated){
            this.viewUpdated = true;
            updateView(this.props.video.id).then(() => console.log('On ended'));
        }

        this.setState({replay: true})
    }

    render(){
        return (
            <>
            <div id='video-player-hook'>
                <video id="video-player"  autoPlay controls
                    onLoadedData={this.handleOnload}
                    onTimeUpdate={this.handleTimeUpdate}
                    onEnded={ this.handleEnded }>
                    <source src={this.props.video.videoUrl} type="video/mp4" />
                </video>

                    <div onClick={this.handleReplay} id={`replay-button` + (this.state.replay ? "" : "-hidden")}>
                        <i className="fas fa-redo"></i>
                    </div> 
            </div>

            {
               
            }
            </>
        )
    }
}


export default VideoPlayer;

