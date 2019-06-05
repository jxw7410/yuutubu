import React from 'react';
import { Link } from 'react-router-dom';
import UserModal from '../modals/user_modal';
import Modal from '../modals/modal';

class TopNav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modal: null,
        }
        
        this.previousModal = null;
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.openModal = this.openModal.bind(this);

    }


    handleSignIn(){
        this.props.history.push('/login');
    }

    handleLogout(e){
        e.preventDefault();
        this.props.logOut();
    }
    

    openModal(modal){
        return e =>{
            //debugger
            e.preventDefault();
            //console.log(this.previousModal)
            if (this.previousModal === modal){
                this.previousModal = null
            } else {   
                this.previousModal = modal;
                this.props.openModal(modal);
            }
        }
    }


    render() {
        return (
            <div id='top-nav'>
                <div id="top-nav-sec-1">
                    <i className="fas fa-bars" onClick={this.props.handleToggled}></i>
                    <span id='nav-bar-icon'><Link to={'/'}><i className="fab fa-youtube"></i><h1>YuuTubu</h1></Link></span>
                </div>

                <div id="top-nav-sec-2">
                    <section id='search-bar'>
                        <input id='search-bar-input' type='text' placeholder={'Search'}/>
                        <button id='search-bar-button'> <i className="fas fa-search"></i> </button>
                    </section>
                </div>

                <div id="top-nav-sec-3">  
                    <ul id='nav-bar-right-ul'>
                        <li onClick={this.openModal('upload_vid')} ><i className="fas fa-video"></i>
                                    <Modal />
                        </li>

                        <li><i className="fas fa-th"></i></li>
                        <li><i className="fas fa-comment"></i></li>

                        {
                            this.props.isLoggedIn ?
                            <li><i className="fas fa-bell"></i> </li> :
                            <li><i className="fas fa-ellipsis-v"></i></li>
                        }
                        <li>{
                            this.props.isLoggedIn ? 
                                <UserModal 
                                    logOut={this.handleLogout}/>: 
                            <button className='signin-button' onClick={this.handleSignIn} > 
                                    <i className="fas fa-user-circle"></i>
                                    SIGN IN
                            </button> 
                        }</li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default TopNav;