import React from 'react';
import { Link } from 'react-router-dom';
import UserModal from '../modals/user_modal';
import SearchBarContainer from './search_bar_container';
import SideNavLinks from './side_nav_links';



class TopNav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modal: null,
        }
        
        this.previousModal = null;
        this.typeTop = 'top'
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(e){
        e.preventDefault();
        this.props.toggleSideBar()
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
            e.preventDefault();
            this.props.openModal(modal);
        }
    }

    topRightIcon(){
        return (
            this.props.isLoggedIn ?
                <UserModal logOut={this.handleLogout} /> 
                :
                <button className='signin-button' onClick={this.handleSignIn} >
                    <i className="fas fa-user-circle"></i>
                    SIGN IN 
                </button> 
        )
    }

    render() {
        return (
            <div id='top-nav'>
                <div id="top-nav-sec-1">
                    <i onClick={this.handleToggle} className="fas fa-bars" ></i>
                    <span id='nav-bar-icon'><Link to={'/'}><i className="fab fa-youtube"></i><h1>YuuTubu</h1></Link></span>
                </div>

                <div id="top-nav-sec-2"> <SearchBarContainer /> </div>

                <div id="top-nav-sec-3">  
                    <ul id='nav-bar-right-ul'>
                        <li className='icon-wrapper' onClick={this.openModal('upload_vid')} >
                            <i className="fas fa-video nav-icon-links"></i> 
                            <div className='icon-message-nav'>Upload Video</div>
                        </li>
                        <SideNavLinks type={this.typeTop} />
                        <li>{ this.topRightIcon() }</li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default TopNav;



