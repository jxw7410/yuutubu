import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'


const SearchModalListItem = props => {
    let mouseEnter = false; 

    // Functions like componentDidUpdate
    // This is to update the text color for history matching
    useEffect(()=> {
        if( props._class.includes('sbsd_d') && !mouseEnter) {
            props.updateText(props.initialString + props.remenantString)
        }
    })

    const onMouseLeave = e => {
        e.preventDefault()
        mouseEnter = false;
        props.updateIndex(null)
    }

    const onMouseEnter = e => {
        e.preventDefault();
        mouseEnter = true;
        props.updateIndex(props.index)
    }

    const handleOnClick = e => {
        e.stopPropagation();
        props.closeModal();
        props.history.push(`/search/${props.initialString + props.remenantString}`)
    }

    return (
        <li className={props._class}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleOnClick}>

            <span>{props.initialString}</span>
            <span>{props.remenantString}</span>
        </li>
    )
}

export default withRouter(SearchModalListItem);