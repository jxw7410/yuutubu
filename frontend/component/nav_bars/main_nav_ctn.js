import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../actions/subscribe/subscribe_action';
import { toggleSideBar } from '../../actions/nav_bar_action';
import MainNav from './main_nav';

const msp = state => {
    return {
        login: Boolean(state.session.id),
        navBar: state.ui.navBars
    }
}

const mdp = dispatch => {
    return {
        fetchSubscriptions: () => dispatch(fetchSubscriptions()),
        toggleSideBar: () => { dispatch(toggleSideBar()) }
    }
}

export default connect(msp, mdp)(MainNav);