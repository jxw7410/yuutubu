import React from 'react';
import ProgressBar from './progress_bar';
import DefaultControlUI from './default_control_ui';
import MiniControlUI from './mini_control_ui';
import {withRouter} from 'react-router-dom';

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
            currentTime: 0,
            duration: 0,
            previousURL: "/",
        }

        this.minDuration = null;
        this.viewUpdated = false;
        this.startTime = 0;
        this.videoElement = null;
        this.seeker = null;
        this.autoPlay = false;

        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleSeeking = this.handleSeeking.bind(this);
        this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
        this.handlePlayStatus = this.handlePlayStatus.bind(this);
        this.handlePauseStatus = this.handlePauseStatus.bind(this);
        this.renderPlayStatusButtons = this.renderPlayStatusButtons.bind(this);
        this.handleMiniScreen = this.handleMiniScreen.bind(this);
    

        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReplay = this.handleReplay.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);

        this.maximizeScreen = this.maximizeScreen.bind(this);
        this.normalScreen = this.normalScreen.bind(this);
    }

    componentDidMount() {
        this.videoElement = document.getElementById("video-player");
        this.videoElement.muted = false;
        this.seeker = document.getElementById("seeker-bar");
        this.minDuration = this.props.video.duration > 30 ? 30 : this.props.video.duration / 5;
    }

    maximizeScreen(e) {
        e.stopPropagation();
        this.setState({ fullScreen: true })
    }

    handleGoBack(e){
        e.stopPropagation();
        this.props.history.push(this.state.previousURL);
    }

    normalScreen(e) {
        e.stopPropagation();
        this.setState({ fullScreen: false });
    }

    handleCanPlayThrough(e) {
        e.preventDefault();
        this.setState({ bufferStream: 100 });
    }

    handleMiniScreen(e) {
        e.stopPropagation();
        this.props.requestMiniPlayer();
        this.setState({previousURL: `/video/${this.props.videoPlayer.video.id}`})
        this.props.history.goBack();
    }



    handleProgress(e) {
        e.preventDefault();
        if (!this.state.duration)
            this.setState({ duration: this.videoElement.duration })

        if (e.target.buffered.length > 0)
            this.setState({ bufferStream: ((e.target.buffered.end(0) - e.target.buffered.start(0)) / this.videoElement.duration) * 100 })

    }

    handleSeeking(e) {
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.pause();
        const time = this.videoElement.duration * (e.target.value / 100);
        this.videoElement.currentTime = time;
        this.setState({ videoStatus: 'PAUSE' })
    }


    handleTimeUpdate(e) {
        e.preventDefault();
        if (!this.viewUpdated) {
            if ((this.videoElement.currentTime - this.startTime) > this.startTime) {
                this.viewUpdated = true;
                updateView(this.props.video.id);
            }
        }


        const currentTime = this.videoElement.currentTime;
        const value = (currentTime / this.videoElement.duration) * 100;
        this.setState({ userStream: value, currentTime })
    }


    handleEnded(e) {
        e.preventDefault();
        if (!this.viewUpdated) {
            this.viewUpdated = true;
            updateView(this.props.video.id);
        }
        this.setState({ videoStatus: 'REPLAY' });
    }


    handleVolumeChange(e) {
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.volume = e.target.value;
        this.setState({ volumeValue: e.target.value })
    }

    handleReplay(e) {
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.currentTime = 0;
        this.videoElement.play();
    }


    handlePlay(field) {

        return (e) => {
            e.stopPropagation();
            if (!field) {
                this.videoElement.play();
            } else {
                if (this.state.videoStatus === 'PLAY')
                    this.videoElement.pause();
                else if (this.state.videoStatus === 'PAUSE')
                    this.videoElement.play();

            }
        }
    }

    handlePause(e) {
        e.stopPropagation();
        this.videoElement.pause();
    }

    handlePlayStatus(e) {
        if (!this.autoPlay) {
            $(document).ready(() => e.currentTarget.muted = false);
            this.autoPlay = true;
        }
        this.setState({ videoStatus: 'PLAY' })
    }

    handlePauseStatus(e) {
        e.preventDefault();
        this.setState({ videoStatus: 'PAUSE' });
    }




    renderPlayStatusButtons() {
        switch (this.state.videoStatus) {
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
        return (
            <>
                <div onClick={this.handlePlay('screen')}
                    id={'video-player-hook' + (this.state.fullScreen ? "-fullscreen" : "")
                    }>

                    {
                        this.state.videoStatus === 'REPLAY' ?
                            <div id="video-dark-screen" /> : null
                    }
                    <video id="video-player"
                        muted
                        autoPlay
                        onTimeUpdate={this.handleTimeUpdate}
                        onEnded={this.handleEnded}
                        onProgress={this.handleProgress}
                        onCanPlayThrough={this.handleCanPlayThrough}
                        onPlay={this.handlePlayStatus}
                        onPause={this.handlePauseStatus}
                    >
                        <source src={this.props.video.videoUrl} type="video/mp4" />
                    </video>

                    <div id={'video-control' + (this.state.videoStatus ? `-${this.state.videoStatus}` : "")} >
                        {
                            this.props.videoPlayer.type === 'MINI' ?
                            <MiniControlUI 
                                playButton={this.renderPlayStatusButtons()}
                                currentTime={this.state.currentTime}
                                duration={this.state.duration}
                                closeButton={this.props.removeVideoPlayer}
                                handleGoBack={this.handleGoBack}
                            /> : null
                        }

                        <ProgressBar
                            userStream={this.state.userStream}
                            bufferStream={this.state.bufferStream}
                            handleSeeking={this.handleSeeking}
                            videoElement={this.videoElement}
                            currentTime={this.state.currentTime}
                            duration={this.state.duration}
                        />


                        {
                            this.props.videoPlayer.type === 'MINI' ? null :
                                <DefaultControlUI
                                    playButton={this.renderPlayStatusButtons()}
                                    volumeValue={this.state.volumeValue}
                                    handleVolumeChange={this.handleVolumeChange}
                                    handleMiniScreen={this.handleMiniScreen}
                                    isFullScreen={this.state.fullScreen}
                                    normalScreen={this.normalScreen}
                                    maximizeScreen={this.maximizeScreen}
                                    currentTime={this.state.currentTime}
                                    duration={this.state.duration}
                                />
                        }

                    </div>
                </div>
                {
                    this.props.videoPlayer.type === 'MINI' ?
                        <div id='video-player-descriptions'>
                            {this.props.videoPlayer.video.title}
                        </div> : null
                }
            </>
        )
    }
}


export default withRouter(VideoPlayer);

