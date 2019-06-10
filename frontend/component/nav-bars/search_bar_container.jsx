import { connect } from "react-redux";
import SearchBar from './search_bar';


const msp = state => {
    return {
        isLogin: Boolean(state.session.id)   
    }
}


const mdp = dispatch => {
    return {

    }
}



export default connect(msp, mdp)(SearchBar)