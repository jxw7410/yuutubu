import React from 'react'
import { withRouter } from 'react-router-dom';
import SideNavLinks from './side_nav_links';


const SubSideNav = props => {

  const toMainPage = e => {
    e.preventDefault();
    props.history.push('/')
  }

  return (
    <div className='sub-side-nav--container'>
      <nav id='sub-side-nav'>
        <div className='sub-side-nav--content flex-horizontal--style-2'>
          <ul className='flex-vertical--style-1'>
            <li id='Home'
              onClick={toMainPage}
              className={props.location.pathname === '/' ? 'sub-side-nav--icon--select' : ""}>
              <i className="fas fa-home" />
              <span>Home</span>
            </li>
            <SideNavLinks />
          </ul>
        </div>
      </nav>
    </div>
  )
}


export default withRouter(SubSideNav);