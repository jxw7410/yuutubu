import React from 'react'
import { withRouter } from 'react-router-dom';
import SideNavLinks from './side_nav_links';


const SubSideNav = props => {

  const toMainPage = e => {
    e.preventDefault();
    props.history.push('/')
  }

  return (
    <div className='ssn-ctn'>
      <nav id='ssn'>
        <div className='ssn-content flexh-2'>
          <ul className='flexv-1'>
            <li id='Home'
              onClick={toMainPage}
              className={props.location.pathname === '/' ? 'ssi-select' : ""}>
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