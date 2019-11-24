import React from 'react';
import { connect } from 'react-redux';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';
import MainSideNavContainer from './main_side_nav_ctn';



const TypeTwoNavBar = React.memo(({ isNavBarToggled, toggleSideBar }) => {
  const topDivStyle = [
    'main-side-nav--container-2',
    isNavBarToggled ? "" : 'side-nav-2--toggled'
  ].join(' ');

  const bottomDivStyle = [
    'main-side-nav--container-cover',
    isNavBarToggled ? "" : "side-nav-2--cover--toggled"
  ].join(' ');

  return (
    <>
      <div className={topDivStyle}>
        <MainSideNavContainer type='TYPETWO' />
      </div>
      <div className={bottomDivStyle}
        onClick={() => toggleSideBar()} />
    </>
  )
});




const msp = state => ({
  isNavBarToggled: state.ui.navBars.toggled
});


const mdp = dispatch => ({
  toggleSideBar: () => dispatch(toggleSideBar())
});


export default connect(msp, mdp)(TypeTwoNavBar);


