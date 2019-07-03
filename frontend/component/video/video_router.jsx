import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { fetchVideo } from '../../actions/video/video_action';
import { requestDefaultPlayer } from '../../actions/video_player';
import VideoContainer from './video_container';

//This is really boiler plate to channel router, refactor when time is alloted
class VideoRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVideo: null,
            video: null,
        }

        this.didUpdate = false;
    }

    componentDidMount() {
        //Perhaps instead of having like dislike listen for video, maybe this sets it?
        this.props.fetchVideo(this.props.match.params.video_id)
            .then(() => {
                this.didUpdate = true;
                this.setState({ isVideo: true })
            })
            .fail(() => {
                this.didUpdate = true
                this.setState({ isVideo: false })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.url !== this.props.match.url) {
            this.props.fetchVideo(this.props.match.params.video_id)
                .then(() => {
                    this.didUpdate = true;
                    this.setState({ isVideo: true })
                })
                .fail(() => {
                    this.didUpdate = true
                    this.setState({ isVideo: false })
                })
        }
        else
            this.didUpdate = true;
    }

    render() {
        if (this.didUpdate) {
            this.didUpdate = false;
            return (
                <Route
                    path={this.props.path}
                    exact={this.props.exact}
                    render={props => (
                        this.state.isVideo ? 
                        <VideoContainer {...props} 
                            video_id={this.props.match.params.video_id}
                            url={this.props.match.url}
                            /> : <Redirect to='/' />
                    )}
                />
            )
        } else {
            return (
                <div/>
            )
        }
    }

}



const mdp = dispatch => {
    return {
        fetchVideo: video_id => dispatch(fetchVideo(video_id)),
        requestDefaultPlayer: () => dispatch(requestDefaultPlayer())
    }
}

export default connect(null, mdp)(VideoRouter);