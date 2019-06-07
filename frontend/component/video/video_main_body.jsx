import React from 'react';
import { connect } from 'react-redux';
import {requestCreatePost, requestDeletePost, requestPosts, requestSomePosts} from '../../actions/video_post/video_posts_action';
import { withRouter } from 'react-router-dom';

class VideoMainBody extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postBody: "",
            displayFormButton: false,
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchPosts(this.props.video.id)
    }


    handleTextChange(e){
        e.preventDefault();
        const postBody = e.currentTarget.value
        this.setState({postBody})
    }

    handleClick(){
        if(!this.props.isLogin){
            this.props.history.push('/login');
        } else {
            this.setState( {displayFormButton: true})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.postBody);
        if(this.state.postBody.length > 0){
            const post = { 
                user_id: this.props.currentUser.id,
                video_id: this.props.video.id,
                description: this.state.postBody
            }

            this.props.createPost(post);
        }
    }
    
    render() {    
        //debugger
        const posts = this.props.posts.map( post => {
            return <li key={post.id}> { post.description } </li>
        })


        return (
            <div id='video-post-body'>
                <div id='user-post-form-ctn'>
                    <form id='user-post-form'>
                        <textarea 
                        onClick={this.handleClick}
                        onChange={this.handleTextChange}
                        placeholder='Add a public comment...'/>
                        <button onClick={ this.handleSubmit }>Post</button>
                    </form>
                </div>
                <ul id='list-of-posts'>
                    { posts }
                </ul>
            </div>
        )
    }
}


const msp = state => {
    return {
        isLogin: Boolean(state.session.id),
        currentUser: state.session,
        posts: Object.values(state.entities.video_posts)
    }
}

const mdp = dispatch => {
    return {
        createPost: post => dispatch(requestCreatePost(post)),
        deletePost: post_id => dispatch(requestDeletePost(post_id)),
        fetchMorePosts: (video_id, offset, limit) => dispatch( requestSomePosts(video_id, offset, limit)),
        fetchPosts: video_id => dispatch( requestPosts(video_id))
    }
}


export default withRouter(connect(msp, mdp)(VideoMainBody));