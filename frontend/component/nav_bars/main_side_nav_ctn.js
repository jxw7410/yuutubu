import { connect } from 'react-redux';
import MainSideNav from './main_side_nav';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';


const mdp = dispatch => ({
  toggleSideBar: () => { dispatch(toggleSideBar()) }
})


export default connect(null, mdp)(MainSideNav);

