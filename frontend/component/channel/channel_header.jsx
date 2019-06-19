import React from 'react'

class ChannelHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navBarFixed: false,
        }

        this.fixedNavBar = this.fixedNavBar.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.fixedNavBar);
    }

    fixedNavBar(e) {
        e.preventDefault();
        let scrollBarPos = $(document).scrollTop();
        if (scrollBarPos > 90) {
            this.setState({ navBarFixed: true });
        } else {
            this.setState({ navBarFixed: false });
        }
    }

    componentDidUpdate(){
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
                                <span>0 subscribers</span>
                            </span>
                        </div>
                        <div id='channel-header-buttons'>
                            {
                                this.props.channel.user_id !== parseInt(this.props.userId) ?
                                    <button id="subscribe-button"> SUBSCRIBE </button> : null
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

                                {/* 
                                    <li > PLAYLISTS </li>
                                    <li > CHANNELS </li>
                                    <li > DISCUSSION </li> */}
                                <li > ABOUT </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}

export default ChannelHeader