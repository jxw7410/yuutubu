import React from 'react';
import {connect} from 'react-redux';
import { toggleSideBar } from '../../actions/nav/nav_bar_action';
import MainSideNavContainer from './main_side_nav_ctn';



const TypeTwoNavBar = ({isNavBarToggled, toggleSideBar}) => {
  return (
    <>
      <div className={`msn-ctn-2 ${isNavBarToggled ? "" : 'mc2-toggled'}`}>
        <MainSideNavContainer type='typeTwo' />
      </div>
      <div className={`msn-ctn-cvr ${isNavBarToggled ? "" : "mcc-toggled"}`} 
        onClick={toggleSideBar} />
    </>
  )
};




const msp = state => ({
  isNavBarToggled: state.ui.navBars.toggled
});


const mdp = dispatch => ({
  toggleSideBar: () => dispatch(toggleSideBar)
});


export default connect(msp, mdp)(TypeTwoNavBar);


