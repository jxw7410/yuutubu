import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



const AnimatePlaceHolderText = (props) => {
    //debugger
    return (
        <ReactCSSTransitionGroup
            transitionName='createform-input-placeholder'
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
        >
            {
                props.focus || props.value ?

                    <h5 key={props.field} className='createform-input-tag'>
                        {props.field}
                    </h5>

                    : null
            }

        </ReactCSSTransitionGroup>
    )
}



const SignUpInputItem = props => {
    const { 
        field, 
        value, 
        focus,
        inputLabelName,
        inputClassName, 
        blurEvent, 
        focusEvent, 
        changeEvent,
        type,
        message } = props;

       // debugger
    return (
        <label className={inputLabelName}>
            <AnimatePlaceHolderText
                field={field}
                value={value}
                focus={focus}
            />

            <input
                id={field}
                className={inputClassName}
                onBlur={blurEvent}
                onFocus={focusEvent}
                onChange={changeEvent}
                type={type}
                value={value}
                placeholder={ focus ? null : field  }
            />

            <span>{message}</span>
        </label>
    )
}


export default SignUpInputItem;