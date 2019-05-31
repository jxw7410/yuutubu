import React from 'react';
import MainNav from '../nav-bars/main_nav';
import SubSideNav from '../nav-bars/sub_side_nav';
import { Route } from 'react-router-dom';
import FeatureContainer from './feature_container';
import { connect } from 'react-redux';
import { throws } from 'assert';

class Channel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggledSideNav: true,
        }

        this.basePath = this.props.match.url;
        this.handleToggled = this.handleToggled.bind(this);
        this.redirectEvent = this.redirectEvent.bind(this);
    }


    handleToggled(e) {
        e.preventDefault();
        const toggledSideNav = this.state.toggledSideNav ? false : true;
        this.setState({ toggledSideNav });

    }

    redirectEvent(field){
        return e => {
        }
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
                                <div id='channel-header-msc-grid-hook'>
                                    <div id="channel-header-msc">

                                        <div id='channel-header-profile'>
                                            <i className="fas fa-user-circle" />
                                            <span id='channel-header-profile-info'>
                                                {this.props.username}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div id="channel-header-nav">
                                    <ul>
                                        <li 
                                            onClick={ this.redirectEvent() }
                                            className={ 'channel_tab_active'}> 
                                            HOME 
                                        </li>

                                        <li 
                                            onClick={this.redirectEvent('/videos')}>
                                            VIDEOS 
                                        </li>

                                        <li > PLAYLISTS </li>
                                        <li > CHANNELS </li>
                                        <li > DISCUSSION </li>
                                        <li > ABOUT </li>
                                    </ul>

                                </div>


                            </div>
                            <Route exact path={this.basePath} component={FeatureContainer}></Route>
                            <Route path={`${this.basePath}/features`} component={FeatureContainer}></Route>
                            <Route path={`${this.basePath}/videos`} component={FeatureContainer}></Route>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const msp = state => {
    return {
        username: state.session.username,
        isLogin: Boolean(state.session.id),
    }
}



export default connect(msp)(Channel);