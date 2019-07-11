import React from 'react'
import SubscribeButton from '../subscribe/subscribe_button';

class ChannelHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navBarFixed: false,
        }
        
        this.fixedPostion = 95;
        this.fixedNavBar = this.fixedNavBar.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.fixedNavBar);
    }

    fixedNavBar(e) {
        e.preventDefault();
        let scrollBarPos = document.querySelector('html').scrollTop;
        if (scrollBarPos > this.fixedPostion) {
            this.setState({ navBarFixed: true });
        } else {
            this.setState({ navBarFixed: false });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.fixedNavBar)
    }

    render() {
        return (
            <>
                <div id='channel-header'>
                    <div id='channel-header-wrap'>
                        <div id='channel-header-profile'>
                            <i className="fas fa-user-circle" />
                            <span id='channel-header-profile-info'>
                                <span>{this.props.channel.name}</span>
                                <span>{this.props.channel.subscriptionCount} subscribers</span>
                            </span>
                        </div>
                        <div id='channel-header-buttons'>
                            {
                                this.props.channel.user_id !== parseInt(this.props.userId) ?
                                    <SubscribeButton
                                        channel = {this.props.channel}
                                    />
                                    : null
                            }
                        </div>
                    </div>
                </div>


                <div id={"channel-header-nav" 
                    + (this.state.navBarFixed ? "-fixed" : "")
                    + (this.props.toggledSideNav ? "-toggled" : "")}>
                    <div id={'channel-header-nav-wrapper'}>
                        <div>
                            <ul id="channel-header-nav-list">
                                <li
                                    onClick={this.props.redirectEvent(null, 1)}
                                    className={this.props.active_tab === 1 ? 'channel_tab_active' : null}>
                                    HOME
                                </li>

                                <li
                                    onClick={this.props.redirectEvent('/videos', 2)}
                                    className={this.props.active_tab === 2 ? 'channel_tab_active' : null}>
                                    VIDEOS
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}



export default ChannelHeader;