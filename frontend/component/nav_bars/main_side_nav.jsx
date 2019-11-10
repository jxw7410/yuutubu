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
          <div className='tns-1-ctn flexh-3'>
            <div className='tns-1 flexh-3'>
              <i className='fas fa-bars' onClick={toggleSideBar} />
              <span className="nb-i">
                <Link to="#/" className='flexh-3'>
                  <i className='fab fa-youtube' />
                  <h1>YuuTubu</h1>
                </Link>
              </span>
            </div>
          </div> : null
      }
      <div 
        onScroll={ e => e.stopPropagation()}
        className='msn'>
        <ul className='msn-ul flexv-1'>
          <li id='Home'
            onClick={redirectToMainPage}
            className={ props.location.pathname === '/' ? 'msi-select' : ""}>
            <i className='fas fa-home' />
            <span className='flexh-3'>Home</span>
          </li>
          <SideNavLinks type='main' />
        </ul>
        <ul>
          <li>
            <a target="_blank"
              href='https://angel.co/jian-wu-12?public_profile=1'>
                <i className='fab fa-angellist' />
                <span className='flexh-3'>AngelList</span>
              </a>
          </li>
        </ul>
        <SubscriptionList />
      </div>
    </>
  )
}

export default withRouter(MainSideNav);