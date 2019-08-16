import React, { useState } from 'react';
import {capitalize} from '../../util/selectors';

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
        if (!value.length)
            setState({ focus: false })
    }

    const newText = text.split(" ").map( word => capitalize(word) ).join(" ");

    return (
        <label style={{ position: 'relative' }} className='flexv-4'>
            <span className={`${styleClass.label}  ${state.focus ? otherClass.label : ""}`}
                style={{ color: (errors.length && state.focus) ? "red" : null }}>
                {newText}
            </span>

            <input
                ref={ref}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styleClass.input} ${errors.length ? otherClass.input : ""}`}
                onChange={textChange}
                type={type}
            >
            </input>

            <span style={{ paddingTop: '5px', color: errors.length ? 'red' : null }}>
                {errors}
            </span>
        </label>
    )
});


export const AuthLogo = () => {
    return (
        <span className='flexh-3'>
            <i className="fab fa-youtube" />
            <h1 style={{ fontSize: '25px' }}>{"YuuTubu"}</h1>
        </span>
    )
}

export const EmailFormStuff = ({login}) => {
    const handleOnClick = e => {
        e.preventDefault()
        login({ email: "demouser@gmail.com", password: "password123"})
    }

    return (
        <span> Have no account? Try out the <span onClick={handleOnClick} id='demo-account-link'>demo account</span></span>
    )
}