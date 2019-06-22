import React from 'react';
import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal_action';
import { sortBy} from 'lodash'
import { filterSearchModalResults } from '../../util/selectors';

class SearchModalListItem extends React.Component{

    constructor(props){
        super(props)

        this.mouseEnter = false;
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }


    componentDidUpdate(){
        if((this.props._class === 'sbsd_d' || this.props._class === 'sbsd_d history') && !this.mouseEnter){
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
            let initialString;
            let remenantString;
            //debugger
            if (obj.category){
                initialString = obj.context.slice(0, this.props.inputTextLength);
                remenantString = obj.context.slice(this.props.inputTextLength);
            } else {
                initialString = obj.context.slice(0, this.props.inputTextLength);
                remenantString = obj.context.slice(this.props.inputTextLength);
            }

            let _class1 = this.props.selected === index ? "sbsd_d" : ""
            let _class2 = obj.category ? " history" : "";

            return <SearchModalListItem key={index}
                index={index}
                initialString={initialString}
                remenantString={remenantString}
                selected={this.props.selected}
                _class = {_class1 + _class2}
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
    const historyArray = sortBy(Object.values(state.entities.history), 'updated_at').reverse();
    return {
        searches: filterSearchModalResults(historyArray, Object.values(state.entities.searches))
    }
}

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
    }
}

export default connect(msp, mdp)(SearchModal)