import { connect } from 'react-redux';
import MainSideNav from './main_side_nav';



const msp = (store, ownProps) => {
    return{
        login: Boolean(store.session.id),
        subscriptions: Object.values(store.entities.subscriptions),
    };
};


const mdp = dispatch => {
    return {

    }
}


export default connect(msp,mdp)(MainSideNav);

