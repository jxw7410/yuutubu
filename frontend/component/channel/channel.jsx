import React from 'react';
import MainNav from '../nav-bars/main_nav';
import SubSideNav from '../nav-bars/sub_side_nav';
import { Route } from 'react-router-dom';
import AllVideosContainer from './all_vid_container';
import ChannelBaseContainer from './channel_base_container';
import ChannelHeader from './channel_header';
import { withRouter } from 'react-router-dom';

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

    componentDidMount() {

        switch (this.props.history.location.pathname) {
            case this.basePath:
                this.setState({ active_tab: 1 })
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

    redirectEvent(field, active_tab) {
        return e => {
            this.props.history.push(this.basePath + (field ? field : ""));
            this.setState({ active_tab });
        }
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
                    <div id={'channel-main-content'}>
                        <div id="channel-main-content-wrapper">
                            <ChannelHeader 
                                userId = {this.props.userId}
                                channel ={this.props.channel}
                                active_tab = {this.state.active_tab}
                                redirectEvent =  {this.redirectEvent }
                                toggledSideNav={this.state.toggledSideNav}
                            />
                            <Route exact path={this.basePath}
                                render={props => <ChannelBaseContainer {...props} 
                                    toggledSideNav={this.state.toggledSideNav}
                                    channelId={this.props.match.params.channel_id} />} />

                            <Route path={`${this.basePath}/videos`} 
                                render={props => <AllVideosContainer {...props} 
                                    toggledSideNav={this.state.toggledSideNav}
                                    channelId={this.props.match.params.channel_id} />} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Channel);