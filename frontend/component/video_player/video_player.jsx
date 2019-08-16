import React from 'react';
import ProgressBar from './progress_bar';
import DefaultControlUI from './default_control_ui';
import MiniControlUI from './mini_control_ui';
import { withRouter } from 'react-router-dom';
import {updateView} from '../../util/video_api';


class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoStatus: 'LOAD',
            fullScreen: false,
            userStream: 0,
            bufferStream: 0,
            volumeValue: 1,
            volumeTrackLength: 50,
            hoverBarLength: 0,
            maxHoverBarLength: 0, //Needs to be fixed
            currentTime: 0,
            duration: 0,
            stepper: 1,
            previousURL: "/",
            channelName: null,
        }

        this.videoElement = React.createRef();
        this.seeker = React.createRef();
        this.streamBar = React.createRef();

        this.minDuration = null;
        this.viewUpdated = false;
        this.startTime = 0;
        this.seeking = false;
        this.autoPlay = false;
        this.prevVolume = 1;

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
        this.handleSeekingClick = this.handleSeekingClick.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReplay = this.handleReplay.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.maximizeScreen = this.maximizeScreen.bind(this);
        this.normalScreen = this.normalScreen.bind(this);
        this.handleMute = this.handleMute.bind(this);
        this.handleLoadedData = this.handleLoadedData.bind(this);

        this.hoverProgressBar = this.hoverProgressBar.bind(this);
        this.leaveProgressBar = this.leaveProgressBar.bind(this);
    }

    componentDidMount() {
        this.videoElement.current.muted = false;
        this.minDuration = this.props.video.duration > 30 ? 30 : this.props.video.duration / 5;
    }


    maximizeScreen(e) {
        e.stopPropagation();
        this.setState({ fullScreen: true })
    }

    handleGoBack(e) {
        e.stopPropagation();
        this.props.history.push(this.state.previousURL);
    }

    normalScreen(e) {
        e.stopPropagation();
        this.setState({ fullScreen: false });
    }

    handleCanPlayThrough(e) {
        e.preventDefault();
        if (!this.seeking)
            this.setState({ bufferStream: 100 });
    }

    handleMiniScreen(e) {
        e.stopPropagation();
        this.props.requestMiniPlayer();
        const previousURL = `/video/${this.props.videoPlayer.video.id}`;
        const channelName = this.props.channels[0].name;
        this.setState({ previousURL, channelName, fullScreen: false });
        if (!this.props.prevPath || this.props.prevPath === '/video/:video_id')
            this.props.history.push('/');
        else
            this.props.history.goBack();
    }

    handleMute(e) {
        e.stopPropagation();
        if (this.videoElement.current.muted) {
            this.videoElement.current.muted = false;
            this.setState({ volumeValue: this.prevVolume, volumeTrackLength: Math.floor(50 * this.prevVolume) })
        } else if (parseFloat(this.state.volumeValue) === 0) {
            this.videoElement.current.volume = 1;
            this.setState({ volumeValue: 1, volumeTrackLength: 50 })
        } else {
            this.prevVolume = this.videoElement.current.volume;
            this.videoElement.current.muted = true;
            this.setState({ volumeValue: 0, volumeTrackLength: 0 })
        }
    }

    handleProgress(e) {
        e.preventDefault();
        if (!this.state.duration)
            this.setState({ duration: this.videoElement.current.duration })

        if (e.target.buffered.length > 0) {
            if (!this.seeking)
                this.setState({ bufferStream: ((e.target.buffered.end(0) - e.target.buffered.start(0)) / this.videoElement.current.duration) * 100 })
        }

    }

    handleSeeking(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.state.videoStatus !== 'PAUSE') {
            this.videoElement.current.pause();
            this.setState({ videoStatus: 'PAUSE' })
        }

        let duration = this.videoElement.current.duration;
        let currentTime = duration * (e.target.value / 100);

        this.videoElement.current.currentTime = currentTime
        const value = ((currentTime / duration ) * 100).toFixed(4);
        this.seeker.current.value = value;
        this.streamBar.current.style.width = value + '%';
    }


    handleTimeUpdate(e) {
        e.preventDefault();
        if (!this.viewUpdated) {
            if ((this.videoElement.current.currentTime - this.startTime) > this.startTime) {
                this.viewUpdated = true;
                updateView(this.props.video.id);
            }
        }

        const currentTime = this.videoElement.current.currentTime;
        const duration = this.videoElement.current.duration;

        const value = ((currentTime / duration) * 100).toFixed(4);
        this.seeker.current.value = value;
        this.streamBar.current.style.width = value + '%';
        
        if (!this.state.duration)
            this.setState({ duration, userStream: value, currentTime })
        else
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

        if (this.videoElement.current.muted)
            this.videoElement.current.muted = false

        this.videoElement.current.volume = e.target.value;
        this.setState({ volumeValue: e.target.value, volumeTrackLength: 50 * e.target.value })
    }

    handleReplay(e) {
        e.preventDefault();
        e.stopPropagation();
        this.videoElement.current.currentTime = 0;
        this.videoElement.current.play();
    }


    handlePlay(field) {
        return (e) => {
            e.stopPropagation();
            if (!field) {
                if (this.state.videoStatus !== 'LOAD')
                    this.videoElement.current.play();
            } else {
                if (this.state.videoStatus === 'PLAY')
                    this.videoElement.current.pause();
                else if (this.state.videoStatus === 'PAUSE')
                    this.videoElement.current.play();

            }
        }
    }

    handleLoadedData(e) {
        e.preventDefault();
        if (this.state.videoStatus === 'LOAD')
            this.setState({ videoStatus: null,  stepper: 100 / this.videoElement.current.duration })
    }

    handlePause(e) {
        e.stopPropagation();
        this.videoElement.current.pause();
    }

    handlePlayStatus(e) {
        if (!this.autoPlay) {
            e.currentTarget.muted = false
            this.autoPlay = true;
        }
        this.setState({ videoStatus: 'PLAY' })
    }

    handlePauseStatus(e) {
        e.preventDefault();
        this.setState({ videoStatus: 'PAUSE' });
    }

    hoverProgressBar(e) {
        let { x, width } = e.currentTarget.getBoundingClientRect();

        if (width !== this.state.maxHoverBarLength)
            this.setState({
                hoverBarLength: e.clientX - x,
                maxHoverBarLength: width
            });
        else
            this.setState({ hoverBarLength: e.clientX - x});
            
    }

    leaveProgressBar(e) {
        e.preventDefault();
        this.setState({ hoverBarLength: 0 })
    }

    renderPlayStatusButtons() {
        let button, buttonIcon, eventHandler, iconMessage;

        switch (this.state.videoStatus) {
            case 'PLAY':
                button = 'pause-button';
                buttonIcon = 'pause';
                eventHandler = this.handlePause;
                iconMessage = 'Pause'
                break;
            case 'REPLAY':
                button = 'replay-button';
                buttonIcon = 'replay';
                eventHandler = this.handleReplay;
                iconMessage = 'Replay'
                break;
            case 'PAUSE':
                button = 'play-button';
                buttonIcon = 'play_arrow';
                eventHandler = this.handlePlay();
                iconMessage = 'Play';
                break;
            default:
                button = 'play-button';
                buttonIcon = 'play_arrow';
                eventHandler = this.handlePlay();
                iconMessage = 'Play';
                break;
        }

        return (
            <div  className={`i-wrap ${button}`} onClick={eventHandler}>
                <i className="material-icons-enlarged">{buttonIcon}</i>
                <div className='i-msg-v i-pos-lft'>{iconMessage}</div>
            </div>
        )
    }

    miniDescription() {
        return (
            this.props.videoPlayer.type === 'MINI' ?
                <div className='vid-player-desc flexv-7'>
                    <span>{this.props.videoPlayer.video.title}</span>
                    <span>{this.state.channelName}</span>
                </div> : null
        )
    }

    handleSeekingClick(e) {
        e.stopPropagation();
        this.seeking = this.seeking ? false : true;
    }

    render() {

        return (
            <React.Fragment>
                <div onClick={this.handlePlay('screen')}
                    className={'vid-player-hook' + (this.state.fullScreen ? " vph-fullscn" : "")}>

                    {this.state.videoStatus === 'REPLAY' ? <div className='vid-dark-scn max-w-h' /> : null}
                    {this.state.videoStatus === 'LOAD' ? <div className='vid-ldr max-w-h flexh-1'><div className='spinner' /></div> : null}

                    <video id="video-player"
                        ref={this.videoElement}
                        muted
                        autoPlay
                        onTimeUpdate={this.handleTimeUpdate}
                        onEnded={this.handleEnded}
                        onProgress={this.handleProgress}
                        onCanPlayThrough={this.handleCanPlayThrough}
                        onPlay={this.handlePlayStatus}
                        onPause={this.handlePauseStatus}
                        onLoadedData={this.handleLoadedData}>

                        <source src={this.props.video.videoUrl} type="video/mp4" />
                    </video>

                    <div className={`max-w-h flexv-10 vid-ctrl ${this.state.videoStatus === 'PLAY' ?  'vc-play': ""}`} >
                        {
                            this.props.videoPlayer.type === 'MINI' ?
                                <MiniControlUI
                                    playButton={this.renderPlayStatusButtons()}
                                    currentTime={this.state.currentTime}
                                    duration={this.state.duration}
                                    closeButton={this.props.removeVideoPlayer}
                                    handleGoBack={this.handleGoBack}/> : null
                        }

                        <ProgressBar
                            seeker={this.seeker}
                            streamBar={this.streamBar}
                            userStream={this.state.userStream}
                            bufferStream={this.state.bufferStream}
                            handleSeeking={this.handleSeeking}
                            handleSeekingClick={this.handleSeekingClick}
                            hoverProgressBar={this.hoverProgressBar}
                            leaveProgressBar={this.leaveProgressBar}
                            videoElement={this.videoElement.current}
                            currentTime={this.state.currentTime}
                            hoverBarLength={this.state.hoverBarLength}
                            maxHoverBarLength={this.state.maxHoverBarLength}
                            duration={this.state.duration}
                            stepper={this.state.stepper}/>


                        {
                            this.props.videoPlayer.type === 'MINI' ? null :
                                <DefaultControlUI
                                    playButton={this.renderPlayStatusButtons()}
                                    volumeValue={this.state.volumeValue}
                                    volumeTrackLength={this.state.volumeTrackLength}
                                    handleVolumeChange={this.handleVolumeChange}
                                    handleMiniScreen={this.handleMiniScreen}
                                    isFullScreen={this.state.fullScreen}
                                    normalScreen={this.normalScreen}
                                    maximizeScreen={this.maximizeScreen}
                                    currentTime={this.state.currentTime}
                                    duration={this.state.duration}
                                    handleMute={this.handleMute}/>
                        }

                    </div>
                </div>
                {this.miniDescription()}
            </React.Fragment>
        )
    }
}


export default withRouter(VideoPlayer);



