import {connect} from 'react-redux';
import Search from './search';
import { updateSearchHistory } from '../../actions/search/search_action';


const msp = (store,props) => {
    return {

    }
} 


const mdp = dispatch => {
    return {
        updateSearchHistory: query =>  dispatch(updateSearchHistory(query)),
    }
}


export default connect(msp, mdp)(Search);