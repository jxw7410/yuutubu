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
        this.modalRef = document.getElementById(this.props.node);
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
        this.props.togglePopUp();
        document.removeEventListener('click', this.handleClick);
    }

    render() {
        return (
            <div className='usr-mdl-i box-shad-s1'>
                <div className='usr-mdl-hdr'>
                    <div className='umh-d'>
                        <section id='mpp' className='flexh-1'>
                            <i className="fas fa-user-circle"/>
                        </section>
                        <section id='mpi' className='flexv-2'>
                            <span>{this.props.user.username}</span>
                            <span>{this.props.user.email}</span>
                        </section>
                    </div>
                    <div className='umh-d'>
                        <span/>
                        <span className='flexh-3' style={{fontSize: '16px'}}>
                            What's on your mind?
                        </span>
                    </div>
                </div>
                <div className='um-sec-1'>
                    <ul id='um-sec-1-ul'>
                        <li onClick={this.redirectEvent}>
                            <div className='flexh-1'>
                                <i className="fas fa-user" />
                            </div>
                            <div className='flexh-3'>Your Channel</div>
                        </li>

                        <li onClick={this.props.logOut}>
                            <div className='flexh-1'>
                                <i className="fas fa-sign-out-alt" />
                            </div>
                            <div className='flexh-3'>Sign Out</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(UserModalItem);