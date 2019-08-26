import { connect } from 'react-redux';
import MainSideNav from './main_side_nav';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';


const msp = (store, ownProps) => ({
        login: Boolean(store.session.id),
        subscriptions: Object.values(store.entities.subscriptions),
});


const mdp = dispatch => ({
        toggleSideBar: () => { dispatch(toggleSideBar()) }
})


export default connect(msp,mdp)(MainSideNav);

