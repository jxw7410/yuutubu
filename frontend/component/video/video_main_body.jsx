import React from 'react';
import { connect } from 'react-redux';
import { requestCreatePost, requestDeletePost, requestPosts, requestSomePosts } from '../../actions/video_post/video_posts_action';
import { withRouter } from 'react-router-dom';
import VideoPost from './video_sub_components/video_post';


class VideoMainBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: "",
            allText: [],
            rows: 1,
            displayFormButton: false,
            border: false
        }

        this.lineHeight = 16; // represent textarea line height
        this.scrollHook = null;
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleUnfocus = this.handleUnfocus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleKeyPressEvent = this.handleKeyPressEvent.bind(this);
    }

    componentDidMount() {
        this.props.fetchPosts(this.props.video.id).then(()=>{
            document.addEventListener('scroll', this.handleScroll);
            this.scrollHook = document.getElementById('video-main');
        })
    }


    handleScroll(e){
        e.preventDefault();
        let currentScrollHeight = this.scrollHook.scrollHeight;
        if (document.querySelector('html').scrollTop > (currentScrollHeight * 0.55)){
            this.props.fetchMorePosts(this.props.video.id, this.props.offset, 3)
                .fail(() => {
                    document.removeEventListener('scroll', this.handleScroll);
                });
        }
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleTextChange(e) {
        e.preventDefault();
        const postBody = e.currentTarget.value
        const oldRows = e.target.rows;
        e.target.rows = 1; //Doing this causes an overflow to happen
        const newRows = Math.floor(e.target.scrollHeight / this.lineHeight);
        if (newRows === oldRows) e.target.rows = newRows;
        
        this.setState({ rows: newRows, postBody });
        
    }


    handleClick() {
        if (!this.props.isLogin) {
            this.props.history.push('/login');
        } else {
            this.setState({ displayFormButton: true })
        }
    }

    handleCancel(){
        this.setState({displayFormButton: false, postBody: ""})
    }

    handleUnfocus() {
        this.setState({ border: false })
    }

    handleFocus() {
        this.setState({ displayFormButton: true, border: true })
    }

    handleDelete(post_id){
        return e =>{
            e.preventDefault();
            this.props.deletePost(post_id)
        }
    }

    handleKeyPressEvent(e){
        if (e.key ==='Enter'){ 
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.postBody.length > 0) {
            const post = {
                user_id: this.props.currentUser.id,
                video_id: this.props.video.id,
                description: this.state.postBody
            }

            this.props.createPost(post);
            this.setState({ postBody: "", displayFormButton: false, rows: 1 });
        }
    }

    posts(){
        const posts = this.props.posts.map(post => {
            return (
                <VideoPost
                    key={post.id}
                    post={post}
                    currentUser={this.props.currentUser}
                    handleDelete={this.handleDelete}
                />
            )
        })
        return posts
    }

    displayButtons(){
        return (
            this.state.displayFormButton ?
                <div id='user-post-form-buttons'>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.handleSubmit}
                        className={this.state.postBody.length > 0 ? null : 'button-disabled'}
                        disabled={this.state.postBody.length > 0 ? null : 'disabled'}
                    >Comment</button>
                </div> : null
        )
    }

    render() {
        return (
            <div id='video-post-body'>
                <div id='user-post-form-ctn'>
                    <div id='user-form-profile-pic'> <i className="fas fa-user-circle"></i></div>
                    <form id='user-post-form'>

                        <textarea rows={this.state.rows}
                            onFocus={this.handleFocus}
                            onClick={this.handleClick}
                            onChange={this.handleTextChange}
                            onBlur={this.handleUnfocus}
                            onKeyPress={this.handleKeyPressEvent}
                            placeholder={ this.state.allText.length > 0 ? "" : 'Add a public comment...'}
                            value={this.state.postBody} 
                            style={{lineHeight: `${this.lineHeight}px`}}
                            />
                        <div id="textarea-border">
                            <div id={"expander" + (this.state.border ? "-active" : "")} />
                        </div>
                        {this.displayButtons()}
                    </form>
                </div>
                <ul className='list-of-posts'>
                    {this.posts()}
                </ul>
            </div>
        )
    }
}


const msp = state => {
    return {
        isLogin: Boolean(state.session.id),
        currentUser: state.session,
        offset: state.scrollingPaginationOffset,
        posts: Object.values(state.entities.video_posts).reverse()
    }
}

const mdp = dispatch => {
    return {
        createPost: post => dispatch(requestCreatePost(post)),
        deletePost: post_id => dispatch(requestDeletePost(post_id)),
        fetchMorePosts: (video_id, offset, limit) => dispatch(requestSomePosts(video_id, offset, limit)),
        fetchPosts: video_id => dispatch(requestPosts(video_id))
    }
}


export default withRouter(connect(msp, mdp)(VideoMainBody));