import React from 'react';


const SignUpInputItem = props => {
    const { 
        id,
        field, 
        value, 
        focus,
        inputLabelName,
        inputClassName, 
        blurEvent, 
        focusEvent, 
        changeEvent,
        type,
        errors,
        message } = props;


    return (
        <label ref={props.reference} className={inputLabelName}>
            <span className={`createform-input-tag ${(focus || value) ? "c-i-t-focused" : ""}`}
                style={ (errors && (focus || value)) ? {color: 'red'} : null }>
                {field}
            </span>

            <input
                id={id}
                className={inputClassName}
                onBlur={blurEvent}
                onFocus={focusEvent}
                onChange={changeEvent}
                type={type}
                value={value}
            />

            <span>{message}</span>
        </label>
    )
}


export default SignUpInputItem;

