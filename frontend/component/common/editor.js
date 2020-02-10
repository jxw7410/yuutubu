import React, { memo } from 'react';
import Styled from 'styled-components';

function Editor({ editorRef, onClick, onFocus, onBlur, onInput, isDisabled = false }) {
  return (
    <Div
      ref={editorRef}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onInput={onInput}
      suppressContentEditableWarning={true}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="true"
      aria-autocomplete="list"
      aria-multiline="true"
      aria-label="Message"
      dir="auto"
      placeholder='Add a public comment...'
      contentEditable={!isDisabled}
      role="textbox"
      tabIndex='0'
    />
  )
}


const Div = Styled.div`
  & a{
    color: royalblue;
    font-weight: 500;
    text-decoration: none;
  }
`


export default memo(Editor);

