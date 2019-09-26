import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createLikeDislike,
  updateLikeDislike,
  deleteLikeDislike,
  requestClearLikeDislike
} from '../../actions/like/like_dislike_action';

import VideoInfoBody from './video_info_body';

// React Hook
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

  handleLikeDislike(field, count, bool) {
    if (this.props.like_dislike.is_liked === undefined)
      this.props.createLikeDislike(this.props.video.id, bool)
        .then(() => {
          this.fetching = false;
          this.setState({ [count]: this.state[count] + 1 })
        }).fail(() => this.fetching = false)
    else if (this.props.like_dislike.is_liked === field)
      this.props.deleteLikeDislike(this.props.like_dislike.id)
        .then(() => {
          this.fetching = false;
          this.setState({ [count]: this.state[count] - 1 })
        }).fail(() => this.fetching = false)
    else
      this.props.updateLikeDislike(this.props.like_dislike.id, bool)
        .then(() => {
          const oppCount = count === 'likeCount' ? 'dislikeCount' : 'likeCount'
          this.fetching = false;
          this.setState({ [count]: this.state[count] + 1, [oppCount]: this.state[oppCount] - 1 })
        })

  }

  handleClick(field) {
    return (e) => {
      e.preventDefault();
      if (this.props.isLogin) {
        if (!this.fetching) {
          this.fetching = true;
          switch (field) {
            case this.like:
              this.handleLikeDislike(field, 'likeCount', true)
              break;
            case this.dislike:
              this.handleLikeDislike(field, 'dislikeCount', false)
              break;
          }
        }
      } else
        this.props.history.push('/login')
    }

  }

  likeDislikeRatio() {
    if (this.state.likeCount === 0 && this.state.dislikeCount === 0)
      return 0.5;
    else
      return this.state.likeCount / (this.state.likeCount + this.state.dislikeCount)
  }


  likeDislikeButton(field, count, icon) {
    let classExtension = this.props.like_dislike.is_liked === field ? " voted" : "";
    return (
      <span className='flexh-1' onClick={this.handleClick(field)}>
        <i className={"material-icons" + classExtension}>{icon}</i>
        <span className='like-counts'>{count}</span>
      </span>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className='vid-info-hdr'>
          <section className='flexh-8'>{this.props.video.title}</section>
          <section className='flexh-6'>
            <span>{this.props.video.views} views</span>
            <div className='vid-info-hdr-utils flexv-1'>
              <section className='vid-ld-i flexh-6'>
                {this.likeDislikeButton(this.like, this.state.likeCount, 'thumb_up')}
                {this.likeDislikeButton(this.dislike, this.state.dislikeCount, 'thumb_down')}
              </section>
              <div className="ld-bar">
                <div className={"ldr-bar" + (this.props.like_dislike.is_liked === undefined ? "" : " ldrb-voted")}
                  style={{ width: `${this.likeDislikeRatio() * 100}%` }} />
              </div>
            </div>
          </section>
        </div>
        <VideoInfoBody {...this.props} />
      </React.Fragment>
    )
  }
}


const msp = state => ({
  isLogin: Boolean(state.session.id),
  like_dislike: state.entities.like,
  user: state.session
})

const mdp = dispatch => ({
  createLikeDislike: (video_id, bool) => dispatch(createLikeDislike(video_id, bool)),
  updateLikeDislike: (id, bool) => dispatch(updateLikeDislike(id, bool)),
  deleteLikeDislike: id => dispatch(deleteLikeDislike(id)),
  clearLikeDislike: () => dispatch(requestClearLikeDislike())
})



export default withRouter(connect(msp, mdp)(VideoInfoHeader));