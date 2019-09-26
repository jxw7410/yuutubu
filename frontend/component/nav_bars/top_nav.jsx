import React from 'react';
import { NavLink } from 'react-router-dom';
import UserModal from '../modals/user_modal';
import SearchBarContainer from './search_bar_ctn';
import SideNavLinks from './side_nav_links';


// React Hook
class TopNav extends React.Component {
	constructor(props) {
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

	handleToggle(e) {
		e.preventDefault();
		this.props.toggleSideBar()
	}


	handleSignIn() {
		this.props.history.push('/login');
	}

	handleLogout(e) {
		e.preventDefault();
		this.props.logOut();
	}


	openModal(modal) {
		return e => {
			e.preventDefault();
			this.props.openModal(modal);
		}
	}

	topRightIcon() {
		return (
			this.props.isLoggedIn ?
				<UserModal logOut={this.handleLogout} />
				:
				<button className='signin-btn flexh-3' onClick={this.handleSignIn} >
					<i className="fas fa-user-circle"></i>
					SIGN IN
                </button>
		)
	}

	render() {
		return (
			<div className='top-nav'>
				<div className='tns-1 flexh-3'>
					<i onClick={this.handleToggle} className="fas fa-bars" />
					<span className='nb-i flexh-3'>
						<NavLink exact className='flexh-3' to={'/'}>
							<i className="fab fa-youtube"></i><h1>YuuTubu</h1>
						</NavLink>
					</span>
				</div>

				<div className='tns-2'> <SearchBarContainer /> </div>
				<div className='tns-3 flexh-3'>
					<ul className='nbr-ul flexh-4'>
						<li className='i-wrap' onClick={this.openModal('upload_vid')} >
							<i className="fas fa-video nav-i-link" />
							<div className='i-msg'>Upload Video</div>
						</li>
						<SideNavLinks type={this.typeTop} />
						<li>{this.topRightIcon()}</li>
					</ul>
				</div>
			</div>

		)
	}
}

export default TopNav;



