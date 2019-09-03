import React from 'react';
import { withRouter } from 'react-router-dom';
import VideoPost from './video_post';


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

        this.lineHeight = 18; // represent textarea line height
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
        this.props.fetchPosts(this.props.video.id, this.props.offset, 6).then(()=>{
            document.addEventListener('scroll', this.handleScroll);
            this.scrollHook = document.getElementById('video-main');
        })
    }


    handleScroll(e){
        e.preventDefault();
        let currentScrollHeight = this.scrollHook.scrollHeight;
        if (document.querySelector('html').scrollTop > (currentScrollHeight * 0.55)){
            this.props.fetchPosts(this.props.video.id, this.props.offset, 3)
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
        e.target.rows = 1;
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
        this.setState({displayFormButton: false, postBody: "", rows: 1})
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
        if (this.state.postBody.length) {
            const post = {
                user_id: this.props.currentUser.id,
                video_id: this.props.video.id,
                description: this.state.postBody.trim()
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
                <div className='usr-pst-frm-btn flexh-9'>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <button onClick={this.handleSubmit}
                        className={this.state.postBody.trim().length  ? null : 'button-disabled'}
                        disabled={this.state.postBody.trim().length ? null : 'disabled'}>Comment</button>
                </div> : null
        )
    }

    render() {
        return (
            <div className='vid-pst-bd'>
                <div className='usr-pst-frm-ctn'>
                    <div style={{fontSize: '36px'}}> <i className="fas fa-user-circle"/></div>
                    <form className='usr-pst-frm'>
                        <textarea rows={this.state.rows}
                            onFocus={this.handleFocus}
                            onClick={this.handleClick}
                            onChange={this.handleTextChange}
                            onBlur={this.handleUnfocus}
                            placeholder={ this.state.allText.length > 0 ? "" : 'Add a public comment...'}
                            value={this.state.postBody} 
                            style={{lineHeight: `${this.lineHeight}px`}}
                            />
                        <div className='txtarea-brdr flexh-2'>
                            <div className={"expander" + (this.state.border ? " exp-active" : "")} />
                        </div>
                        {this.displayButtons()}
                    </form>
                </div>
                <ul id="lopst" className='flexv-4'>{this.posts()}</ul>
            </div>
        )
    }
}



export default withRouter(VideoMainBody);