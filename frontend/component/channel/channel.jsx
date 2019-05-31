import React from 'react';
import MainNav from '../nav-bars/main_nav';
import SubSideNav from '../nav-bars/sub_side_nav';
import { Route } from 'react-router-dom';
import FeatureContainer from './feature_container';


class Channel extends React.Component {
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
                <MainNav
                    handleToggled={this.handleToggled}
                    toggledSideNav={this.state.toggledSideNav}
                />

                <div id={'splash-main' + (this.state.toggledSideNav ? '-toggled' : "")}>
                    <SubSideNav />
                    <div id={'channel-main-content'}>
                        <div>
                            <div id='channel-header'>
                                <div id="channel-header-msc">

                                </div>
                                <div id="channel-header-nav">
                                    <ul>
                                        <li> HOME </li>
                                        <li> VIDEOS </li>
                                        <li> PLAYLISTS </li>
                                        <li> CHANNELS </li>
                                        <li> DISCUSSION </li>
                                        <li> ABOUT </li>
                                    </ul>

                                </div>


                            </div>
                            <Route exact path={this.props.match.path} component={FeatureContainer}></Route>
                            <Route path={`${this.props.match.path}/feature`} component={FeatureContainer}></Route>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Channel;