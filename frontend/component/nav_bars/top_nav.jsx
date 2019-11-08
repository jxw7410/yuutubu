import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBarContainer from './search_bar_ctn';
import SideNavLinks from './side_nav_links';
import UploadDropDown from './upload_drop_down';
import LoginButton from './login_button';
import UserDropDown from './user_drop_down';


const TopNav = props => {
	return (
		<div className='top-nav'>
			<div className='tns-1 flexh-3'>
				<i className='fas fa-bars' 
					onClick={() => props.toggleSideBar()} />
				<span className='nb-i flexh-3'>
					<NavLink exact className='flexh-3' to='/'>
						<i className='fab fa-youtube' />
						<h1>YuuTubu</h1>
					</NavLink>
				</span>
			</div>
			<div className='tns-2'>
				<SearchBarContainer />
			</div>
			<div className='tns-3 flexh-3'>
				<ul className='nbr-ul flexh-4'>
					<li className='i-wrap' >
						<UploadDropDown />
					</li>
					<SideNavLinks type='top' />
					<li className='i-wrap'>
						{
							props.isLoggedIn ?
								<UserDropDown /> : <LoginButton />					
						}
					</li>
				</ul>
			</div>
		</div>
	)
}


export default React.memo(TopNav);



