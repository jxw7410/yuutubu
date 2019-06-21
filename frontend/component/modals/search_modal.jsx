import React from 'react';
import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal_action';


class SearchModalListItem extends React.Component{

    constructor(props){
        super(props)

        this.mouseEnter = false;
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }


    componentDidUpdate(){
        if(this.props._class === 'sbsd_d' && !this.mouseEnter){
            this.props.updateText(this.props.initialString + this.props.remenantString);
        }
    }

    onMouseLeave(e){
        e.preventDefault();
        this.mouseEnter = false;
        this.props.updateIndex(null)
    }

    onMouseEnter(e){
        e.preventDefault();
        this.mouseEnter = true;
        this.props.updateIndex(this.props.index);
    }


    render(){
        return (
            <li className={this.props._class} 
                onMouseEnter={this.onMouseEnter}
                onMouseLeave = {this.onMouseLeave}
            >
                <span>{this.props.initialString}</span>
                <span>{this.props.remenantString}</span>
            </li>
        )
    }
}



class SearchModal extends React.Component{
    constructor(props){
        super(props);
    }

 
    render(){
        const extension = this.props.openModal && this.props.searches.length > 0 ? "-active" : "";
        const listItems = this.props.searches.map( (obj, index) => {
            let initialString = obj.title.slice(0, this.props.inputTextLength);
            let remenantString = obj.title.slice(this.props.inputTextLength, -1);
            let _class = this.props.selected === index ? "sbsd_d" : ""
            return <SearchModalListItem key={index}
                index={index}
                initialString={initialString}
                remenantString={remenantString}
                selected={this.props.selected}
                _class = {_class}
                updateIndex={this.props.updateIndex}
                updateText={this.props.updateText}
            />

        });
        return (
            <>
            {
                <div id= {'search-modal' + extension}>
                    <ul id='search-modal-list'>
                        { listItems }
                    </ul>
                </div> 
            }
            </>
        )
    }
}



const msp = state => {
    return {
        searches: Object.values(state.entities.searches),
    }
}

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
    }
}

export default connect(msp, mdp)(SearchModal)