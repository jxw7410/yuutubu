import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    createLikeDislike,
    updateLikeDislike,
    deleteLikeDislike,
    requestClearLikeDislike
} from '../../../actions/like/like_dislike_action';

import VideoInfoBody from './video_info_body';


class VideoInfoHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likeCount: 0,
            dislikeCount: 0,
        }

        this.dislike = false;
        this.like = true;
        this.fetching = false;

        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        this.state.likeCount = this.props.video.likeCount;
        this.state.dislikeCount = this.props.video.dislikeCount;
    }

    componentWillUnmount() {
        this.props.clearLikeDislike();
    }

    handleLike() {
        if (this.props.like_dislike.is_liked === this.like)
            this.props.deleteLikeDislike(this.props.like_dislike.id)
                .then(() => {
                    this.fetching = false
                    this.setState({ likeCount: this.state.likeCount - 1 })
                })
                .fail(() => this.fetching = false)
        else if (this.props.like_dislike.is_liked === this.dislike)
            this.props.updateLikeDislike(this.props.like_dislike.id, true)
                .then(() => {
                    this.fetching = false
                    this.setState({ likeCount: this.state.likeCount + 1, dislikeCount: this.state.dislikeCount - 1 })
                })
                .fail(() => this.fetching = false)
        else
            this.props.createLikeDislike(this.props.video.id, true)
                .then(() => {
                    this.fetching = false
                    this.setState({ likeCount: this.state.likeCount + 1 })
                })
                .fail(() => this.fetching = false)
    }

    handleDislike() {
        if (this.props.like_dislike.is_liked === this.dislike)
            this.props.deleteLikeDislike(this.props.like_dislike.id)
                .then(() => {
                    this.fetching = false
                    this.setState({ dislikeCount: this.state.dislikeCount - 1 })
                })
                .fail(() => this.fetching = false)
        else if (this.props.like_dislike.is_liked === this.like)
            this.props.updateLikeDislike(this.props.like_dislike.id, false)
                .then(() => {
                    this.fetching = false;
                    this.setState({ likeCount: this.state.likeCount - 1, dislikeCount: this.state.dislikeCount + 1 })
                })
                .fail(() => this.fetching = false)
        else
            this.props.createLikeDislike(this.props.video.id, false)
                .then(() => {
                    this.fetching = false
                    this.setState({ dislikeCount: this.state.dislikeCount + 1 })
                })
                .fail(() => this.fetching = false)
    }

    handleClick(field) {
        return (e) => {
            e.preventDefault();
            if (this.props.isLogin) {
                if (!this.fetching) {
                    this.fetching = true;
                    switch (field) {
                        case this.like:
                            this.handleLike()
                            break;
                        case this.dislike:
                            this.handleDislike()
                            break;
                    }
                }

            } else
                this.props.history.push('/login')
        }

    }

    likeDislikeRatio(){
        if (this.state.likeCount === 0 && this.state.dislikeCount === 0) 
            return 0.5;
        else 
            return this.state.likeCount / (this.state.likeCount + this.state.dislikeCount)
    }


    likeDislikeButton(field, count, icon){
        let classExtension = this.props.like_dislike.is_liked === field ? " voted" : "";
        return (
            <span onClick={this.handleClick(field)}>
                <i className={"material-icons" + classExtension}>{icon}</i>
                <span className='like-counts'>{count}</span>
            </span>
        )
    }

    render() {
        return (
            <>
                <div id='video-info-header'>
                    <section>{this.props.video.title}</section>
                    <section>
                        <span>{this.props.video.views} views</span>
                        <div id='video-info-header-utils'>
                            <section id='vid-like-dislike-icons'>
                                {this.likeDislikeButton(this.like, this.state.likeCount, 'thumb_up')}
                                {this.likeDislikeButton(this.dislike, this.state.dislikeCount, 'thumb_down')}
                            </section>
                            <div id="like-dislike-bar">
                                <div id={"like-ratio-bar" + (this.props.like_dislike.is_liked === undefined ? "" : "-voted")}
                                    style={{ width: `${this.likeDislikeRatio() * 100}%` }} />
                            </div>
                        </div>
                    </section>
                </div>
                <VideoInfoBody {...this.props} />
            </>
        )
    }
}


const msp = state => {
    return {
        isLogin: Boolean(state.session.id),
        like_dislike: state.entities.like,
        user: state.session
    }
}

const mdp = dispatch => {
    return {
        createLikeDislike: (video_id, bool) => dispatch(createLikeDislike(video_id, bool)),
        updateLikeDislike: (id, bool) => dispatch(updateLikeDislike(id, bool)),
        deleteLikeDislike: id => dispatch(deleteLikeDislike(id)),
        clearLikeDislike: () => dispatch(requestClearLikeDislike())
    }
}



export default withRouter(connect(msp, mdp)(VideoInfoHeader));