import {connect} from 'react-redux';
import Search from './search';
import { updateSearchHistory, requestSearchVideos } from '../../actions/search/search_action';


const msp = (store,props) => {
    return {

    }
} 


const mdp = dispatch => {
    return {
        updateSearchHistory: query =>  dispatch(updateSearchHistory(query)),
        requestSearchVideos: query => dispatch(requestSearchVideos(query)),
    }
}


export default connect(msp, mdp)(Search);