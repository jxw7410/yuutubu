import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    createDislike,
    createLike,
    createDislikeDestroyLike,
    createLikeDestroyDislike,
    deleteDislike,
    deleteLike
} from '../../../actions/like/like_dislike_action';

import VideoInfoBody from './video_info_body';


class VideoInfoHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likeCount: 0,
            dislikeCount: 0,
        }

        this.dislike = 'DISLIKES';
        this.like = "LIKES";
        this.fetching = false;

        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        this.state.likeCount = this.props.video.likeCount;
        this.state.dislikeCount = this.props.video.dislikeCount;
    }



    handleClick(field) {
        return (e) => {
            e.preventDefault();
            if (this.props.isLogin) {
                if (!this.fetching) {
                    this.fetching = true;
                    switch (this.props.like_dislike.category) {
                        case this.like:
                            if (this.like === field)
                                this.props.deleteLike(this.props.like_dislike.id).then(() => {
                                    this.fetching = false;
                                    this.setState({ likeCount: this.state.likeCount - 1 })
                                });
                            else
                                this.props.createDislikeDestroyLike(this.props.like_dislike.id, this.props.video.id).then(() => {
                                    this.fetching = false;
                                    this.setState({
                                        dislikeCount: this.state.dislikeCount + 1,
                                        likeCount: this.state.likeCount - 1
                                    });
                                });
                            break
                        case this.dislike:
                            if (this.dislike === field)
                                this.props.deleteDislike(this.props.like_dislike.id).then(() => {
                                    this.fetching = false;
                                    this.setState({ dislikeCount: this.state.dislikeCount - 1 })
                                });
                            else
                                this.props.createLikeDestroyDislike(this.props.like_dislike.id, this.props.video.id)
                                    .then(() => {
                                        this.fetching = false;
                                        this.setState({
                                            dislikeCount: this.state.dislikeCount - 1,
                                            likeCount: this.state.likeCount + 1
                                        });
                                    });
                            break
                        default:
                            if (field === this.like)
                                this.props.createLike(this.props.video.id).then(() => {
                                    this.fetching = false;
                                    this.setState({ likeCount: this.state.likeCount + 1 });
                                });
                            else
                                this.props.createDislike(this.props.video.id).then(() => {
                                    this.fetching = false;
                                    this.setState({ dislikeCount: this.state.dislikeCount + 1 });
                                });
                    }
                }

            } else
                this.props.history.push('/login')

        }

    }

    render() {
        let likeRatio;

        if (this.state.likeCount === 0 && this.state.dislikeCount === 0) {
            likeRatio = 0.5;
        } else {
            likeRatio = this.state.likeCount / (this.state.likeCount + this.state.dislikeCount)
        }

        return (
            <>
                <div id='video-info-header'>
                    <section>{this.props.video.title}</section>
                    <section>
                        <span>{this.props.video.views} views</span>
                        <div id='video-info-header-utils'>
                            <section id='vid-like-dislike-icons'>
                                <span onClick={this.handleClick(this.like)}>
                                    <i className={"material-icons"
                                        + (this.props.like_dislike.category === this.like ? " voted" : "")
                                    }>thumb_up</i>
                                    <span className='like-counts'>
                                        {this.state.likeCount}
                                    </span>
                                </span>

                                <span onClick={this.handleClick(this.dislike)}>
                                    <i className={"material-icons"
                                        + (this.props.like_dislike.category === this.dislike ? " voted" : "")
                                    }>thumb_down</i>
                                    <span className='like-counts'>
                                        {this.state.dislikeCount}
                                    </span>
                                </span>
                            </section>
                            <div id="like-dislike-bar">
                                <div id={"like-ratio-bar" + (this.props.like_dislike.category ? "-voted" : "")}
                                    style={{ width: `${likeRatio * 100}%` }} />
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
        createLike: video_id => dispatch(createLike(video_id)),
        createDislike: video_id => dispatch(createDislike(video_id)),
        deleteLike: id => dispatch(deleteLike(id)),
        deleteDislike: id => dispatch(deleteDislike(id)),
        createDislikeDestroyLike: (id, video_id) => dispatch(createDislikeDestroyLike(id, video_id)),
        createLikeDestroyDislike: (id, video_id) => dispatch(createLikeDestroyDislike(id, video_id))
    }
}




export default withRouter(connect(msp, mdp)(VideoInfoHeader));