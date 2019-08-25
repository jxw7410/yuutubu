import React from 'react';
import ProgressBar from './progress_bar';
import DefaultControlUI from './default_control_ui';
import MiniControlUI from './mini_control_ui';
import { withRouter } from 'react-router-dom';
import { updateView } from '../../util/video_api';
import {LOAD, PLAY, PAUSE, REPLAY, MINI} from '../../util/constants';


class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoStatus: LOAD,
            fullScreen: false,
            userStream: 0,
            bufferStream: 0,
            volumeValue: localStorage.getItem('volume') || 1,
            volumeTrackLength: Math.floor(50 * (localStorage.getItem('volume') || 1)),
            hoverBarLength: 0,
            maxHoverBarLength: 0, //Needs to be fixed
            currentTime: 0,
            duration: 0,
            stepper: 1,
            previousURL: "/",
            channelName: null,
            renderBtn: false,
        }

        this.videoElementContainer = React.createRef();
        this.videoElement = React.createRef();
        this.seeker = React.createRef();
        this.streamBar = React.createRef();

        this.minDuration = null;
        this.viewUpdated = false;
        this.startTime = 0;
        this.autoPlay = false;

        /*  Handlers */
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleSeeking = this.handleSeeking.bind(this);
        this.handlePlayStatus = this.handlePlayStatus.bind(this);
        this.handlePauseStatus = this.handlePauseStatus.bind(this);
        this.handleMiniScreen = this.handleMiniScreen.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReplay = this.handleReplay.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleMute = this.handleMute.bind(this);
        this.handleLoadedData = this.handleLoadedData.bind(this);
        this.handleDBClick = this.handleDBClick.bind(this);
        this.handleCanPlay = this.handleCanPlay.bind(this);
        this.handleWaiting = this.handleWaiting.bind(this);

        /* Other events */
        this.maximizeScreen = this.maximizeScreen.bind(this);
        this.normalScreen = this.normalScreen.bind(this);
        this.hoverProgressBar = this.hoverProgressBar.bind(this);
        this.leaveProgressBar = this.leaveProgressBar.bind(this);
        this.fullScreenChangeEvent = this.fullScreenChangeEvent.bind(this);
    }

    componentDidMount() {
        this.videoElement.current.muted = false;
        this.minDuration = this.props.video.duration > 30 ? 30 : this.props.video.duration / 5;
        document.addEventListener('fullscreenchange', this.fullScreenChangeEvent)
    }


    componentWillUnmount() {
        document.removeEventListener('fullscreenchange', this.fullScreenChangeEvent)
    }

    fullScreenChangeEvent(e) {
        e.preventDefault();
        if (this.state.fullScreen)
            this.setState({ fullScreen: false })
        else
            this.setState({ fullScreen: true })
    }

    normalScreen(e) {
        e.stopPropagation();
        document.exitFullscreen()
    }

    maximizeScreen(e) {
        e.stopPropagation();
        this.videoElementContainer.current.requestFullscreen();
    }

    handleMiniScreen(e) {
        e.stopPropagation();
        if (this.state.fullScreen)
            document.exitFullscreen().then(() => this.minifyScreen())
        else
            this.minifyScreen();
    }

    minifyScreen() {
        this.props.requestMiniPlayer();
        const previousURL = `/video/${this.props.videoPlayer.video.id}`;
        const channelName = this.props.channels[0].name;
        this.setState({ previousURL, channelName });
        if (!this.props.prevPath || this.props.prevPath === '/video/:video_id')
            this.props.history.push('/');
        else
            this.props.history.goBack();
    }


    handleDBClick(e) {
        if (this.state.fullScreen)
            this.normalScreen(e);
        else
            this.maximizeScreen(e);
    }

    handleGoBack(e) {
        e.stopPropagation();
        this.props.history.push(this.state.previousURL);
    }

    handleMute(e) {
        e.stopPropagation();
        if (this.videoElement.current.muted) {
            const volume = localStorage.getItem('volume') || 1;
            this.videoElement.current.muted = false;
            this.setState({ volumeValue: volume, volumeTrackLength: Math.floor(50 * volume) })
        } else if (parseFloat(this.state.volumeValue) === 0) {
            this.videoElement.current.volume = 0.5;
            localStorage.setItem('volume', 0.5);
            this.setState({ volumeValue: 0.5, volumeTrackLength: 25 })
        } else {
            localStorage.setItem('volume', this.videoElement.current.volume)
            this.videoElement.current.muted = true;
            this.setState({ volumeValue: 0, volumeTrackLength: 0 })
        }
    }


    /* 
        This function is very perculiar reason being the buffer.end represents where the end of the buffer is.
        However because seeking can segment the buffer, the buffer end is subjected to changes such that the range
        is used account for the segmentation. end(range) is relative the duration of the video.
    */
    handleProgress(e) {
        e.preventDefault();
        let range = 0;
        const buffered = e.target.buffered;
        if (buffered.length) {
            const time = e.target.currentTime;
            /* 
                This while loop is to adjust in case a user jumps ahead in the video
                The buffered end changes, and the current time should never be less than what
                is available on the buffer
            */
            while (!(time <= buffered.end(range))) {
                range += 1;
                // range cannot be greater than or equal to buffered length
                if (range == buffered.length) 
                    break;
            }

            if (range != buffered.length) {
                let loadEndPercent = buffered.end(range) / e.target.duration;
                this.setState({ bufferStream: (loadEndPercent) * 100 })
            }
        } 

    }

    handleLoadedData(e) {
        e.preventDefault();
        if (!this.state.duration) {
            this.setState({ duration: this.videoElement.current.duration })
        }

        this.videoElement.current.volume = this.state.volumeValue;

        if (this.state.videoStatus === LOAD){
            this.setState({ videoStatus: null, stepper: 100 / this.videoElement.current.duration })
        }
    }


    handleSeeking(e) {
        e.preventDefault();
        e.stopPropagation();

        let duration = this.videoElement.current.duration;
        let currentTime = duration * (e.target.value / 100);
        this.videoElement.current.currentTime = currentTime;


        const value = ((currentTime / duration) * 100).toFixed(4);
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
        this.setState({ videoStatus: REPLAY });
    }


    handleVolumeChange(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.videoElement.current.muted)
            this.videoElement.current.muted = false

        this.videoElement.current.volume = e.target.value;
        localStorage.setItem('volume', this.videoElement.current.volume);
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
                if (this.state.videoStatus !== LOAD)
                    this.videoElement.current.play();
            } else {
                if (this.state.videoStatus === PLAY)
                    this.videoElement.current.pause();
                else if (this.state.videoStatus === PAUSE)
                    this.videoElement.current.play();
            }
        }
    }

    renderFadingStatus() {
        return new Promise(resolve => {
            this.setState({ renderBtn: true })
            resolve();
        }).then(() => {
            setTimeout(() => this.setState({ renderBtn: false }))
        });
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
        this.setState({ videoStatus: PLAY })
    }

    handlePauseStatus(e) {
        e.preventDefault();
        this.setState({ videoStatus: PAUSE });
    }

    hoverProgressBar(e) {
        let { x, width } = e.currentTarget.getBoundingClientRect();

        if (width !== this.state.maxHoverBarLength)
            this.setState({
                hoverBarLength: e.clientX - x,
                maxHoverBarLength: width
            });
        else
            this.setState({ hoverBarLength: e.clientX - x });

    }

    leaveProgressBar(e) {
        e.preventDefault();
        this.setState({ hoverBarLength: 0 })
    }

    renderPlayStatusButtons() {
        let button, buttonIcon, eventHandler, iconMessage;

        switch (this.state.videoStatus) {
            case PLAY:
                button = 'pause-button';
                buttonIcon = 'pause';
                eventHandler = this.handlePause;
                iconMessage = 'Pause'
                break;
            case REPLAY:
                button = 'replay-button';
                buttonIcon = 'replay';
                eventHandler = this.handleReplay;
                iconMessage = 'Replay'
                break;
            case PAUSE:
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
            <div className={`i-wrap ${button}`} onClick={eventHandler}>
                <i className="material-icons-enlarged">{buttonIcon}</i>
                <div className='i-msg-v i-pos-lft'>{iconMessage}</div>
            </div>
        )
    }


    miniDescription() {
        return (
            this.props.videoPlayer.type === MINI ?
                <div className='vid-player-desc flexv-7'>
                    <span>{this.props.videoPlayer.video.title}</span>
                    <span>{this.state.channelName}</span>
                </div> : null
        )
    }


    handleCanPlay(e) {
        if(this.state.videoStatus !== PAUSE){
            this.setState({ videoStatus: PLAY })   
            e.target.play()
        }
    }

    handleWaiting(e){
        this.setState({videoStatus: LOAD})
    }

    render() {
        return (
            <React.Fragment>
                <div ref={this.videoElementContainer}
                    onClick={this.handlePlay('screen')}
                    onDoubleClick={this.handleDBClick}
                    className={'vid-player-hook' + (this.state.fullScreen ? " vph-full" : "")}
                >

                    {this.state.videoStatus === REPLAY ? <div className='vid-dark-scn max-w-h' /> : null}
                    {this.state.videoStatus === LOAD ? <div className='vid-ldr max-w-h flexh-1'><div className='spinner' /></div> : null}
                    
                    {/* The t=? is to force a non cache video, browser caches videos by default.*/}
                    <video id="video-player"
                        ref={this.videoElement}
                        muted
                        preload='auto'
                        onCanPlay={this.handleCanPlay}
                        onTimeUpdate={this.handleTimeUpdate}
                        onEnded={this.handleEnded}
                        onProgress={this.handleProgress}
                        onPlay={this.handlePlayStatus}
                        onPause={this.handlePauseStatus}
                        onLoadedData={this.handleLoadedData}
                        onWaiting={this.handleWaiting}
                        >
                        <source src={this.props.video.videoUrl + `t=?${new Date()}`} type="video/mp4" />
                    </video>

                    <div className={`max-w-h flexv-10 vid-ctrl ${this.state.videoStatus === PLAY ? 'vc-play' : ""}`} >
                        {
                            this.props.videoPlayer.type === MINI ?
                                <MiniControlUI
                                    playButton={this.renderPlayStatusButtons()}
                                    currentTime={this.state.currentTime}
                                    duration={this.state.duration}
                                    closeButton={this.props.removeVideoPlayer}
                                    handleGoBack={this.handleGoBack} /> : null
                        }

                        <ProgressBar
                            seeker={this.seeker}
                            streamBar={this.streamBar}
                            userStream={this.state.userStream}
                            bufferStream={this.state.bufferStream}
                            handleSeeking={this.handleSeeking}
                            hoverProgressBar={this.hoverProgressBar}
                            leaveProgressBar={this.leaveProgressBar}
                            videoElement={this.videoElement.current}
                            currentTime={this.state.currentTime}
                            hoverBarLength={this.state.hoverBarLength}
                            maxHoverBarLength={this.state.maxHoverBarLength}
                            duration={this.state.duration}
                            stepper={this.state.stepper} />


                        {
                            this.props.videoPlayer.type === MINI ? null :
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
                                    handleMute={this.handleMute} />
                        }

                    </div>
                </div>
                {this.miniDescription()}
            </React.Fragment>
        )
    }
}


export default withRouter(VideoPlayer);



