import React from 'react';
import TopNavContainer from './top_nav_container';
import SubSideNav from './sub_side_nav';
import MainSideNavContainer from './main_side_nav_container';
import { connect } from 'react-redux';

function MainNav(props) {
    return (
        <>
            {
                props.navBar.active ?
                    <>
                        <div id='top-nav-ctn'> <TopNavContainer /> </div>
                        {
                            props.navBar.type === 1 ?
                            <div id='main-side-nav-ctn'>
                            { 
                                props.navBar.toggled ? 
                                    < MainSideNavContainer /> : null
                            }   
                                <SubSideNav />
                            </div> : null
                        }
                    </>
                    : null
            }
        </>
    )
}

const msp = state => {
    return {
        navBar: state.ui.navBars
    }
}

export default connect(msp)(MainNav);


