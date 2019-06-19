import React from 'react';
import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal_action';

class SearchModal extends React.Component{



    componentWillUnmount(){
        this.props.closeModal();
    }

    render(){
        return (
            <>
            {
                this.props.searches.length > 0 ? 
                <div id='search-modal'>

                </div> : null
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