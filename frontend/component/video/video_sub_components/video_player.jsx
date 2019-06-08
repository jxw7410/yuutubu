import React from 'react';


const updateView = video_id => {
    return $.ajax({
        method: 'patch',
        url: `/api/videos/${video_id}/views`
    })
}


class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoStatus: null,
            fullScreen: false,
            userStream: 0,
            bufferStream: 0,
            volumeValue: 1,
            seekerValue: 0, 
            miniScreen: false,
        }

        this.minDuration = null;
        this.viewUpdated = false;
        this.startTime = 0;
        this.videoElement = null;
        this.seeker = null;
        this.autoPlay = false;
        this.prevVideoId = null;

        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleSeeking = this.handleSeeking.bind(this);
        this.handleCanPlayThrough =this.handleCanPlayThrough.bind(this);
        this.handlePlayStatus = this.handlePlayStatus.bind(this);
        this.handlePauseStatus = this.handlePauseStatus.bind(this);
        this.renderPlayStatusButtons = this.renderPlayStatusButtons.bind(this);
        this.handleCanPlay = this.handleCanPlay.bind(this);
        this.handleMiniScreen = this.handleMiniScreen.bind(this);

        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReplay = this.handleReplay.bind(this);


        this.maximizeScreen = this.maximizeScreen.bind(this);
        this.normalScreen = this.normalScreen.bind(this);
    }

    componentDidMount() {
        this.videoElement = document.getElementById("video-player");
        this.videoElement.muted = false;
        this.prevVideoId =  this.props.video.id;
        this.seeker = document.getElementById("seeker-bar");
        this.minDuration = this.props.video.duration > 30 ? 30 : this.props.video.duration / 5;
    }

    componentDidUpdate(){
        if(this.props.video.id != this.prevVideoId){
            this.prevVideoId = this.props.video.id;
            this.props.requestDefaultPlayer();
        }
    }

    maximizeScreen(e){
        e.stopPropagation();
        this.setState({fullScreen: true})
    }

    normalScreen(e){
        e.stopPropagation();
        this.setState({fullScreen: false});
    }

    handleCanPlayThrough(e){
        e.preventDefault();
        this.setState({bufferStream: 100});
    }
    
    handleCanPlay(){
    } 
    
    handleMiniScreen(e){
       e.stopPropagation();
       this.setState({miniScreen: true});
       this.props.requestMiniPlayer();
       this.props.history.push('/');

    }

    handleSeeking(e){
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.pause();
        const time = this.videoElement.duration * (e.target.value / 100);
        this.videoElement.currentTime = time;

    }

    handleProgress(e) {
        e.preventDefault();
        if (e.target.buffered.length > 0)
            this.setState({ bufferStream: ((e.target.buffered.end(0) - e.target.buffered.start(0)) / this.videoElement.duration) * 100 })

    }

    handleTimeUpdate(e) {
        e.preventDefault();
        if (!this.viewUpdated) {
            if ((this.videoElement.currentTime - this.startTime) > this.startTime) {
                this.viewUpdated = true;
                updateView(this.props.video.id);
            }
        }

        const value = (this.videoElement.currentTime / this.videoElement.duration) * 100;
        this.setState({ userStream: value, seekerValue: value })
    }


    handleEnded(e) {
        e.preventDefault();
        if (!this.viewUpdated) {
            this.viewUpdated = true;
            updateView(this.props.video.id);
        }
        this.setState({ videoStatus: 'REPLAY' });
    }


    handleVolumeChange(e){
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.volume = e.target.value;
        this.setState({volumeValue: e.target.value})
    }

    handleReplay(e) {
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.currentTime = 0;
        this.videoElement.play();
    }


    handlePlay(field) {

        return (e)=>{
            e.stopPropagation();
            if(!field){
                this.videoElement.play();
            }else{
                if(this.state.videoStatus === 'PLAY')
                    this.videoElement.pause();
                else if ( this.state.videoStatus === 'PAUSE')
                    this.videoElement.play(); 

            }
        }
    }

    handlePause(e){
        e.stopPropagation();
        this.videoElement.pause();
    }

    handlePlayStatus(e){
        if (!this.autoPlay){
            $(document).ready(() => e.currentTarget.muted = false);
            this.autoPlay = true;
        }
        this.setState({videoStatus: 'PLAY'})
    }

    handlePauseStatus(e){
        e.preventDefault();
        this.setState({videoStatus: 'PAUSE'});
    }




    renderPlayStatusButtons(){
        switch(this.state.videoStatus){
            case 'PLAY':
                return <div id='pause-button' onClick={this.handlePause}> <i className="material-icons">pause</i></div> 
            case 'REPLAY':
                return <div id='replay-button' onClick={this.handleReplay}> <i className="material-icons"> replay </i></div>
            case 'PAUSE':
                return <div id='play-button' onClick={this.handlePlay()}><i className="material-icons">play_arrow</i></div> 
            default:
                return <div id='play-button' onClick={this.handlePlay()}><i className="material-icons">play_arrow</i></div> 
        }
    }

    render() {
        const playButton = this.renderPlayStatusButtons();
        return (
            <>
                <div onClick={this.handlePlay('screen')} 
                    id={'video-player-hook' + (this.state.fullScreen ? "-fullscreen" : "")}>
                    <video id="video-player"
                        muted
                        autoPlay
                        onTimeUpdate={ this.handleTimeUpdate}
                        onEnded={this.handleEnded}
                        onProgress={this.handleProgress} 
                        onCanPlay={this.handleCanPlay}
                        onCanPlayThrough={ this.handleCanPlayThrough  }
                        onPlay={this.handlePlayStatus}
                        onPause={this.handlePauseStatus}
                        >
                        <source src={this.props.video.videoUrl} type="video/mp4" />
                    </video>

                    <div id='video-control'>

                        <div id='progress-bar'>
                            <div id='user-streamed' style={{ width: this.state.userStream + "%" }} />
                            <div id='buffer-streamed' style={{ width: this.state.bufferStream + "%" }} />

                            <input id='seeker-bar' type='range' value={this.state.seekerValue}
                                onMouseDown={e => e.stopPropagation()}
                                onClick={e => e.stopPropagation()}
                                onChange={this.handleSeeking} onMouseUp={() => setTimeout(() => this.videoElement.play(), 0)}
                            />
                        </div>


                        <div id='video-control-ui'>
                            <section>
                                <div id='play-pause-hook'>
                                    {playButton}
                                </div>

                                <div id='volume-control-div'>
                                    <i 
                                        onClick={e => e.stopPropagation()}
                                    className="material-icons">volume_up</i>
                                    <input id='volume-control' type="range" min="0" max="1" step="0.1" value={this.state.volumeValue}
                                        onMouseDown={e => e.stopPropagation()}
                                        onClick={e => e.stopPropagation()}
                                        onChange={this.handleVolumeChange} />
                                </div>
                            </section>

                            <section>
                                <div  onClick={this.handleMiniScreen}>
                                    <i className="material-icons">
                                        branding_watermark</i>
                                </div>
                                {
                                    this.state.fullScreen ?
                                        <div onClick={this.normalScreen}>
                                            <i className="material-icons">fullscreen_exit</i>
                                        </div>
                                        :
                                        <div onClick={this.maximizeScreen}>
                                            <i className="material-icons">fullscreen</i>
                                        </div>
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default VideoPlayer;

