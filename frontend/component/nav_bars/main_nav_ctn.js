import { connect } from 'react-redux';
import { fetchSubscriptions } from '../../actions/subscribe/subscribe_action';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';
import MainNav from './main_nav';

const msp = state => ({
        login: Boolean(state.session.id),
        navBar: state.ui.navBars
})

const mdp = dispatch => ({
        fetchSubscriptions: () => dispatch(fetchSubscriptions()),
        toggleSideBar: () => dispatch(toggleSideBar()),
})

export default connect(msp, mdp)(MainNav);