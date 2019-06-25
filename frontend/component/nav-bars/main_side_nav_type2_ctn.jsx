import { connect } from 'react-redux';
import MainSideNavType2 from './main_side_nav_type2';
import { toggleSideBar } from '../../actions/nav_bar_action';



const msp = (store, ownProps) => {
    return {
        login: Boolean(store.session.id),
        subscriptions: Object.values(store.entities.subscriptions),
    };
};


const mdp = dispatch => {
    return {
        toggleSideBar: () => dispatch(toggleSideBar()),
    }
}


export default connect(msp, mdp)(MainSideNavType2);