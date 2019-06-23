import React from 'react';
import {withRouter} from 'react-router-dom'

class SearchModalListItem extends React.Component {

    constructor(props) {
        super(props)

        this.mouseEnter = false;
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }


    componentDidUpdate() {
        if ((this.props._class === 'sbsd_d' || this.props._class === 'sbsd_d history') && !this.mouseEnter) {
            this.props.updateText(this.props.initialString + this.props.remenantString);
        }
    }

    onMouseLeave(e) {
        e.preventDefault();
        this.mouseEnter = false;
        this.props.updateIndex(null)
    }

    onMouseEnter(e) {
        e.preventDefault();
        this.mouseEnter = true;
        this.props.updateIndex(this.props.index);
    }

    handleOnClick(e) {
        e.stopPropagation();
        this.props.closeModal();
        this.props.history.push(`/search/${this.props.initialString + this.props.remenantString}`)
    }

    render() {
        return (
            <li className={this.props._class}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.handleOnClick}
            >
                <span>{this.props.initialString}</span>
                <span>{this.props.remenantString}</span>
            </li>
        )
    }
}


export default withRouter(SearchModalListItem);