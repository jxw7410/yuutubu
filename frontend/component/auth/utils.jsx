import React, { useState } from 'react';

const defErrors = {
    label: {},
    input: {}
}

const defClasses = {
    label: {},
    input: {}
}

export const AuthInputWidget = React.forwardRef((props, ref) => {
    const { 
        type,
        text,
        value,
        textChange,
        errors = [],
        styleClass = defClasses,
        errorClass = defErrors 
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

    return (
        <label style={{ position: 'relative' }} className='flexv-4'>
            <span className={`${styleClass.label}  ${state.focus ? 'flt-e' : ""}`}
                style={{ color: (errors.length && state.focus) ? "red" : null }}>
                {text}
            </span>

            <input
                ref={ref}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${styleClass.input} ${errors.length ? errorClass.input : ""}`}
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