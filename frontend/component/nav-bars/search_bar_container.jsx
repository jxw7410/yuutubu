import { connect } from "react-redux";
import SearchBar from './search_bar';
import { requestSearchQueries } from "../../actions/search/search_action";
import { openModal } from "../../actions/modal_action";


const msp = state => {
    return {
        isLogin: Boolean(state.session.id), 
        //searches: Object.values(state.entities.searches),
    }
}


const mdp = dispatch => {
    return {
        requestSearchQueries: text => dispatch(requestSearchQueries(text)),
        openModal: type => dispatch(openModal(type)),
    }
}



export default connect(msp, mdp)(SearchBar)