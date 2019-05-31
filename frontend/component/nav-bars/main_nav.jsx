import React from 'react';
import TopNavContainer from './top_nav_container';
import MainSideNavContainer from './main_side_nav_container';

function MainNav(props) {
    return (
        <div id='nav-bar-hook'>
            <div id='main-nav-bars-ctn'>
                <div id='top-nav-ctn'>
                    <TopNavContainer handleToggled={props.handleToggled} />
                </div>

                {props.toggledSideNav ?
                    <div id='main-side-nav-ctn'>
                        <div id='main-side-fixed-hook'>
                            < MainSideNavContainer />
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default MainNav;