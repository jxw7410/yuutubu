import React from 'react';
import TopNavContainer from '../nav-bars/top_nav_container'
import MainSideNavContainer from '../nav-bars/main_side_nav_container';
import SubSideNav from '../nav-bars/sub_side_nav';
import { Route } from 'react-router-dom';


class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggledSideNav: true,
        }

        this.handleToggled = this.handleToggled.bind(this);
    }

    handleToggled(e) {
        e.preventDefault();
        const toggledSideNav = this.state.toggledSideNav ? false : true;
        this.setState({ toggledSideNav });
    }

    render() {
        return (
            <div id='splash-div'>
                <div id='nav-bar-hook'> 
                    <div id='main-nav-bars-ctn'>
                        <div id='top-nav-ctn'>
                            <TopNavContainer handleToggled={this.handleToggled} />
                        </div>

                        { this.state.toggledSideNav ? 
                            <div id='main-side-nav-ctn'>
                                <div id='main-side-fixed-hook'>                         
                                    < Route component={MainSideNavContainer} />
                                </div> 
                            </div>
                            : null
                        }
                    </div>
                </div>

                <div id={'splash-main' + (this.state.toggledSideNav ? '-toggled' : "")}>
                    <SubSideNav />
                    <div id={'splash-main-content'}>
                        <img src="https://www.rectanglered.com/wp-content/uploads/2012/12/new-google-chrome-logo.jpg"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Splash;