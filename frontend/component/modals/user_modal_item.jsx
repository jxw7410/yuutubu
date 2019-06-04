import React from 'react';
import {withRouter, Redirect, Switch } from 'react-router-dom';


class UserModalItem extends React.Component {
    constructor(props) {
        super(props);

        this.modalRef = null;
        this.handleClick = this.handleClick.bind(this);
        this.redirectEvent = this.redirectEvent.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick)
        this.modalRef = document.getElementById(this.props.ref);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.modalRef.contains(e.target)) {
            this.props.togglePopUp();
        }
    }

    redirectEvent(e) {
        if (this.props.match.url !== `/channel/${this.props.user.channel_id}`)
            this.props.history.push(`/channel/${this.props.user.channel_id}`)
    }

    render() {
        return (
            <div id='user-modal-item'>
                <div id='user-modal-header'>
                    <div>
                        <section id='modal-profile-pic'>
                            <i id='user-profile-icon' className="fas fa-user-circle"></i>
                        </section>
                        <section id='modal-profile-info'>
                            <span>{this.props.user.username}</span>
                            <span>{this.props.user.email}</span>
                        </section>
                    </div>
                    <div>
                        <span>
                            What's on your mind?
                        </span>
                    </div>
                </div>
                <div id='user-modal-section-1'>
                    <ul>
                        <li onClick={this.redirectEvent}>
                            <div><i className="fas fa-user"></i></div>
                            <div>Your Channel</div>
                        </li>

                        <li onClick={this.props.logOut}>
                            <div><i className="fas fa-sign-out-alt"></i></div>
                            <div>Sign Out</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(UserModalItem);