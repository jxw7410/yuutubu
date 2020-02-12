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
			<div className='top-nav--section-1 flex-horizontal--style-3'>
				<i className='fas fa-bars' 
					onClick={() => props.toggleSideBar()} />
				<span className='nav-bar--icon flex-horizontal--style-3'>
					<NavLink exact className='flex-horizontal--style-3' to='/'>
						<i className='fab fa-youtube' />
						<h1>YuuTubu</h1>
					</NavLink>
				</span>
			</div>
			<div className='top-nav--section-2'>
				<SearchBarContainer />
			</div>
			<div className='top-nav--section-3 flex-horizontal--style-3'>
				<ul className='nav-bar--ul flex-horizontal--style-4'>
					<li className='icon-wrap' >
						<UploadDropDown />
					</li>
					<SideNavLinks type='top' />
					<li className='icon-wrap'>
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



