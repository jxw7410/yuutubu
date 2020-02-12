import React, { useState } from 'react';
import { capitalize } from '../../util/selectors';

const defOther = {
  label: "",
  input: ""
}

const defClasses = {
  label: "",
  input: ""
}

export const AuthInputWidget = React.forwardRef((props, ref) => {
  const {
    type,
    text,
    value,
    textChange,
    errors = [],
    styleClass = defClasses,
    otherClass = defOther
  } = props

  const [state, setState] = useState({
    focus: false
  });

  const handleFocus = e => {
    e.preventDefault();
    setState({ focus: true });
  }

  const handleBlur = e => {
    e.preventDefault();
    if (!value.length) setState({ focus: false })
  }

  const newText = text.split(" ").map(word => capitalize(word)).join(" ");
  const topSpanClass = `${styleClass.label}  ${state.focus ? otherClass.label : ""}`;
  const topSpanStyle = { color: (errors.length && state.focus) ? "red" : null };
  const inputClass = `${styleClass.input} ${errors.length ? otherClass.input : ""}`
  const errorStyle = { paddingTop: '5px', color: errors.length ? 'red' : null }

  return (
    <label style={{ position: 'relative' }} className='flex-vertical--style-4'>
      <span className={topSpanClass}
        style={topSpanStyle}>
        {newText}
      </span>

      <input
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={inputClass}
        onChange={textChange}
        type={type}
      />

      <span style={errorStyle}>
        {errors}
      </span>
    </label>
  )
});


export const AuthLogo = React.memo( () => {
  return (
    <span className='flex-horizontal--style-3'>
      <i className="fab fa-youtube" />
      <h1 style={{ fontSize: '25px' }}>YuuTubu</h1>
    </span>
  )
});

export const DemoUserLogin = React.memo( ({ login }) => {
  const handleOnClick = e => {
    e.preventDefault()
    login({ email: "demouser@gmail.com", password: "password123" })
  }
  return (
    <span> Have no account? Try out the <span onClick={handleOnClick} id='demo-account-link'>demo account</span></span>
  )
});