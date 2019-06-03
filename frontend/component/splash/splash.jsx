import React from 'react';
import MainNav from '../nav-bars/main_nav';
import SubSideNav from '../nav-bars/sub_side_nav';
import ChannelIndexContainer from '../channel/channel_index_container';



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
            <div id='main-nav-div'>
                <MainNav 
                    handleToggled={this.handleToggled}
                    toggledSideNav={this.state.toggledSideNav}
                />

                <div id={'splash-main' + (this.state.toggledSideNav ? '-toggled' : "")}>
                    <SubSideNav />
                    <div id={'splash-main-content'}>
                       <ChannelIndexContainer />
                    </div>
                </div>
            </div>
        )
    }
}

export default Splash;