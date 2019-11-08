import React from 'react';
import { connect } from 'react-redux';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';
import MainSideNavContainer from './main_side_nav_ctn';



const TypeTwoNavBar = React.memo(({ isNavBarToggled, toggleSideBar }) => {
  const topDivStyle = [
    'msn-ctn-2',
    isNavBarToggled ? "" : 'mc2-toggled'
  ].join(' ');

  const bottomDivStyle = [
    'msn-ctn-cvr',
    isNavBarToggled ? "" : "mcc-toggled"
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


