import React from 'react';
import { withRouter } from 'react-router-dom'
import SideNavLinks from './side_nav_links';


class MainSideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false,
        }

        this.toHomeEvent = this.toHomeEvent.bind(this);
        this.toggleRead = this.toggleRead.bind(this);
        this.redirectToChannel = this.redirectToChannel.bind(this);
        this.limit = 7;
        this.toggleSideBar = this.toggleSideBar.bind(this);
    }

    toHomeEvent(e) {
        e.preventDefault();
        this.props.history.push('/')
    }

    toggleSideBar(e) {
        e.preventDefault();
        this.props.toggleSideBar();
    }

    redirectToChannel(channel_id) {
        return e => {
            e.preventDefault();
            this.props.history.push(`/channel/${channel_id}`)
        }
    }
    toggleRead(e) {
        e.preventDefault();
        const readMore = this.state.readMore ? false : true;
        this.setState({ readMore })
    }

    getSubs() {
        const subs = []
        for (let i = 0; i < this.props.subscriptions.length; i++) {
            const sub = this.props.subscriptions[i];
            if (!this.state.readMore && i === this.limit)
                break
            subs.push(<li key={sub.id}
                onClick={this.redirectToChannel(sub.channel_id)}>
                <i className="fas fa-user-circle"></i>
                <span>{sub.channelName}</span>
            </li>)
        }
        return subs;
    }


    getTypeTwo() {
        return this.props.type === 'typeTwo' ?
            <div id='top-nav-sec-1-ctn'>
                <div id="top-nav-sec-1">
                    <i onClick={this.toggleSideBar} className="fas fa-bars"></i>
                    <span id="nav-bar-icon">
                        <a href="#/"><i className="fab fa-youtube"></i><h1>YuuTubu</h1>
                        </a>
                    </span>
                </div>
            </div> : null
    }


    getReadMore() {
        return this.props.subscriptions.length > this.limit ?
                    this.state.readMore ?
                        <li onClick={this.toggleRead} id='read-less'>
                            <i id='chev' className="fas fa-chevron-up"></i> <span>Show Less</span>
                        </li>
                        :
                        <li onClick={this.toggleRead} id='read-more'>
                            <i id='chev' className="fas fa-chevron-down"></i> 
                            <span>Show {this.props.subscriptions.length - this.limit} More</span>
                        </li>

                : null
    }

    getSubscriptions(){
        return (
            this.props.login ?
                <>
                    <div id='subscription-tag'> SUBSCRIPTIONS </div>
                    <ul id='subscription-list'>
                        {this.getSubs()}
                        {this.getReadMore()}
                    </ul>
                </> : null
        )
    }

    render() {
        return (
            <>
                {this.getTypeTwo()}
                <div id='main-side-nav'>
                    <ul id='main-side-nav-ul'>
                        <li
                            onClick={this.toHomeEvent}
                            id='Home'
                            className={this.props.location.pathname === '/' ? 'main-side-icon-selected' : ""}>
                            <i className="fas fa-home" />
                            <span>Home</span>
                        </li>
                        <SideNavLinks type='main' />
                    </ul>

                    <ul>
                        <li>
                            <a target="_blank" href='https://angel.co/jian-wu-12?public_profile=1'>
                                <i className="fab fa-angellist"></i>
                                <span>AngelList</span>
                            </a>
                        </li>
                    </ul>

                    {this.getSubscriptions()}
                </div>
            </>

        )
    }
}

export default withRouter(MainSideNav);