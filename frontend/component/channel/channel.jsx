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
            active_tab: 1,
        }

        this.basePath = this.props.match.url;
        this.handleToggled = this.handleToggled.bind(this);
        this.redirectEvent = this.redirectEvent.bind(this);
  
    }

    componentDidMount(){

        switch(this.props.history.location.pathname){
            case this.basePath:
                this.setState({active_tab : 1})
                break;
            case this.basePath + '/videos':
                this.setState({ active_tab: 2 })
                break;
            default:
                this.setState({ active_tab: 1 })
                break;
        }
    }

    handleToggled(e) {
        e.preventDefault();
        const toggledSideNav = this.state.toggledSideNav ? false : true;
        this.setState({ toggledSideNav });

    }

    redirectEvent(field, active_tab){
        return e => {
            this.props.history.push(this.basePath + (field ? field : ""));
            this.setState({active_tab});
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
                                                <span>{this.props.username}</span>
                                                <span>0 subscribers</span>
                                            </span>
                                        </div>

                                        <div id='channel-header-buttons'>
                                            <button id="subscribe-button">
                                                SUBSCRIBE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="channel-header-nav">
                                    <ul>
                                        <li 
                                            onClick={ this.redirectEvent(null, 1) }
                                            className={ this.state.active_tab === 1 ? 'channel_tab_active' : null}> 
                                            HOME 
                                        </li>

                                        <li 
                                            onClick={this.redirectEvent('/videos', 2)}
                                            className={this.state.active_tab === 2 ? 'channel_tab_active' : null}> 
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

export default Channel;