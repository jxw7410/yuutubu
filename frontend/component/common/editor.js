import React, { memo } from 'react';

function Editor({ editorRef, onClick, onFocus, onBlur, onInput, isDisabled = false }) {
  return (
    <div
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


export default memo(Editor);

