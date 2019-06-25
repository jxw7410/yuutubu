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
    }

    toHomeEvent(e) {
        e.preventDefault();
        this.props.history.push('/')
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

    render() {
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

        return (

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
                        <a href='https://angel.co/jian-wu-12?public_profile=1'>
                            <i className="fab fa-angellist"></i>
                            <span>AngelList</span>
                        </a>
                    </li>
                </ul>

                {
                    this.props.login ?
                        <>
                            <div id='subscription-tag'> SUBSCRIPTIONS </div>
                            <ul id='subscription-list'>
                                {subs}
                                {
                                    this.props.subscriptions.length > this.limit ?
                                        this.state.readMore ?
                                            <li onClick={this.toggleRead} id='read-less'> <i id='chev' className="fas fa-chevron-up"></i> <span>Show Less</span> </li>
                                            :
                                            <li onClick={this.toggleRead} id='read-more'> <i id='chev' className="fas fa-chevron-down"></i> <span>Show {this.props.subscriptions.length - this.limit} More</span> </li>

                                        : null
                                }
                            </ul>
                        </>
                        : null
                }
            </div>


        )
    }
}

export default withRouter(MainSideNav);