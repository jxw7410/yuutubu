import { connect } from 'react-redux';
import TopNav from './top_nav';
import { withRouter } from 'react-router-dom'
import { toggleSideBar } from '../../actions/nav/nav_bar_action';

const msp = (state) => ({
  isLoggedIn: Boolean(state.session.id),
})

const mdp = dispatch => ({
  toggleSideBar: () => dispatch(toggleSideBar())
})


export default withRouter(connect(msp, mdp)(TopNav));