import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import SideNavLinks from './side_nav_links';
import SubscriptionList from './subscription_list';

const MainSideNav = props => {
  function redirectToMainPage() { 
    props.history.push('/') 
  }

  function toggleSideBar(){
    props.toggleSideBar();
  }

  return (
    <>
      {
        props.type === 'TYPETWO' ? 
          <div className='top-nav--section-1--container flex-horizontal--style-3'>
            <div className='top-nav--section-1 flex-horizontal--style-3'>
              <i className='fas fa-bars' onClick={toggleSideBar} />
              <span className="nav-bar--icon">
                <Link to="#/" className='flex-horizontal--style-3'>
                  <i className='fab fa-youtube' />
                  <h1>YuuTubu</h1>
                </Link>
              </span>
            </div>
          </div> : null
      }
      <div 
        onScroll={ e => e.stopPropagation()}
        className='main-side-nav'>
        <ul className='main-side-nav-ul flex-vertical--style-1'>
          <li id='Home'
            onClick={redirectToMainPage}
            className={ props.location.pathname === '/' ? 'main-side-nav--item' : ""}>
            <i className='fas fa-home' />
            <span className='flex-horizontal--style-3'>Home</span>
          </li>
          <SideNavLinks type='main' />
        </ul>
        <ul>
          <li>
            <a target="_blank"
              href='https://angel.co/jian-wu-12?public_profile=1'>
                <i className='fab fa-angellist' />
                <span className='flex-horizontal--style-3'>AngelList</span>
              </a>
          </li>
        </ul>
        <SubscriptionList />
      </div>
    </>
  )
}

export default withRouter(MainSideNav);