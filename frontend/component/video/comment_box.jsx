import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestCreatePost } from '../../actions/video_post/video_posts_action';

const CommentBox = props => {
  const [state, setBoxState] = React.useState({
    userInput: "",
    rows: 1,
    displayButton: false,
    displayBorder: false,
  });
  const textBoxLineHeight = 18; //18px, lit

  function handleTextInput(e) {
    e.preventDefault();
    const userInput = e.target.value;
    const oldRows = e.target.rows;
    e.target.rows = 1; // This has to be for the bottom calculation to work.
    const rows = Math.floor(e.target.scrollHeight / textBoxLineHeight);
    if (rows === oldRows) e.target.rows = rows;
    setBoxState({ ...state, rows, userInput })
  }


  function cancelTextBox(e) {
    e.preventDefault();
    setBoxState({
      ...state,
      displayButton: false,
      userInput: "",
      rows: 1,
    });
  }

  function handleFocus(e) {
    e.preventDefault()
    setBoxState({
      ...state,
      displayButton: true,
      border: true,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    if (!props.isLogin) {
      props.history.push('/login')
    } else {
      setBoxState({ ...state, displayButton: true })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.userInput.length) {
      props.createPost({
        video_id: props.video.id,
        description: state.userInput.trim(),
      });
      cancelTextBox();
    }
  }

  return (
    <form className='comment-form'>
      <textarea
        style={{ lineHeight: `${textBoxLineHeight}px` }}
        rows={state.rows}
        onFocus={handleFocus}
        onChange={handleTextInput}
        onClick={handleClick}
        onBlur={() => setBoxState({ ...state, border: false })}
        placeholder='Add a public comment...'
        value={state.userInput} />

      <div className='comment-textbox--border flex-horizontal--style-2'>
        <div className={[
          'expander',
          state.border ? 'exp-active' : '',
        ].join(" ")} />
      </div>

      <div
        className='comment-form--btn--container flex-horizontal--style-9'>
        <div
          className='comment-form--btn'
          style={state.displayButton ? null : { display: 'none' }}
        >
          <button onClick={cancelTextBox}>Cancel</button>
          <button
            className={state.userInput.trim().length ? null : 'button-disabled'}
            disabled={state.userInput.trim().length ? null : 'disabled'}
            onClick={handleSubmit}>
            Comment
        </button>
        </div>
      </div>
    </form>
  )
}



const msp = state => {
  return {
    video: state.ui.videoPlayer.video,
    isLogin: Boolean(state.session.id),
  }
}


const mdp = dispatch => ({
  createPost: post => dispatch(requestCreatePost(post))
})


export default withRouter(connect(msp, mdp)(CommentBox));