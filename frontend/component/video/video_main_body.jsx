import React from 'react';
import { connect } from 'react-redux';
import { requestCreatePost, requestDeletePost, requestPosts, requestSomePosts } from '../../actions/video_post/video_posts_action';
import { withRouter } from 'react-router-dom';

class VideoMainBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postBody: "",
            displayFormButton: false,
            border: false
        }

        this.scrollHook = null;
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleUnfocus = this.handleUnfocus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
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
        if ($(document).scrollTop() > (currentScrollHeight * 0.55)){
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
        this.setState({ postBody })
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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.postBody);
        if (this.state.postBody.length > 0) {
            const post = {
                user_id: this.props.currentUser.id,
                video_id: this.props.video.id,
                description: this.state.postBody
            }

            this.props.createPost(post);
            this.setState({ postBody: "" });
        }
    }

    render() {
        //debugger
    
        const posts = this.props.posts.map(post => {
            return (
                <li key={post.id}>
                    <div className='video-posts'>
                        <div className='video-posts-row-1'>
                            <div className='video-posts-row-1-col-1'>
                                <i className="fas fa-user-circle"></i>
                            </div>
                            <div className='video-posts-row-1-col-2'>
                                <div className='video-posts-row-1-col-2-header'>
                                    <div className='video-posts-row-1-col-2-header-left'>
                                        <span>{post.user}</span>
                                        <span>{post.created_at}</span>
                                    </div>
                                    { 
                                        parseInt(this.props.currentUser.id) === post.user_id ?
                                            <button className="form-delete-button" 
                                                onClick={this.handleDelete(post.id)}>Delete</button> : null
                                    }
                                </div>
                                <div className='video-posts-row-1-col-2-body'>
                                    <div>{post.description}</div>
                                </div>
                                <div className='video-posts-row-1-col-2-footer'> </div>
                            </div>
                        </div>
                        <div className='video-posts-row-2'>

                        </div>
                    </div>
                </li>
            )
        })


        return (
            <div id='video-post-body'>
                <div id='user-post-form-ctn'>
                    <div id='user-form-profile-pic'> <i className="fas fa-user-circle"></i></div>
                    <form id='user-post-form'>
                        <textarea
                            onFocus={this.handleFocus}
                            onClick={this.handleClick}
                            onChange={this.handleTextChange}
                            onBlur={this.handleUnfocus}
                            placeholder='Add a public comment...' value={this.state.postBody} />
                        <div id="textarea-border">
                            <div id={"expander" + (this.state.border ? "-active" : "")} />
                        </div>
                        {
                            this.state.displayFormButton ?
                                <div id='user-post-form-buttons'>
                                    <button onClick={this.handleCancel}>Cancel</button>
                                    <button onClick={this.handleSubmit}
                                        className={this.state.postBody.length > 0 ? null : 'button-disabled'}
                                        disabled={this.state.postBody.length > 0 ? null : 'disabled'}
                                        >Comment</button>
                                </div> : null

                        }

                    </form>
                </div>
                <ul className='list-of-posts'>
                    {posts}
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