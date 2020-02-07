import React, { useRef, useState } from 'react';
import Styled from 'styled-components';
import { trimContentEditor } from '../../util/selectors';
import Editor from '../common/editor';
import DOMPurify from 'dompurify';

function CommentBox(props) {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("")
  const [displayButton, setDisplayButton] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const checkForAuth = e => {
    e.preventDefault();
    if (!props.isLogin)
      props.history.push('/login');
    else
      setDisplayButton(true);
  }

  const handleFocus = field => e => {
    e.preventDefault();
    setExpanded(field);
  }

  const handleChange = e => {
    e.preventDefault();
    const innerContent = e.currentTarget.innerHTML;
    const expression = '<div><br></div>';
    setEditorContent(
      DOMPurify.sanitize(trimContentEditor(innerContent, expression))
    );
  }

  const cancelCommentBox = e => {
    if (e) e.preventDefault();
    setEditorContent("");
    setDisplayButton(false);
    editorRef.current.innerHTML = "";
  };

  const postComment = e => {
    e.preventDefault();
    if (editorContent.length) {
      props.postComment({
        video_id: props.video.id,
        description: editorContent,
      })
      cancelCommentBox();
    }
  }

  return (
    <Form>
      <Editor 
        editorRef={editorRef}
        onClick={checkForAuth}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        onInput={handleChange}
      />
      <Expander width={isExpanded ? '100%' : '0px'} ><div /></Expander>
      <ButtonContainer
        btnDisabled={!editorContent.length}
        displayButton={displayButton}>
        <button
          onClick={cancelCommentBox}
        >Cancel</button>
        <button
          onClick={postComment}
          disabled={!editorContent.length}>
          Comment
        </button>
      </ButtonContainer>

    </Form>
  )
}


const Form = Styled.form`
  width: 100%:
  display: grid;
  grid-template-rows: auto 2px auto;

  & > div:first-child{
    width: inherit;
    font-size: 14px;
    margin-bottom: 3px;
    line-height: 16px;
    outline: none;
  }

  [contentEditable=true]:empty:before{
    content: attr(placeholder);
    color: gray;
  }
`

const Expander = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgray;
  width: 100%;
  height: 2px;

  & > div:first-child{
    width: ${ props => props.width}
    height: inherit;
    background: gray;
    transition: width 0.2s linear;
  }
`

const ButtonContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-height: 48px;

  & > button {
    display: ${ props => props.displayButton ? "block" : "none"}
    width: 100px;
    height: 35px;
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 40px;
  }

  & > button:active{
    outline: none;
  }

  & > button:first-child{
    border:none;
    color: gray;
    background: transparent;
  }

  & > button:last-child{
    background: ${props => props.btnDisabled ? 'lightgray' : 'rgb(36, 97, 204)'};
    color: white;
    border-radius: 3px;
  }
`




export default CommentBox;