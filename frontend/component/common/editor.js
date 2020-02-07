import React, { memo } from 'react';

function Editor({ editorRef, onClick, onFocus, onBlur, onInput }) {
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
      contentEditable="true"
      role="textbox"
      tabIndex='0'
    />
  )
}


Editor.defaultProps = {
  onClick: e => e.preventDefault(),
  onFocus: e => e.preventDefault(),
  onBlur: e => e.preventDefault(),
  onInput: e => e.preventDefault(),
}

export default memo(Editor);

